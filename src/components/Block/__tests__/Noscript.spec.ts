// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import Noscript from '../Noscript.astro';

describe('Noscript component', () => {
	test('renders noscript element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Noscript);

		expect(result).toContain('<noscript');
		expect(result).toContain('</noscript>');
	});
});
