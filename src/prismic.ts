import { env } from '@src/env.config';
import { senv } from '@src/senv.config';
import * as prismic from '@prismicio/client';

export const repository: string = prismic.getRepositoryName(env.PRISMIC_REPOSITORY);

const routes: prismic.ClientConfig['routes'] = [
	{
		type: 'project',
		path: '/projects/:uid',
	},
	{
		type: 'blog',
		path: '/blog/:uid',
	},
	{
		type: 'tools',
		path: '/tools/:uid',
	},
];

export const client: prismic.Client = prismic.createClient(repository, {
	accessToken: senv.PRISMIC_ACCESS_TOKEN,
	routes,
});

export async function getHomepage() {
	return await client.getSingle('homepage');
}

export async function getAllProjects() {
	return client.getByType('project', {
		orderings: {
			field: 'my.project.date',
			direction: 'desc',
		},
	});
}

export async function getAllPosts() {
	return client.getByType('blog', {
		orderings: {
			field: 'my.blog.date',
			direction: 'desc',
		},
	});
}

export async function getAllTools() {
	return client.getByType('tools', {
		orderings: {
			field: 'my.tools.uid',
			direction: 'asc',
		},
	});
}

export async function getPageByUID(uid: string, type: string = 'page') {
	return await client.getByUID(type, uid, {
		page: 1,
		pageSize: 1,
	});
}
