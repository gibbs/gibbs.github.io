import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('Puppet Litmus Images tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('puppet-litmus-images');
		await toolsPage.assertStandard(page);
	});

	test('lists distributions with a version table and matching nav links', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('puppet-litmus-images');

		const cards = page.locator('.litmus-grid .distro');
		const count = await cards.count();
		expect(count).toBeGreaterThan(0);

		const first = cards.first();
		const heading = (await first.locator('.distro-name').textContent())?.trim() ?? '';
		expect(heading.length).toBeGreaterThan(0);

		await expect(first.locator('table thead th')).toHaveCount(6);
		expect(await first.locator('.table-wrapper table tbody tr').count()).toBeGreaterThan(0);

		const navLinks = page.locator('.litmus-nav-link');
		await expect(navLinks).toHaveCount(count);

		const firstHref = await navLinks.first().getAttribute('href');
		expect(firstHref).toMatch(/^#/);
		await expect(page.locator(firstHref ?? '')).toHaveCount(1);
	});

	test('hides end-of-life versions when the filter is toggled', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('puppet-litmus-images');

		const eolRows = page.locator('tr[data-eol="true"]');
		expect(await eolRows.count()).toBeGreaterThan(0);
		await expect(eolRows.first()).toBeVisible();

		await page.check('#hide-eol');
		await expect(eolRows.first()).toBeHidden();

		await page.uncheck('#hide-eol');
		await expect(eolRows.first()).toBeVisible();
	});

	test('swaps end-of-life distro for message when the filter is active', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('puppet-litmus-images');

		const emptyState = page.locator('.distro-empty').first();
		expect(await page.locator('.distro-empty').count()).toBeGreaterThan(0);
		await expect(emptyState).toBeHidden();

		await page.check('#hide-eol');
		await expect(emptyState).toBeVisible();
	});
});
