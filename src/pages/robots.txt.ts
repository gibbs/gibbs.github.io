import type { APIRoute } from 'astro';
import { env } from '@src/env.config';

export const GET: APIRoute = async () => {
	const baseUrl: string = env.BASE_URL;

	const robots = [`Sitemap: ${baseUrl}sitemap.xml`, 'User-agent: *', 'Allow: ', 'Disallow: '];

	return new Response(robots.join('\n'), {
		headers: {
			'content-type': 'text/plain',
		},
	});
};
