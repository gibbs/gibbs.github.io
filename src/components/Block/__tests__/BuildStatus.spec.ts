// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import BuildStatus from '../BuildStatus.astro';

describe('BuildStatus component', () => {
	test('renders element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(BuildStatus);

		expect(result).toContain('<x-build-status');
		expect(result).toContain('</x-build-status>');
	});
});
