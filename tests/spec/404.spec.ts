import { test, expect } from '@playwright/test';
import { BasePage } from '@tests/pages/base-page';

test.describe('404 page not found', () => {
	test('page is noindexed', async ({ page }) => {
		const base = new BasePage(page);
		await base.goto('404-not-found');

		const meta = await base.getMeta();
		expect(await meta.robots.getAttribute('content')).toBe('noindex, nofollow');
	});
});
