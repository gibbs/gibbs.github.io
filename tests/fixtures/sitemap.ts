import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

type Fixtures = {
	xsd: string;
};

export const test = base.extend<Fixtures>({
	xsd: async ({}, use) => {
		const xsdPath = path.resolve(__dirname, 'sitemap.xsd');
		const xsdContent = fs.readFileSync(xsdPath, 'utf-8');

		await use(xsdContent);
	},
});

export { expect } from '@playwright/test';
