// src/service-worker.ts
/// <reference lib="webworker" />
import type { Feed, Commits, FeedCommit } from './types';
import { format, formatISO, parseISO } from 'date-fns';

export type Version = number;
const version: Version = 3.0;

declare let self: ServiceWorkerGlobalScope;
const CACHE_NAME: string = `dangibbs-pwa-v${version}`;

onmessage = (event: MessageEvent) => {
	if (event.data.type === 'getActivityFeed') {
		getActivityFeed();
	}
};

function getActivityFeed() {
	const url = new URL(
		import.meta.env.VITE_APP_SERVICE_URL.replace(/\/+$/, '') + '/data/activity-feed.json',
	).toString();

	fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => getProcessedFeed(data))
		.then((data) => {
			postMessage({
				type: 'insights',
				detail: {
					insights: data.insights,
					activity: data.activity,
				},
			});
		});
}

function getProcessedFeed(data: Feed) {
	const commits: Record<string, Commits> = {};

	for (const i in data.activity.items) {
		const item: FeedCommit = data.activity.items[i];
		const group = format(parseISO(item.commit.author.date), 'MMM do yyyy');

		if (!(group in commits)) {
			commits[group] = {
				datetime: item.commit.author.date,
				date: group,
				items: [],
			};
		}

		commits[group].items.push({
			avatar: item.author.avatar_url,
			author: item.author.login,
			repository: {
				name: item.repository.name,
				url: item.repository.html_url,
			},
			commit: {
				date: format(parseISO(item.commit.author.date), 'E do LLL yyyy HH:mm O'),
				datetime: formatISO(parseISO(item.commit.author.date)),
				timestamp: item.commit.author.date,
				message: item.commit.message,
				hash: item.sha.slice(0, 8),
				url: item.html_url,
				merge: item.commit.message.includes('Merge pull request #'),
			},
		});
	}

	return {
		insights: data.insights,
		activity: commits,
	};
}
