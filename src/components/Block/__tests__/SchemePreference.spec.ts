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
});
