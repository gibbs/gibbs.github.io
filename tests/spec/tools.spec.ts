import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('Tools page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto();

		await toolsPage.assertStandard(page);
	});

	test('lists tools', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto();

		const items = page.locator('.tools .tool');
		const count = await items.count();
		expect(count).toBeGreaterThan(0);

		const first = items.first();
		const anchor = first.locator('.tool-anchor');
		await expect(anchor).toBeVisible();
		expect((await anchor.getAttribute('href')) || '').toContain('/tools/');

		const summary = first.locator('.tool-summary');
		expect(((await summary.textContent()) ?? '').trim().length).toBeGreaterThan(10);
	});
});
