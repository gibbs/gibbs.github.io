import { test, expect } from '@playwright/test';
import { ContactPage } from '@tests/pages/contact-page';

test.describe('Contact page', () => {
	test('meta and general', async ({ page }) => {
		const contactPage = new ContactPage(page);
		await contactPage.goto();

		await contactPage.assertStandard(page);
		await contactPage.assertAccessibility();
	});
});
