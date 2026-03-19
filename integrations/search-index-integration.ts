import fs from 'node:fs/promises';
import path from 'node:path';
import type { AstroIntegration, AstroIntegrationLogger } from 'astro';
import { loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import { Meilisearch } from 'meilisearch';

export default function searchIndexIntegration(): AstroIntegration {
	return {
		name: 'search-indexer',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				await indexSearch(dir, logger);
			},
		},
	};
}

async function indexSearch(dir: URL, logger: AstroIntegrationLogger) {
	const env = loadEnv('production', process.cwd(), '');
	const buildDir = fileURLToPath(dir);
	const searchIndexFile = path.join(buildDir, 'search-index.json');
	const searchClient = new Meilisearch({
		host: env.VITE_MEILISEARCH_URL,
		apiKey: env.VITE_MEILISEARCH_MASTER_KEY,
	});
	const searchIndex = searchClient.index(env.VITE_MEILISEARCH_INDEX);

	try {
		await searchIndex.updateFilterableAttributes([
			'title',
			'summary',
			'meta_title',
			'meta_description',
		]);

		await searchIndex.updateDisplayedAttributes(['title', 'summary', 'url']);

		const documents = JSON.parse(await fs.readFile(searchIndexFile, 'utf-8'));
		const response = await searchIndex.addDocuments(documents);
		logger.info(response.status);

		await fs.unlink(searchIndexFile);
		logger.info(`Removed ${searchIndexFile}`);
	} catch (error: unknown) {
		logger.error(`Indexing failed: ${error}`);
	}
}
