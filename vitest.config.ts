/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		environment: 'node',
		setupFiles: ['dotenv/config'],
		globals: true,
		exclude: ['backup/*', 'node_modules/*', 'tests/*'],
	},
});
