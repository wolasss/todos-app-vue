const merge = require('webpack-merge');
const path = require('path');
const utils = require('./webpack.utils.js');
const webpack = require("webpack");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = function({
	env_dev,
	env_production,
	root,
	isProduction,
	paths // eslint-disable-line
}) {
	return merge({
			target: "web",
			resolve: {
				alias: {
					"vendor.css": path.resolve(root, "src", "styles", "vendor", "vendor.css"),
					"fonts": path.resolve(root, "src", "fonts"),
					"styles": path.resolve(root, "src", "styles"),
					"services": path.resolve(root, "src", "services"),
					"components": path.resolve(root, "src", "components")
				}
			}
		}, {
			module: {
				rules: [{
					test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
					use: "file-loader"
				}, {
					test: /\.vue$/,
					loader: 'vue-loader'
				}, {
					test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					// Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
					// loader: "url?limit=10000"
					use: "url-loader"
				}, {
					test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
					use: 'file-loader'
				}]
			}
		}, {
			plugins: [
				new ProgressBarPlugin()
			]
		},
		utils.setupES6(),
		utils.setupConfigVariables(isProduction ? env_production : env_dev)
	);
};