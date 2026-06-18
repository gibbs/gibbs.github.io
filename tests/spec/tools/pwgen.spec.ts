import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('pwgen tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('pwgen');
		await toolsPage.assertStandard(page);
	});

	test('generates passwords via backend', async ({ page }) => {
		await page.route('**/api/tools/pwgen', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'pwgen',
					output: [
						'DGbIXw5lcT8pmShS',
						'VCajy7QhNHt65F5f',
						'g4NmFuAHoH0PT4X6',
						'VL6Z09AMuDQY2P8g',
						'vYBxBWRZZe1PRixd',
					],
				}),
			}),
		);

		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('pwgen');

		await Promise.all([
			page.waitForResponse('**/api/tools/pwgen'),
			page.click('button[type="submit"]'),
		]);

		await expect(page.locator('pre')).toContainText('VCajy7QhNHt65F5f');
	});
});
