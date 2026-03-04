// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test, vi } from 'vitest';
import Logo from '../Logo.astro';

vi.mock('astro:env/client', () => {
	return {
		BASE_URL: 'http://localhost',
	};
});

describe('Logo component', () => {
	test('renders element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Logo);

		expect(result).toContain('<a class="logo"');
		expect(result).toContain('</a>');
	});
});
