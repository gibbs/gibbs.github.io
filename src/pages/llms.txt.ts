import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { env } from '@src/env.config';

export const GET: APIRoute = async () => {
	const baseUrl: URL = new URL('/', env.BASE_URL);
	const filePath = path.resolve('src/content/llms.md');
	let markdown = fs.readFileSync(filePath, 'utf-8');

	// Replace URLs
	markdown = markdown.replaceAll('__URL__', baseUrl.origin);

	return new Response(markdown, {
		headers: {
			'content-type': 'text/plain',
		},
	});
};
