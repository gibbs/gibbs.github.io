// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test, vi } from 'vitest';
import LinkData from '../LinkData.astro';

vi.mock('astro:env/client', () => {
	return {
		BASE_URL: 'http://localhost',
	};
});

describe('LinkData component', () => {
	test('renders ld+json and value is parsable', async () => {
		const container = await AstroContainer.create();
		const frontmatter = {
			linkdata: {
				name: 'Test Name',
			},
		};
		const result = await container.renderToString(LinkData, {
			props: { frontmatter },
		});

		expect(result).toContain('application/ld+json');

		const script = result.match(
			/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
		);
		expect(script).not.toBeNull();
		const value = script ? script[1].trim() : '';
		const parsed = JSON.parse(value);
		expect(parsed).toBeTypeOf('object');
		expect(parsed.name).toBe('Test Name');
	});
});
