const postcssGlobalData = require('@csstools/postcss-global-data');

module.exports = {
	plugins: [
		postcssGlobalData({
			files: [
				'./src/styles/variables.css',
				'./src/styles/utilities.css'
			],
		}),
		require('postcss-custom-media'),
		require('postcss-nesting'),
	],
};
