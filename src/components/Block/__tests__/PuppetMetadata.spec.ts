// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import PuppetMetadata from '../PuppetMetadata.astro';
import fixtureMetadata from '@tests/fixtures/puppet-metadata';

describe('Puppet Metadata component', () => {
	test('renders element', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(PuppetMetadata, {
			props: {
				data: fixtureMetadata,
			},
		});

		expect(result).toContain('<ol class="metadata"');
		expect(result).toContain('</ol>');
	});
});
