// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test, vi } from 'vitest';
import ContentSecurityPolicy from '../ContentSecurityPolicy.astro';

vi.mock('astro:env/client', () => {
	return {
		APP_SERVICE_URL: 'http://localhost',
	};
});

describe('ContentSecurityPolicy component', () => {
	test('renders meta content-security-policy tag', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContentSecurityPolicy);

		expect(result).toContain('http-equiv="content-security-policy"');
		expect(result).toContain('connect-src');
	});
});
