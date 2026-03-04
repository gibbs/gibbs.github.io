import { env } from '@src/env.config';

import assetIcon192 from '@icons/icon-192.png';
import assetIcon512 from '@icons/icon-512.png';
import assetIconMask from '@icons/icon-192-maskable.png';

export async function GET() {
	const result = {
		$schema: 'https://json.schemastore.org/web-manifest-combined.json',
		name: 'dangibbs.uk',
		short_name: 'dangibbs.uk',
		description: 'The website app for dangibbs.uk',
		background_color: '#34344A',
		theme_color: '#34344A',
		orientation: 'any',
		display: 'standalone',
		display_override: ['standalone'],
		id: env.BASE_URL,
		start_url: env.BASE_URL,
		scope: env.BASE_URL,
		icons: [
			{
				src: assetIcon192.src,
				type: 'image/png',
				sizes: '192x192',
			},
			{
				src: assetIconMask.src,
				type: 'image/png',
				sizes: '192x192',
				purpose: 'maskable',
			},
			{
				src: assetIcon512.src,
				type: 'image/png',
				sizes: '512x512',
			},
		],
		screenshots: [],
	};

	return new Response(JSON.stringify(result, null, 2), {
		headers: {
			'content-type': 'application/manifest+json',
		},
	});
}
