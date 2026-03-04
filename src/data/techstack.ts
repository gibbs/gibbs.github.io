import { __ } from '@i18n/utils';

export interface TechStack {
	heading: string;
	description: string;
	items: TechStackItem[];
}

export interface TechStackItem {
	title: string;
	icon?: string;
}

export const STACK: Record<string, TechStack> = {
	core: {
		heading: __('component.techstack.heading.core'),
		description: __('component.techstack.description.core'),
		items: [
			{ title: 'HTML' },
			{ title: 'CSS' },
			{ title: 'DNS' },
			{ title: 'REST' },
			{ title: 'PHP' },
			{ title: 'JavaScript' },
			{ title: 'TypeScript' },
			{ title: 'Node.js' },
			{ title: 'Bash' },
		],
	},
	frameworks: {
		heading: __('component.techstack.heading.frameworks'),
		description: __('component.techstack.description.frameworks'),
		items: [
			{ title: 'Laravel' },
			{ title: 'Astro' },
			{ title: 'Alpine.js' },
			{ title: 'Tailwind' },
			{ title: 'Next.js' },
			{ title: 'React' },
			{ title: 'Vue.js' },
		],
	},
	testing_data: {
		heading: __('component.techstack.heading.testing_data'),
		description: __('component.techstack.description.testing_data'),
		items: [
			{ title: 'Playwright' },
			{ title: 'PHPUnit', icon: 'php' },
			{ title: 'RSpec' },
			{ title: 'ServerSpec', icon: 'rspec' },
			{ title: 'MySQL' },
			{ title: 'MariaDB' },
			{ title: 'PostgreSQL' },
			{ title: 'SQLite' },
			{ title: 'OpenSearch' },
			{ title: 'Redis' },
		],
	},
	tools_infra: {
		heading: __('component.techstack.heading.tools_infra'),
		description: __('component.techstack.description.tools_infra'),
		items: [
			{ title: 'Git' },
			{ title: 'Composer' },
			{ title: 'NPM' },
			{ title: 'Vite' },
			{ title: 'Make' },
			{ title: 'PostCSS' },
			{ title: 'Linux' },
			{ title: 'Docker' },
			{ title: 'Podman' },
			{ title: 'Terraform' },
			{ title: 'Puppet' },
			{ title: 'Bolt' },
			{ title: 'Prometheus' },
			{ title: 'Grafana' },
			{ title: 'Ubuntu' },
		],
	},
	providers: {
		heading: __('component.techstack.heading.providers'),
		description: __('component.techstack.description.providers'),
		items: [
			{ title: 'Magento' },
			{ title: 'Prismic' },
			{ title: 'Cloudflare' },
			{ title: 'AWS' },
			{ title: 'GitHub Actions', icon: 'github' },
			{ title: 'Katapult', icon: 'katapult' },
		],
	},
	legacy: {
		heading: __('component.techstack.heading.legacy'),
		description: __('component.techstack.description.legacy'),
		items: [
			{ title: 'Ansible' },
			{ title: 'Bootstrap' },
			{ title: 'CodeIgniter' },
			{ title: 'Consul' },
			{ title: 'Cypress' },
			{ title: 'Drupal' },
			{ title: 'ElasticSearch' },
			{ title: 'Eleventy', icon: '11ty' },
			{ title: 'Express.js' },
			{ title: 'Firebase' },
			{ title: 'GraphQL' },
			{ title: 'Grunt' },
			{ title: 'GitPod' },
			{ title: 'Gulp' },
			{ title: 'Jenkins' },
			{ title: 'jQuery' },
			{ title: 'Kohana', icon: 'php' },
			{ title: 'LESS' },
			{ title: 'Lumen' },
			{ title: 'MODX' },
			{ title: 'MongoDB' },
			{ title: 'Perl' },
			{ title: 'Portainer' },
			{ title: 'Python' },
			{ title: 'RabbitMQ' },
			{ title: 'Rollup' },
			{ title: 'SASS' },
			{ title: 'SQL Server' },
			{ title: 'Symfony' },
			{ title: 'Webpack' },
			{ title: 'WordPress' },
			{ title: 'Vagrant' },
			{ title: 'Zend Framework', icon: 'zend' },
		],
	},
} as const;

export type TechStackMap = typeof STACK;
