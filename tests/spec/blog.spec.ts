import { test, expect } from '@playwright/test';
import { BlogPage } from '@tests/pages/blog-page';

test.describe('Blog page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const blogPage = new BlogPage(page);
		await blogPage.goto();

		await blogPage.assertStandard(page);
	});

	test('lists posts with title, date and summary', async ({ page }) => {
		const blogPage = new BlogPage(page);
		await blogPage.goto();

		const items = page.locator('.blog-posts .card');
		const count = await items.count();
		expect(count).toBeGreaterThan(0);

		const first = items.first();
		const anchor = first.locator('.card-heading-anchor');
		await expect(anchor).toBeVisible();
		const title = (await anchor.textContent()) ?? '';
		expect(title.trim().length).toBeGreaterThan(0);

		const time = page.locator('.blog-featured time, .blog-posts .card time').first();
		const datetime = await time.getAttribute('datetime');
		expect(isNaN(Date.parse((datetime || '').toString()))).toBe(false);

		const summary = first.locator('p');
		await expect(summary).toBeVisible();
		expect((await summary.textContent())?.length ?? 0).toBeGreaterThan(20);
	});

	test('navigates to a post and validates meta', { tag: ['@smoke'] }, async ({ page }) => {
		const blogPage = new BlogPage(page);
		await blogPage.goto();

		const firstAnchor = page.locator('.blog-posts .card .card-heading-anchor').first();
		const titleText = (await firstAnchor.textContent())?.trim() ?? '';
		await Promise.all([page.waitForNavigation(), firstAnchor.click()]);

		await expect(page.locator('h1')).toHaveText(titleText);

		const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
		expect(canonical).toContain('/blog/');

		const jsonLdRaw = await page.locator('script[type="application/ld+json"]').textContent();
		expect(jsonLdRaw).not.toBeNull();
		const jsonLd = JSON.parse(jsonLdRaw || '{}');
		expect(((jsonLd.headline || jsonLd.name) ?? '').toString().length).toBeGreaterThan(0);

		await expect(page.locator('.date-published')).toBeVisible();
	});
});
