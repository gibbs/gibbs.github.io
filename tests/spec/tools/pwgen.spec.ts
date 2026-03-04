import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('pwgen tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('pwgen');
		await toolsPage.assertStandard(page);
	});

	test('generates passwords via backend', async ({ page }) => {
		await page.route('**/tool/pwgen', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'pwgen',
					output: 's3cr3t\nS3cR3t',
				}),
			}),
		);

		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('pwgen');

		await Promise.all([page.waitForResponse('**/tool/pwgen'), page.click('button[type="submit"]')]);

		await expect(page.locator('pre')).toContainText('s3cr3t');
	});
});
