// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test, vi } from 'vitest';
import ReturnToArea from '../ReturnToArea.astro';

vi.mock('astro:env/client', () => {
	return {
		BASE_URL: 'http://localhost',
	};
});

describe('ReturnToArea component', () => {
	test('renders section element with defaults', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ReturnToArea);

		expect(result).toContain('<section');
		expect(result).toContain('</section>');
	});

	test('renders anchor with default href', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ReturnToArea);

		expect(result).toContain('<a');
		expect(result).toContain('href="http://localhost/"');
	});

	test('renders icon', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ReturnToArea);

		expect(result).toContain('<svg');
		expect(result).toContain('class="return-icon"');
		expect(result).toContain('viewBox="');
	});
});
