import { test, expect } from '@playwright/test';
import { TestPage } from '@tests/pages/test-page';

test.describe('Test page', () => {
	test('meta and general', async ({ page }) => {
		const testPage = new TestPage(page);
		await testPage.goto();

		await testPage.assertLayout();
		await testPage.assertMeta();
	});

	test('page is noindexed', async ({ page }) => {
		const testPage = new TestPage(page);
		await testPage.goto();

		const meta = await testPage.getMeta();
		expect(await meta.robots.getAttribute('content')).toBe('noindex, nofollow');
	});
});
