import type { APIRoute } from 'astro';
import { readdir, readFile } from 'node:fs/promises';
import path, { resolve } from 'node:path';
import { senv } from '@src/senv.config';
import SVGSpriter from 'svg-sprite';

const iconPaths: string[] = [
	path.join(senv.ASSET_PATH, './icons/logos/'),
	path.join(senv.ASSET_PATH, './icons/general/'),
];

export const GET: APIRoute = async () => {
	const sprite = new SVGSpriter({
		mode: {
			symbol: true,
		},
	});

	for (const dirPath of iconPaths) {
		try {
			const files = await readdir(dirPath);

			for (const file of files) {
				const fullPath = resolve(dirPath, file);
				const content = await readFile(fullPath, 'utf-8');

				sprite.add(fullPath, file, content);
			}
		} catch (error) {
			console.error(`Error reading directory ${dirPath}:`, error);
		}
	}

	const { result } = await sprite.compileAsync();
	const svg = result.symbol.sprite.contents;

	return new Response(svg, {
		headers: {
			'content-type': 'image/svg+xml',
		},
	});
};
