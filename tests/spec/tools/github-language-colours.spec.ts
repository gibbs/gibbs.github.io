import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

test.describe('GitHub Language Colours', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('github-language-colours');
		await toolsPage.assertStandard(page);
	});
});
