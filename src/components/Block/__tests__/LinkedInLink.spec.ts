// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import GithubLink from '../LinkedInLink.astro';

describe('LinkedIn link component', () => {
	test('renders a link', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubLink);

		expect(result).toContain('<a');
		expect(result).toContain('href="https://www.linkedin.com/in/dangibbscouk/"');
		expect(result).toContain('rel="noopener noreferrer"');
	});

	test('renders an accessible inline SVG icon', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubLink);

		expect(result).toContain('<svg');
		expect(result).toContain('aria-hidden="true"');
		expect(result).toContain('aria-label="Visit Dan Gibbs LinkedIn"');
	});
});
