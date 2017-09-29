const merge = require('webpack-merge');
const utils = require('./webpack.utils.js');

module.exports = function({
	env_dev,
	env_production,
	root,
	isProduction,
	isPurify,
	isDevCI,
	paths,
	chunks
}) {
	return merge({
			entry: {
				app: paths.app
			},
			output: {
				path: paths.build,
				filename: '[name].js',
				chunkFilename: '[name].js'
			}
		},
		utils.setupSourceMap(isProduction),
		utils.cleanBuild(paths.build),
		utils.setupCSS(paths, isPurify),
		utils.extractBundle({
			name: 'vendor',
			entries: chunks.vendor
		}),
		utils.setupDevServer(isProduction, isDevCI)
	);
};