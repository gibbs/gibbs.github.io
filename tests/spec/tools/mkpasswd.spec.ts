import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('mkpasswd tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('mkpasswd');
		await toolsPage.assertStandard(page);
	});

	test('generates a password hash via backend', async ({ page }) => {
		await page.route('**/tool/mkpasswd', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'mkpasswd',
					output: '$6$saltsalt$abcdef...',
				}),
			}),
		);

		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('mkpasswd');

		await page.fill('#input', 'password');
		await Promise.all([
			page.waitForResponse('**/tool/mkpasswd'),
			page.click('button[type="submit"]'),
		]);

		await expect(page.locator('output').first()).toContainText('$6$saltsalt');
	});
});
