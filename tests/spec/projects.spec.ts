import { test, expect } from '@playwright/test';
import { ProjectsPage } from '@tests/pages/projects-page';

test.describe('Projects page', () => {
	test('meta and general', async ({ page }) => {
		const projectsPage = new ProjectsPage(page);
		await projectsPage.goto();

		await projectsPage.assertStandard(page);
	});

	test('lists projects with tags and anchors', async ({ page }) => {
		const projectsPage = new ProjectsPage(page);
		await projectsPage.goto();

		const items = page.locator('.projects .card');
		const count = await items.count();
		expect(count).toBeGreaterThan(0);

		const first = items.first();
		const anchor = first.locator('.card-heading-anchor');
		await expect(anchor).toBeVisible();
		const heading = (await anchor.textContent())?.trim() ?? '';
		expect(heading.length).toBeGreaterThan(0);

		const tag = first.locator('.card-preview .card-tag');
		if ((await tag.count()) > 0) {
			expect(((await tag.textContent()) ?? '').trim().length).toBeGreaterThan(0);
		}
	});

	test(
		'navigates to a project detail and validates content + meta',
		{ tag: ['@smoke'] },
		async ({ page }) => {
			const projectsPage = new ProjectsPage(page);
			await projectsPage.goto();

			const firstAnchor = page.locator('.projects .card .card-heading-anchor').first();
			const titleText = (await firstAnchor.textContent())?.trim() ?? '';
			await Promise.all([page.waitForNavigation(), firstAnchor.click()]);

			await expect(page.locator('h1')).toHaveText(titleText);

			const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
			expect(canonical).toContain('/projects/');

			const jsonLdRaw = await page.locator('script[type="application/ld+json"]').textContent();
			const jsonLd = JSON.parse(jsonLdRaw || '{}');
			expect(jsonLd.headline || '').toContain(titleText);

			await expect(page.locator('.return-anchor')).toBeVisible();
			expect(await page.locator('.return-anchor').getAttribute('href')).toContain('/projects');
		},
	);
});
