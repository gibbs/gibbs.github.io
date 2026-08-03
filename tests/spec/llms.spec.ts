import { test, expect } from '@playwright/test';

test.describe('llms.txt file', () => {
	test('llms.txt should exist', async ({ page }) => {
		const llmstxt = await page.goto('/llms.txt');
		const status = llmstxt?.status();

		expect(status).toBe(200);
		expect(llmstxt?.headers()['content-type']).toContain('text/plain');
	});
});
