import { expect, type Page } from '@playwright/test';
import { BasePage } from '@tests/pages/base-page';

export class ContactPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto('contact', {
			waitUntil: 'domcontentloaded',
		});
	}
}
