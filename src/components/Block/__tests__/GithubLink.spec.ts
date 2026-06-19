// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import GithubLink from '../GithubLink.astro';

describe('GithubLink component', () => {
	test('renders a link to the GitHub profile', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubLink);

		expect(result).toContain('<a');
		expect(result).toContain('href="https://github.com/gibbs/"');
		expect(result).toContain('target="_blank"');
		expect(result).toContain('rel="noopener noreferrer"');
	});

	test('renders an accessible inline SVG icon', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubLink);

		expect(result).toContain('<svg');
		expect(result).toContain('aria-hidden="true"');
		expect(result).toContain('aria-label="View source on GitHub"');
	});
});
