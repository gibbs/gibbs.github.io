// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import SchemePreference from '../SchemePreference.astro';

describe('SchemePreference component', () => {
	test('renders custom element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SchemePreference);

		expect(result).toContain('<button');
		expect(result).toContain('aria-pressed="false"');
		expect(result).toContain('Toggle colour scheme');
	});

	test('renders sun and moon icons instead of a switch', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SchemePreference);

		expect(result).toContain('x-show="!isDark"');
		expect(result).toContain('x-show="isDark"');
		expect((result.match(/<svg/g) || []).length).toBe(2);
		expect(result).not.toContain('scheme-preference-switch');
		expect(result).not.toContain('scheme-preference-slider');
	});
});
