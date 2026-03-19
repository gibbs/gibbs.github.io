import { test, expect } from '@playwright/test';
import { HomePage } from '@tests/pages/home-page';
import { scrollDownUntilFound } from '@tests/utils/scroll-util';

test.describe('Home page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const homepage = new HomePage(page);
		await homepage.goto();

		await homepage.assertStandard(page);
	});

	test('hero element', async ({ page }) => {
		const homepage = new HomePage(page);
		await homepage.goto();
		const heroElement = homepage.hero;

		expect(heroElement).toBeVisible();
		expect(heroElement.locator('.hero-location')).toBeVisible();
		expect(heroElement.locator('.hero-location .time')).not.toContainText('00:00:00 GMT');
	});

	test.skip('activity feed', async ({ page }) => {
		const homepage = new HomePage(page);
		await homepage.goto();
		const activityFeed = homepage.activity;

		expect(activityFeed).toBeVisible();
		await scrollDownUntilFound(page, activityFeed);
		expect(await activityFeed.locator('div').count()).toBeGreaterThan(0);
	});

	test('search bar', async ({ page }) => {
		await page.addInitScript(() => {
			const hits = [
				{
					title: 'Blog',
					summary: 'Read recent updates',
					url: '/blog/',
				},
				{
					title: 'Projects',
					summary: 'Browse project work',
					url: '/projects/',
				},
			];

			const nativeFetch = window.fetch.bind(window);

			window.fetch = async (input, init) => {
				const url =
					typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

				if (url.includes('/multi-search')) {
					return new Response(
						JSON.stringify({
							results: [
								{
									hits,
								},
							],
						}),
						{
							status: 200,
							headers: {
								'Content-Type': 'application/json',
							},
						},
					);
				}

				if (/\/indexes\/[^/]+\/search/.test(url)) {
					return new Response(JSON.stringify({ hits }), {
						status: 200,
						headers: {
							'Content-Type': 'application/json',
						},
					});
				}

				return nativeFetch(input, init);
			};
		});

		const homepage = new HomePage(page);
		await homepage.goto();

		const input = page.locator('#search');
		await input.focus();
		await input.fill('b');

		const results = page.locator('#search-results [role="option"]');
		await expect(results).toHaveCount(2);
		await expect(page.locator('#search-results')).toBeVisible();
		await expect(page.locator('[role="status"]')).toContainText('results available');

		await page.keyboard.press('ArrowDown');
		await expect(input).toHaveAttribute('aria-activedescendant', 'search-bar-result-0');

		await page.keyboard.press('Enter');
		await expect(page).toHaveURL(/\/blog\/?$/);
	});
});
