import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

const badges = [
	{
		file: 'test-status.svg',
		url: 'https://img.shields.io/github/actions/workflow/status/gibbs/gibbs.github.io/test.yml?label=Tests&style=flat-square',
	},
	{
		file: 'deploy-status.svg',
		url: 'https://img.shields.io/github/actions/workflow/status/gibbs/gibbs.github.io/deploy.yml?label=Release&style=flat-square',
	},
];

export default function buildBadgesIntegration(): AstroIntegration {
	return {
		name: 'build-badges',
		hooks: {
			'astro:config:setup': async ({ config, logger }) => {
				const badgesDir = path.join(fileURLToPath(config.publicDir), 'badges');

				await fs.mkdir(badgesDir, { recursive: true });

				await Promise.all(
					badges.map(async (badge) => {
						try {
							const response = await fetch(badge.url);

							if (!response.ok) {
								throw new Error(`${response.status} ${response.statusText}`);
							}

							await fs.writeFile(path.join(badgesDir, badge.file), await response.text());
						} catch (error: unknown) {
							logger.warn(`Failed to get badge ${badge.file}: ${error}`);
						}
					}),
				);
			},
		},
	};
}
