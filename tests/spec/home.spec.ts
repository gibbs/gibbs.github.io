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
});
