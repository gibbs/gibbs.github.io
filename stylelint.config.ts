import type { Config } from 'stylelint';

const config: Config = {
	extends: ['stylelint-config-standard'],
	rules: {
		'import-notation': null,
		'selector-class-pattern': null,
	},
};

export default config;
