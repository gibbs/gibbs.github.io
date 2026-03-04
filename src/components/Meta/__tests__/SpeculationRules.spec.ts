// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import SpeculationRules from '../SpeculationRules.astro';

describe('SpeculationRules component', () => {
	test('renders speculationrules and value is parsable', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SpeculationRules);

		expect(result).toContain('type="speculationrules"');

		const rules = result.match(/<script[^>]*type="speculationrules"[^>]*>([\s\S]*?)<\/script>/);
		expect(rules).not.toBeNull();
		const value = rules ? rules[1].trim() : '';
		const parsed = JSON.parse(value);

		expect(parsed).toBeTypeOf('object');
		expect(parsed.prerender).toBeDefined();
	});
});
