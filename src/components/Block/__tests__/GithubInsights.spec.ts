// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import GithubInsights from '../GithubInsights.astro';

describe('Github Insights component', () => {
	test('renders custom element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubInsights);

		expect(result).toContain('<x-in');
		expect(result).toContain('</x-in>');
	});

	test('contains Alpine.js script', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GithubInsights);

		expect(result).toContain('<script');
		expect(result).toContain('type="module"');
	});
});
