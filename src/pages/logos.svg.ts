import type { APIRoute } from 'astro';
import { readdir, readFile } from 'node:fs/promises';
import path, { resolve } from 'node:path';
import { senv } from '@src/senv.config';
import SVGSpriter from 'svg-sprite';

const filePath: string = path.join(senv.ASSET_PATH, './icons/logos/');

export const GET: APIRoute = async () => {
	const sprite = new SVGSpriter({
		mode: {
			symbol: true,
		},
	});

	for (const file of await readdir(filePath)) {
		const path = resolve(filePath, file);
		sprite.add(path, file, await readFile(path).then((file) => file.toString()));
	}

	const { result } = await sprite.compileAsync();

	const svg = result.symbol.sprite.contents;

	return new Response(svg, {
		headers: {
			'content-type': 'image/svg+xml',
		},
	});
};
