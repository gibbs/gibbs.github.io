const trans: Record<string, any> = {
	nav: {
		home: 'Home',
		blog: 'Blog',
		projects: 'Projects',
		tools: 'Tools',
	},
	component: {
		hero: {
			title: 'Dan Gibbs',
			subtitle: 'Full-stack web developer',
			location: 'Devon, UK',
		},
		copyright: `Copyright $1 2007 - $2 Dan Gibbs`,
		build: 'Build',
		githubinsights: {
			sourced: 'Data sourced from public repositories',
		},
		techstack: {
			title: 'Tech Stack',
		},
		noscript: {
			banner: 'This page requires javascript fully function correctly.',
			anchor: 'Instructions on how to enable JavaScript in your web browser.',
		},
		returntoarea: {
			previous: 'Previous',
			back: 'Back to $1',
		},
		search: {
			placeholder: 'Search...',
			search: 'Search site content',
			unavailable: 'Search is currently unavailable.',
			fetchFailed: 'Unable to fetch search results.',
			results: '$1 results available. Use up and down arrows to review results.',
			noresults: 'No results found.',
		},
	},
};

export default trans;
