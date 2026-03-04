// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import GithubActivityFeed from '../GithubActivityFeed.astro';

describe('Github Activity Feed component', () => {
	test('renders custom element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubActivityFeed);

		expect(result).toContain('<section');
		expect(result).toContain('</section>');
	});

	test('contains Alpine.js script', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubActivityFeed);

		expect(result).toContain('<script');
		expect(result).toContain('type="module"');
	});
});
