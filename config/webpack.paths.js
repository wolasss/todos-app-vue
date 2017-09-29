const path = require('path');

module.exports = function({
	root
}) {
	return {
		app: path.join(root, 'src'),
		build: path.join(root, 'build'),
		vendorStyles: path.resolve(root, 'src', 'styles', 'vendor')
	};
};