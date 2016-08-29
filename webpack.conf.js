var path = require('path');
var webpack = require('webpack');

var webpackConf = {
	entry: ['./src/index.js'],
	resolve: {
		root: path.resolve('./src'),
	},
	output: {
		path: path.resolve('./dist'),
		filename: 'index.js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
			},
		],
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				unused: true,
				dead_code: true,
				warnings: false,
			},
		}),
	],
};

module.exports = webpackConf;
