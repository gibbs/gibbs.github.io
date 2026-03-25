import type { APIRoute } from 'astro';
import { client } from '@src/prismic';
import { getCollection } from 'astro:content';

interface IndexDocument {
	id: string;
	url: string;
	title: string;
	summary: string;
	meta_title: string;
	meta_description: string;
	last_publication_date: string;
}

/**
 * Normalise the URL to index
 */
const indexUrl = (url: string | null | undefined): string => {
	const value = (url || '').trim();

	if (value === '' || value === 'index') {
		return '/';
	}

	return `/${value.replace(/^\/+/, '').replace(/^index$/, '')}`.replace(/\/$/, '') || '/';
};

/**
 * This route generates a search-index.json file that is read for indexing
 * after build. An integration is used to remove the file prior to deployment.
 */
export const GET: APIRoute = async () => {
	let documents: IndexDocument[] = [];

	const pages = await getCollection('pages');

	pages.forEach((page) => {
		let document: IndexDocument = {
			id: `${page.id.replace('index', '')}`,
			url: indexUrl(page.id),
			title: page.data.title,
			summary: page.data.summary,
			meta_title: page.data.meta.title,
			meta_description: page.data.meta.description,
			last_publication_date: page.data.date.toISOString(),
		};

		documents.push(document);
	});

	for (const type of ['page', 'project', 'blog', 'tools']) {
		try {
			const pages = await client.getAllByType(type);

			for (const key in pages) {
				let lastPubDate = pages[key].last_publication_date
					? new Date(pages[key].last_publication_date).toISOString()
					: new Date().toISOString();

				let document: IndexDocument = {
					id: pages[key].uid || '',
					url: indexUrl(pages[key].url || pages[key].uid),
					title: pages[key].data.title,
					summary: pages[key].data.summary,
					meta_title: pages[key].data.meta_title,
					meta_description: pages[key].data.meta_description,
					last_publication_date: lastPubDate,
				};

				documents.push(document);
			}
		} catch (error) {
			console.error(`Error fetching Prismic documents of type "${type}":`, error);
		}
	}

	return new Response(JSON.stringify(documents), {
		headers: { 'Content-Type': 'application/json' },
	});
};
