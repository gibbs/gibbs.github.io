import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import pluginA11y from 'eslint-plugin-jsx-a11y';

export default defineConfig([
	...eslintPluginAstro.configs.recommended,
	globalIgnores(['src/assets/**/*', 'src/pages/test.astro']),
	{
		rules: {
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'astro/prefer-object-class-list': 'error',
		},
	},
	pluginA11y.flatConfigs.recommended,
	{
		rules: {
			'jsx-a11y/label-has-associated-control': 'error',
		},
	},
]);
