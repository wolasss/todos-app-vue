const env_config = require("./config.json");
const merge = require('webpack-merge');
const chunks = require('./config/webpack.chunks.js');
const paths = require('./config/webpack.paths.js')({
	root: __dirname
});

const config = merge(env_config, {
	root: __dirname,
	paths,
	chunks
});

const build_config_common = require('./config/webpack.common.js')(config);
const build_config_default = require('./config/webpack.build.default.js')(config);

const availableBuilds = {};
const build = availableBuilds[process.env.npm_lifecycle_event] || build_config_default;

module.exports = merge(build_config_common, build);