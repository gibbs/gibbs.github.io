import { test, expect } from '@playwright/test';

test.describe('Robots file', () => {
	test('robots.txt should exist', async ({ page }) => {
		const robots = await page.goto('/robots.txt');
		const content = await robots?.text();
		const status = robots?.status();

		expect(status).toBe(200);
		expect(content).toContain('Sitemap:');
		expect(content).toContain('Allow:');
		expect(content).toContain('Disallow:');
	});
});
