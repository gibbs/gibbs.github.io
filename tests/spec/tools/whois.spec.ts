import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('WHOIS tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('whois');
		await toolsPage.assertStandard(page);
	});

	test('performs a WHOIS lookup and displays results', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('whois');

		let requestBody: unknown;
		await page.route('**/api/tools/rdap', (route) => {
			requestBody = route.request().postDataJSON();

			return route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'whois google.com',
					output: [
						'Domain Name: GOOGLE.COM',
						'Registrar: MarkMonitor Inc.',
						'Name Server: ns1.google.com',
					],
				}),
			});
		});

		await page.fill('#domain', 'google.com');
		await Promise.all([
			page.waitForResponse('**/api/tools/rdap'),
			page.click('button[type="submit"]'),
		]);

		expect(requestBody).toEqual({
			query: 'google.com',
			format: 'whois',
			type: 'domain',
		});

		await expect(page.locator('.table-wrapper > table')).toBeVisible();
		await expect(page.locator('.table-wrapper > table tbody tr')).toHaveCount(4);

		const firstRow = page.locator('.table-wrapper > table tbody tr').first();
		await expect(firstRow.locator('td').nth(0)).toHaveText('Domain Name');
		await expect(firstRow.locator('td').nth(1)).toHaveText('GOOGLE.COM');
	});

	test('strips invalid characters from the domain before sending', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('whois');

		let requestBody: unknown;
		await page.route('**/api/tools/rdap', (route) => {
			requestBody = route.request().postDataJSON();

			return route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'whois google.com',
					output: ['Domain Name: GOOGLE.COM'],
				}),
			});
		});

		await page.fill('#domain', 'google.com; rm -rf /');
		await Promise.all([
			page.waitForResponse('**/api/tools/rdap'),
			page.click('button[type="submit"]'),
		]);

		expect(requestBody).toEqual({
			query: 'google.comrm-rf',
			format: 'whois',
			type: 'domain',
		});
	});

	test('shows an error when the domain is only invalid characters', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('whois');

		let requestMade = false;
		await page.route('**/api/tools/rdap', (route) => {
			requestMade = true;
			return route.continue();
		});

		await page.fill('#domain', '"""');
		await page.click('button[type="submit"]');

		await expect(page.locator('.result-error')).toBeVisible();
		await expect(page.locator('.result-error')).toContainText('valid domain');
		expect(requestMade).toBe(false);
	});

	test('shows an error when the lookup returns only blank output', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('whois');

		await page.route('**/api/tools/rdap', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					output: [''],
					command: '/usr/bin/rdap --timeout=10 --whois --type=domain -- invalid.domain.example',
				}),
			}),
		);

		await page.fill('#domain', 'invalid.domain.example');
		await Promise.all([
			page.waitForResponse('**/api/tools/rdap'),
			page.click('button[type="submit"]'),
		]);

		await expect(page.locator('.result-error')).toBeVisible();
		const errText = (await page.locator('.result-error').textContent()) ?? '';
		expect(errText.length).toBeGreaterThan(0);
		await expect(page.locator('.table-wrapper > table')).not.toBeVisible();
	});

	test('errors when the lookup fails', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('whois');
		await page.route('**/api/tools/rdap', (route) => route.abort());

		await page.fill('#domain', 'google.com');
		await page.click('button[type="submit"]');

		await expect(page.locator('.result-error')).toBeVisible();
		const errText = (await page.locator('.result-error').textContent()) ?? '';
		expect(errText.length).toBeGreaterThan(0);
	});
});
