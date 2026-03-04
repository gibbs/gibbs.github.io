import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('UUID generator tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('uuid-generator');
		await toolsPage.assertStandard(page);
	});

	test('generates a UUID via backend (mocked) and validates format', async ({ page }) => {
		await page.route('**/tool/uuidgen', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'uuidgen',
					output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
				}),
			}),
		);

		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('uuid-generator');

		await Promise.all([
			page.waitForResponse('**/tool/uuidgen'),
			page.click('button[type="submit"]'),
		]);

		const out = (await page.locator('output').first().textContent()) ?? '';
		expect(out).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
	});
});
