import { expect, type Page } from '@playwright/test';
import { BasePage } from '@tests/pages/base-page';

export class ToolsPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async goto(path: string | null = null) {
		await this.page.goto(`tools${path ? '/' + path : ''}`, {
			waitUntil: 'domcontentloaded',
		});
	}
}
