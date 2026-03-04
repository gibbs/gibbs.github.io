import { Page, Locator } from '@playwright/test';

/**
 * Scrolls down the page incrementally until a specific element is visible.
 *
 * @param page The Playwright Page object.
 * @param locator The Locator for the element you are searching for.
 */

export async function scrollDownUntilFound(page: Page, locator: Locator, maxScrolls: number = 10) {
	let scrolls = 0;
	while (!(await locator.isVisible()) && scrolls < maxScrolls) {
		await page.mouse.wheel(0, 1000);
		await page.waitForTimeout(500);
		scrolls++;
	}

	if (!(await locator.isVisible())) {
		throw new Error(`Element not found after ${maxScrolls} scroll attempts.`);
	}
}
