import { expect, type Locator, type Page } from '@playwright/test';
import { HtmlValidate } from 'html-validate/node';

export class BasePage {
	protected readonly page: Page;
	protected readonly header: Locator;
	protected readonly navigation: Locator;
	protected readonly footer: Locator;
	protected readonly copyright: Locator;
	protected readonly build: Locator;
	protected readonly meta: { [key: string]: Locator };

	constructor(page: Page) {
		this.page = page;
		this.header = page.locator('.header');
		this.navigation = page.locator('.nav');
		this.footer = page.locator('.footer');
		this.copyright = page.locator('.copyright');
		this.build = page.locator('.build-status');

		// Meta tags
		this.meta = {
			title: page.locator('title'),
			description: page.locator('meta[name="description"]'),
			robots: page.locator('meta[name="robots"]'),
			favicon: page.locator('link[rel="icon"]'),
			canonical: page.locator('link[rel="canonical"]'),
			manifest: page.locator('link[rel="manifest"]'),
			linkData: page.locator('script[type="application/ld+json"]'),
			contentSecurityPolicies: page.locator('meta[http-equiv="content-security-policy"]'),
			speculationRules: page.locator('script[type="speculationrules"]'),
		};
	}

	async getMeta() {
		return this.meta;
	}

	async navigateToHome() {
		await this.page.goto('/');
	}

	/**
	 * HTML Validator
	 *
	 * @param page Page
	 */
	async validate(page: Page) {
		const html = await page.content();
		const validator = new HtmlValidate({
			extends: ['html-validate:recommended'],
			rules: {
				'no-inline-style': 'off',
				'attribute-boolean-style': 'off',
				'prefer-native-element': [
					'error',
					{
						exclude: [
							'listbox', // The listbox role is used for search results
						],
					},
				],
			},
			elements: [
				'html5',
				{
					style: {
						permittedParent: ['head', 'body'],
					},
				},
			],
		});

		const validatorReport = await validator.validateString(html);

		if (!validatorReport.valid) {
			console.warn(`HTML validation error count: ${validatorReport.errorCount}`);
			console.log(validatorReport.results[0].messages);
		}

		expect(validatorReport.valid).toBe(true);
	}

	/**
	 * General assertions that apply to most tests (layout, meta, validation)
	 *
	 * @param page Page
	 */
	async assertStandard(page: Page) {
		await this.assertLayout();
		await this.assertMeta();
		await this.validate(page);
	}

	/**
	 * General layout assertions
	 */
	async assertLayout() {
		await expect(this.header).toBeVisible();
		await expect(this.navigation).toBeVisible();
		await expect(this.copyright).toBeVisible();
		await expect(this.footer).toBeVisible();
	}

	/**
	 * General meta data assertions
	 */
	async assertMeta() {
		const meta = await this.getMeta();

		// Document
		await expect(this.page.locator('html')).toHaveAttribute('lang', 'en-GB');

		// Title and description
		expect(meta.title.textContent()).not.toBe('');
		await expect(meta.title).toHaveCount(1);
		await expect(meta.description).toHaveCount(1);
		expect(meta.description.getAttribute('content')).not.toBe('');

		// Robots
		await expect(meta.robots).toHaveCount(1);
		expect(meta.robots.textContent()).not.toBe('');
		expect(['noindex, nofollow', 'index, follow']).toContain(
			await meta.robots.getAttribute('content'),
		);

		// General
		expect(await meta.favicon.count()).toBeGreaterThan(0);
		await expect(meta.canonical).toHaveCount(1);
		await expect(meta.manifest).toHaveCount(1);
		expect(meta.manifest.getAttribute('href')).not.toBe('');

		// Speculation rules
		await expect(meta.speculationRules).toHaveCount(1);
		const speculationRules = await meta.speculationRules.textContent();
		expect(async () => JSON.parse(speculationRules || '')).not.toThrow();

		// CSP
		await expect(meta.contentSecurityPolicies).toHaveCount(1);
		await expect(meta.contentSecurityPolicies.getAttribute('content')).not.toBe('');

		// JSON+LD
		await expect(meta.linkData).toHaveCount(1);
		const jsonLd = await meta.linkData.textContent();
		expect(async () => JSON.parse(jsonLd || '')).not.toThrow();
	}
}
