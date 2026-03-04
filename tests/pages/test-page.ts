import { expect, type Page } from '@playwright/test';
import { BasePage } from '@tests/pages/base-page';

export class TestPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto('test', {
			waitUntil: 'domcontentloaded',
		});
	}
}
