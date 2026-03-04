import type { APIRoute } from 'astro';
import { client } from '@src/prismic';
import { env } from '@src/env.config';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
	const baseUrl: string = env.BASE_URL;

	let sitemapRoutes = [];
	let sitemapEntries: string = '';

	const pages = await getCollection('pages');

	pages.forEach((page) => {
		sitemapRoutes.push({
			url: `/${page.id.replace('index', '')}`,
			last_publication_date: page.data.date,
		});
	});

	for (const type of ['project', 'blog', 'tools']) {
		try {
			const pages = await client.getAllByType(type, {
				fetch: ['page.last_publication_date'],
			});

			sitemapRoutes.push(...pages);
		} catch (error) {
			console.error(`Error fetching Prismic documents of type "${type}":`, error);
		}
	}

	sitemapRoutes.forEach((route) => {
		const url = `${baseUrl.replace(/\/$/, '')}${route.url}`;
		const lastMod = route.last_publication_date
			? new Date(route.last_publication_date).toISOString()
			: new Date().toISOString();

		sitemapEntries += `<url><loc>${url}</loc> <lastmod>${lastMod}</lastmod></url>`;
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${sitemapEntries}
		</urlset>`.trim();

	return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } });
};
