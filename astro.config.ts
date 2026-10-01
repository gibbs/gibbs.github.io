import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig, envField } from 'astro/config';
import sentry from '@sentry/astro';
import { unified } from '@astrojs/markdown-remark';
import { remarkPlugins, rehypePlugins } from './src/markdown.config';
import searchIndexIntegration from './integrations/search-index-integration';
import buildBadgesIntegration from './integrations/build-badges-integration';

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
	integrations: [
		searchIndexIntegration(),
		buildBadgesIntegration(),
		sentry({
			project: 'dangibbsuk',
			org: 'dan-gibbd',
			authToken: process.env.SENTRY_AUTH_TOKEN,
			telemetry: false,
		}),
	],
	env: {
		schema: {
			APP_API_PROXY_URL: envField.string({
				context: 'client',
				access: 'public',
				optional: false,
			}),
			APP_CONTACT_FORM_URL: envField.string({
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
		processor: unified({ remarkPlugins, rehypePlugins }),
	},
	vite: {
		define: {
			__SENTRY_DEBUG__: false,
		},
	},
	output: 'static',
	server: {
		host: true,
		port: parseInt(env.PORT || '4321'),
	},
});
