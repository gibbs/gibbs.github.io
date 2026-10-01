import type { RehypePlugins, RemarkPlugins } from '@astrojs/markdown-remark';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import remarkFlexibleMarkers from 'remark-flexible-markers';

export const remarkPlugins: RemarkPlugins = [remarkFlexibleMarkers];

export const rehypePlugins: RehypePlugins = [
	[
		rehypePrettyCode,
		{
			theme: 'github-dark',
			transformers: [
				transformerCopyButton({
					visibility: 'always',
					feedbackDuration: 3_000,
				}),
			],
		},
	],
];
