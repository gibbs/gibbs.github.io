interface PrismicDocument {
	data: {
		title: string;
		summary: string;
		meta_title: string;
		meta_description: string;
		linkdata: Array<{ text: string }>;
		[key: string]: any;
	};
}

interface Frontmatter {
	title: string;
	description: string;
	linkdata: {
		headline: string;
		description: string;
		'@type'?: string;
		[key: string]: unknown;
	};
}

/**
 * Generate frontmatter based on prismic documents
 */
export function generateFrontmatter(document: PrismicDocument, type?: string): Frontmatter {
	const linkData: Record<string, unknown> = {
		headline: document.data.title,
		description: document.data.summary,
	};

	if (type) {
		linkData['@type'] = type;
	}

	const frontmatter: Frontmatter = {
		title: document.data.meta_title,
		description: document.data.meta_description,
		linkdata: {
			...linkData,
			...JSON.parse(document.data.linkdata[0].text),
		},
	};

	return frontmatter;
}
