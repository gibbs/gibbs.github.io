import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '@tests/pages/base-page';

export class HomePage extends BasePage {
	readonly activity: Locator;
	readonly hero: Locator;
	readonly insights: Locator;

	constructor(page: Page) {
		super(page);

		this.activity = page.locator('.xat');
		this.hero = page.locator('.hero');
		this.insights = page.locator('.xin');
	}

	async goto() {
		await this.page.goto('/', {
			waitUntil: 'networkidle',
		});
	}
}
