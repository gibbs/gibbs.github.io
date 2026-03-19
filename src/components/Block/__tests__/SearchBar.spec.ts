// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test, vi } from 'vitest';
import SearchBar from '../SearchBar.astro';

vi.mock('astro:env/client', () => {
	return {
		VITE_MEILISEARCH_URL: 'https://search.example.test',
		VITE_MEILISEARCH_SEARCH_KEY: 'public-search-key',
		VITE_MEILISEARCH_INDEX: 'site-index',
	};
});

describe('SearchBar component', () => {
	test('renders controls and dataset attributes', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SearchBar, {
			props: {
				placeholder: 'Search docs',
			},
		});

		expect(result).toContain('role="combobox"');
		expect(result).toContain('aria-controls="search-results"');
		expect(result).toContain('aria-autocomplete="list"');
		expect(result).toContain('role="listbox"');
		expect(result).toContain('data-search-url="https://search.example.test"');
		expect(result).toContain('data-search-key="public-search-key"');
		expect(result).toContain('data-search-index="site-index"');
		expect(result).toContain('placeholder="Search docs"');
	});

	test('allows setting search props', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SearchBar, {
			props: {
				searchUrl: 'https://meili.override.test',
				searchKey: 'set-key',
				searchIndex: 'set-index',
			},
		});

		expect(result).toContain('data-search-url="https://meili.override.test"');
		expect(result).toContain('data-search-key="set-key"');
		expect(result).toContain('data-search-index="set-index"');
	});
});
