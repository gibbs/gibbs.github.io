// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import LogoIcon from '../LogoIcon.astro';

describe('Logo component', () => {
	test('renders SVG element with defaults', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(LogoIcon);

		expect(result).toContain('<svg');
		expect(result).toContain('</svg>');
		expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
	});

	test('applies default size attribute', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(LogoIcon);

		expect(result).toContain('width="24"');
		expect(result).toContain('height="24"');
	});

	test('applies default className', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(LogoIcon);

		expect(result).toContain('class="logo"');
	});

	test('applies default icon to use element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(LogoIcon);

		expect(result).toContain('<use');
		expect(result).toContain('href="/logos.svg#default"');
	});

	test('uses SVG use reference for icons', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(LogoIcon);

		expect(result).toContain('<use');
		expect(result).toContain('href="/logos.svg#');
		expect(result).toContain('</use>');
	});
});
