import { test, expect } from '@playwright/test';
import { ToolsPage } from '@tests/pages/tools-page';

const PNG_BASE64 =
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

test.describe('QR code generator tool page', () => {
	test('meta and general', { tag: ['@smoke'] }, async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('qr-code-generator');
		await toolsPage.assertStandard(page);
	});

	for (const type of ['ASCII', 'XPM']) {
		test(`renders ${type} output in a pre tag`, async ({ page }) => {
			const art = `##########\n## ${type}-MARKER ##\n##########`;

			await page.route('**/api/tools/qrcode', (route) =>
				route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({
						success: true,
						command: `qrencode -t ${type}`,
						output: Buffer.from(art).toString('base64'),
					}),
				}),
			);

			const toolsPage = new ToolsPage(page);
			await toolsPage.goto('qr-code-generator');

			await page.fill('#input', 'https://example.com');
			await page.selectOption('#type', type);

			await Promise.all([
				page.waitForResponse('**/api/tools/qrcode'),
				page.click('button[type="submit"]'),
			]);

			await expect(page.locator('pre.result')).toContainText(`${type}-MARKER`);
		});
	}

	test('displays a PNG image when generated', async ({ page }) => {
		await page.route('**/api/tools/qrcode', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'qrencode -t PNG',
					output: PNG_BASE64,
				}),
			}),
		);

		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('qr-code-generator');

		await page.fill('#input', 'https://example.com');
		await Promise.all([
			page.waitForResponse('**/api/tools/qrcode'),
			page.click('button[type="submit"]'),
		]);

		const img = page.locator('.result-image img');
		await expect(img).toBeVisible();
		await expect(img).toHaveAttribute('src', `data:image/png;base64,${PNG_BASE64}`);
	});

	test('displays an SVG image when generated', async ({ page }) => {
		const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
		const svgBase64 = Buffer.from(svg).toString('base64');

		await page.route('**/api/tools/qrcode', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'qrencode -t SVG',
					output: svgBase64,
				}),
			}),
		);

		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('qr-code-generator');

		await page.fill('#input', 'https://example.com');
		await page.selectOption('#type', 'SVG');

		await Promise.all([
			page.waitForResponse('**/api/tools/qrcode'),
			page.click('button[type="submit"]'),
		]);

		const img = page.locator('.result-image img');
		await expect(img).toBeVisible();
		await expect(img).toHaveAttribute('src', `data:image/svg+xml;base64,${svgBase64}`);
	});

	test('provides a download link when EPS is generated', async ({ page }) => {
		const eps = '%!PS-Adobe-3.0 EPSF-3.0';
		const epsBase64 = Buffer.from(eps).toString('base64');

		await page.route('**/api/tools/qrcode', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					command: 'qrencode -t EPS',
					output: epsBase64,
				}),
			}),
		);

		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('qr-code-generator');

		await page.fill('#input', 'https://example.com');
		await page.selectOption('#type', 'EPS');

		await Promise.all([
			page.waitForResponse('**/api/tools/qrcode'),
			page.click('button[type="submit"]'),
		]);

		const link = page.locator('a[download]');
		await expect(link).toBeVisible();
		await expect(link).toHaveAttribute('href', `data:application/postscript;base64,${epsBase64}`);
		await expect(link).toHaveAttribute('download', 'qrcode.eps');
	});

	test('errors when the request fails', async ({ page }) => {
		const toolsPage = new ToolsPage(page);
		await toolsPage.goto('qr-code-generator');
		await page.route('**/api/tools/qrcode', (route) => route.abort());

		await page.fill('#input', 'https://example.com');
		await page.click('button[type="submit"]');

		await expect(page.locator('.result-error')).toBeVisible();
		const errText = (await page.locator('.result-error').textContent()) ?? '';
		expect(errText.length).toBeGreaterThan(0);
	});
});
