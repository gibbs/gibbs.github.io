// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import Time from '../Time.astro';

describe('Time component', () => {
	test('renders time element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Time);

		expect(result).toContain('<time');
		expect(result).toContain('</time>');
	});

	test('sets default data attributes', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Time);

		expect(result).toContain('data-interval="false"');
		expect(result).toContain('data-format="TIME_24_WITH_SHORT_OFFSET"');
		expect(result).toContain('data-timezone="Europe/London"');
	});

	test('includes default time', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Time);

		expect(result).toContain('00:00:00 GMT');
	});
});
