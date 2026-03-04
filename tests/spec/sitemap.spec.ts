import { test, expect } from '@fixtures/sitemap';
import xsdValidator from '@richhouse83/xsd-validator';

const validateSchema = xsdValidator.default || xsdValidator;

test.describe('XML sitemap', () => {
	test('sitemap.xml should exist and be valid', { tag: ['@smoke'] }, async ({ page, xsd }) => {
		const sitemap = await page.goto('/sitemap.xml');
		const valid = validateSchema(await sitemap?.text(), xsd);

		expect(sitemap?.status()).toBe(200);
		expect(valid).toBe(true);
	});
});
