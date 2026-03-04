// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import Copyright from '../Copyright.astro';

describe('Copyright component', () => {
	test('renders element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Copyright);
		const currentYear = new Date().getFullYear();

		expect(result).toContain('<x-copyright');
		expect(result).toContain(currentYear);
		expect(result).toContain('</x-copyright>');
	});
});
