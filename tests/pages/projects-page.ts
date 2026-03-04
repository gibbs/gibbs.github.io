import { expect, type Page } from '@playwright/test';
import { BasePage } from '@tests/pages/base-page';

export class ProjectsPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async goto() {
		await this.page.goto('projects', {
			waitUntil: 'domcontentloaded',
		});
	}
}
