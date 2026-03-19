import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig, envField } from 'astro/config';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import markdownIntegration from '@astropub/md';
import remarkFlexibleMarkers from 'remark-flexible-markers';
import searchIndexIntegration from './integrations/search-index-integration';

const env: Record<string, string> = loadEnv(
	process.env.NODE_ENV ?? 'production',
	process.cwd(),
	'',
);

// https://astro.build/config
export default defineConfig({
	build: {
		format: 'directory',
		assets: 'assets',
		inlineStylesheets: 'always',
		redirects: true,
	},
	integrations: [markdownIntegration(), searchIndexIntegration()],
	env: {
		schema: {
			APP_SERVICE_URL: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
			}),
			APP_SEARCH_URL: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
			}),
			ASSET_PATH: envField.string({
				context: 'server',
				access: 'secret',
				optional: false,
				default: path.join(process.cwd(), 'src/assets'),
			}),
			BASE_URL: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
				default: env.BASE_URL,
			}),
			PRISMIC_REPOSITORY: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
			}),
			PRISMIC_ACCESS_TOKEN: envField.string({
				context: 'server',
				access: 'secret',
				optional: false,
			}),
			VITE_MEILISEARCH_URL: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
			}),
			VITE_MEILISEARCH_INDEX: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
			}),
			VITE_MEILISEARCH_SEARCH_KEY: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
			}),
		},
	},

	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [remarkFlexibleMarkers],
		rehypePlugins: [
			[
				rehypePrettyCode,
				{
					theme: 'github-dark',
					transformers: [
						transformerCopyButton({
							visibility: 'always',
							feedbackDuration: 3_000,
						}),
					],
				},
			],
		],
	},
	output: 'static',
	server: {
		host: true,
		port: parseInt(env.PORT || '4321'),
	},
});
