const trans: Record<string, any> = {
	nav: {
		home: 'Home',
		blog: 'Blog',
		projects: 'Projects',
		tools: 'Tools',
	},
	component: {
		copyright: `Copyright $1 2007 - $2 Dan Gibbs`,
		build: 'Build',
		githubinsights: {
			sourced: 'Data sourced from public repositories',
		},
		techstack: {
			title: 'Tech Stack',
			heading: {
				core: 'Web & Languages',
				frameworks: 'Frameworks & Libraries',
				testing_data: 'Testing & Data',
				tools_infra: 'Tools & Infrastructure',
				providers: 'CMS & Providers',
				legacy: 'Legacy',
			},
			description: {
				core: '',
				frameworks: '',
				testing_data: '',
				tools_infra: '',
				providers: '',
				legacy: '',
			},
		},
		noscript: {
			banner: 'This page requires javascript fully function correctly.',
			anchor: 'Instructions on how to enable JavaScript in your web browser.',
		},
		returntoarea: {
			previous: 'Previous',
			back: 'Back to $1',
		},
	},
};

export default trans;
