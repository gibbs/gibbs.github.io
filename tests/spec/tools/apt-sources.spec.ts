import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('APT Sources page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('apt-sources');
		await toolsPage.assertStandard(page);
	});

	test('renders tabbed files and shows expected file contents', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('apt-sources');

		expect(
			await page.locator('.xt-tablist .xt-label').filter({ hasText: 'Debian' }).count(),
		).toBeGreaterThan(0);
		expect(
			await page.locator('.xt-tablist .xt-label').filter({ hasText: 'Ubuntu' }).count(),
		).toBeGreaterThan(0);

		await expect(
			page.locator('text=deb https://deb.debian.org/debian bookworm main'),
		).toBeVisible();
		await expect(
			page.locator('text=deb http://archive.ubuntu.com/ubuntu jammy main restricted'),
		).toBeVisible();
	});
});
