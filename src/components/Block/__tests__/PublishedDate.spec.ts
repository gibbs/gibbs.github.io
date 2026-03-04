// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import PublishedDate from '../PublishedDate.astro';

describe('PublishedDate component', () => {
	test('does not render with no dates', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(PublishedDate);

		expect(result).not.toContain('<aside');
		expect(result).not.toContain('</aside>');
	});
});
