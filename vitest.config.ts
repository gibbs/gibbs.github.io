/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		environment: 'happy-dom',
		setupFiles: ['dotenv/config'],
		globals: true,
		exclude: ['backup/*', 'node_modules/*', 'tests/*'],
	},
});
