// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test, vi } from 'vitest';
import BuildStatus from '../BuildStatus.astro';

vi.mock('astro:env/client', () => {
	return {
		BASE_URL: 'http://localhost/',
	};
});

describe('BuildStatus component', () => {
	test('renders element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(BuildStatus);

		expect(result).toContain('<x-build-status');
		expect(result).toContain('</x-build-status>');
	});

	test('renders build badges from the same-origin', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(BuildStatus);

		expect(result).toContain('src="http://localhost/badges/test-status.svg"');
		expect(result).toContain('src="http://localhost/badges/deploy-status.svg"');
		expect(result).not.toContain('img.shields.io');
	});
});
