export type Feed = {
	activity: {
		items: [FeedCommit];
	};
	insights: {
		languages: [];
		stats: {
			bytes: number;
			count: number;
			usage: [FeedLanguageUsage];
		};
	};
};

export type FeedLanguageUsage = {
	name: string;
	count: number;
	bytes: number;
	percentage: number;
	width: number;
};

export type FeedCommit = {
	author: {
		avatar_url: string;
		login: string;
	};
	commit: {
		author: {
			date: string;
		};
		message: string;
		url: string;
	};
	html_url: string;
	repository: {
		html_url: string;
		name: string;
	};
	sha: string;
};

export type Commits = {
	datetime: string;
	date: string;
	items: {
		avatar: string;
		author: string;
		repository: {
			name: string;
			url: string;
		};
		commit: {
			date: string;
			datetime: string;
			timestamp: string;
			message: string;
			hash: string;
			url: string;
			merge: boolean;
		};
	}[];
};
