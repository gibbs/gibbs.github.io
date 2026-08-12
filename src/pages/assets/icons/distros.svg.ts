import type { APIRoute } from 'astro';
import { getSvgSprite, getSvgSpriteURL } from '@utils/icons';

const ICON_NAME = 'distros';
const ICON_DIRS = ['icons/distros'];

export const getDistrosSpriteURL = (): Promise<string> => getSvgSpriteURL(ICON_NAME, ICON_DIRS);

export const GET: APIRoute = async () => {
	const { svg } = await getSvgSprite(ICON_NAME, ICON_DIRS);

	return new Response(svg, {
		headers: {
			'content-type': 'image/svg+xml',
		},
	});
};
