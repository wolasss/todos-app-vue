const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const glob = require('glob');
const path = require('path');

exports.extractBundle = function(options) {
	const entry = {};
	entry[options.name] = options.entries;

	return {
		entry: entry,
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				names: [options.name, 'init']
			})
		]
	};
};

exports.setupSourceMap = function(isProduction) {
	return !isProduction ? {
		devtool: 'source-map'
	} : {};
};

exports.cleanBuild = function(path) {
	return {
		plugins: [
			new CleanWebpackPlugin([path], {
				root: process.cwd()
			})
		]
	};
};

exports.setupES6 = function() {
	return {
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["env"]
					}
				}
			}]
		}
	};
};

exports.setupCSS = function(paths, isPurify) {
	const extractAppStyles = new ExtractTextPlugin({
		filename: 'style.css',
		allChunks: false
	});
	const extractVendorStyles = new ExtractTextPlugin({
		filename: 'vendor.css',
		allChunks: false
	});

	const ret = {
		module: {
			rules: [{
				test: /(bulma).+\.(s?css|sass)/,
				use: extractVendorStyles.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						query: {
							importLoaders: 1,
							modules: false
						}
					}, 'sass-loader']
				})
			}, {
				test: /vendor.+\.css/,
				use: ['style-loader', 'css-loader']
			}]
		},
		plugins: [

			extractVendorStyles
		]
	};

	return ret;
};

exports.setupDevServer = function(isProduction) {
	return !isProduction ? {
		devServer: {
			historyApiFallback: {
				rewrites: [{
					from: /\/([\w\d])+\.(?:js|woff\d?|ttf)(\.map)?/,
					to: context => {
						return context.match[0];
					}
				}]
			}
		}
	} : {};
};

exports.setupConfigVariables = function(config) {
	return {
		plugins: [
			new InlineEnviromentVariablesPlugin(config, {
				warnings: false
			})
		]
	};
};