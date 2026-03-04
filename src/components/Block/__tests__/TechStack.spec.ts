// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import { STACK } from '@data/techstack';
import TechStack from '../TechStack.astro';

describe('TechStack component', () => {
	test('renders custom element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(TechStack);

		expect(result).toContain('<x-tech-stack');
		expect(result).toContain('</x-tech-stack>');
	});

	test('renders all technology categories', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(TechStack);

		const categories = Object.keys(STACK);

		for (const category of categories) {
			expect(result).toContain(`data-category="${category}"`);
		}
	});
});
