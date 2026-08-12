import { env } from '@src/env.config';
import { senv } from '@src/senv.config';
import { resolve } from 'node:path';
import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import SVGSpriter from 'svg-sprite';

export interface Sprite {
	svg: string;
	hash: string;
}

const spriteCache = new Map<string, Promise<Sprite>>();

const svgHash = (content: string): string =>
	createHash('sha256').update(content).digest('hex').slice(0, 8);

/**
 * Create an SVG sprite from an array of dirs
 */
const createSvgSprite = async (iconDirs: readonly string[]): Promise<string> => {
	const sprite = new SVGSpriter({
		mode: {
			symbol: true,
		},
	});

	for (const dir of iconDirs) {
		const dirPath = resolve(senv.ASSET_PATH, dir);

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

	return result.symbol.sprite.contents.toString();
};

/**
 * Build or return a cached SVG sprite
 */
export const getSvgSprite = (name: string, iconDirs: readonly string[]): Promise<Sprite> => {
	if (!spriteCache.has(name)) {
		spriteCache.set(
			name,
			createSvgSprite(iconDirs).then((svg) => ({
				svg,
				hash: svgHash(svg),
			})),
		);
	}

	return spriteCache.get(name) as Promise<Sprite>;
};

/**
 * SVG icon sprite URL
 */
export const getSvgSpriteURL = async (
	name: string,
	iconDirs: readonly string[],
): Promise<string> => {
	const { hash } = await getSvgSprite(name, iconDirs);

	return new URL(`/assets/icons/${name}.svg?v=${hash}`, env.BASE_URL).href;
};
