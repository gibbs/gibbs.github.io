const postcssGlobalData = require('@csstools/postcss-global-data');
const postcssOKLabFunction = require('@csstools/postcss-oklab-function');

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
		postcssOKLabFunction({
			preserve: false,
			enableProgressiveCustomProperties: true
    }),
	],
};
