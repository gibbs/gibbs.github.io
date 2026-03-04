import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		emptyOutDir: false,
		outDir: 'public',
		minify: true,
		copyPublicDir: false,
		rollupOptions: {
			input: 'src/worker/service-worker.ts',
			output: {
				entryFileNames: 'service-worker.js',
			},
		},
	},
});
