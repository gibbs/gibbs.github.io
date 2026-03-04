import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('DNS tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('dns');
		await toolsPage.assertStandard(page);
	});

	test('performs a DNS lookup and displays results', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('dns');

		await page.route('**/tool/dig', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'dig example.com',
					output: [
						{
							name: 'example.com',
							ttl: 300,
							tag: 'A',
							value: '93.184.216.34',
						},
					],
				}),
			}),
		);

		await page.fill('#name', 'example.com');
		await Promise.all([page.waitForResponse('**/tool/dig'), page.click('button[type="submit"]')]);

		await expect(page.locator('.table.result')).toBeVisible();
		await expect(page.locator('.table.result tbody tr')).toHaveCount(1);
		await expect(page.locator('.table.result tbody tr').locator('td').nth(3)).toHaveText(
			'93.184.216.34',
		);
		await expect(page.locator('.result-command')).toContainText('dig example.com');
	});

	test('errors when the lookup fails', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('dns');
		await page.route('**/tool/dig', (route) => route.abort());

		await page.fill('#name', 'example.com');
		await page.click('button[type="submit"]');

		await expect(page.locator('.result-error')).toBeVisible();
		const errText = (await page.locator('.result-error').textContent()) ?? '';
		expect(errText.length).toBeGreaterThan(0);
	});
});
