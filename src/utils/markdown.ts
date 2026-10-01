import { createMarkdownProcessor, type MarkdownRenderer } from '@astrojs/markdown-remark';
import { remarkPlugins, rehypePlugins } from '@src/markdown.config';

let processor: Promise<MarkdownRenderer> | undefined;

/**
 * Render string to HTML using the remark/rehype
 */
export async function renderMarkdown(content: string = ''): Promise<string> {
	processor ??= createMarkdownProcessor({
		syntaxHighlight: false,
		remarkPlugins,
		rehypePlugins,
	});

	const { code } = await (await processor).render(content);

	return code;
}

/**
 * Render string to HTML
 */
export async function renderMarkdownInline(content: string = ''): Promise<string> {
	const code = (await renderMarkdown(content)).trim();

	return code.startsWith('<p>') && code.endsWith('</p>') && code.indexOf('<p>', 1) === -1
		? code.slice(3, -4)
		: code;
}
