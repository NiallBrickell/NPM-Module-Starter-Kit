var argv = require('yargs').argv;
var webpack = require('webpack');
var webpackConfig = require('./webpack.conf');
var debugLib = require('debug');

var debug = debugLib('app:karma');
debug('Create configuration.');

var karmaConfig = {
	basePath: './',
	files: [
		{
			pattern: './test/test-bundler.js',
			watched: false,
			served: true,
			included: true,
		},
	],
	plugins: [
		'karma-mocha',
		'karma-coverage',
		'karma-webpack',
		'karma-mocha-reporter',
		'karma-phantomjs-launcher',
		'karma-babel-preprocessor',
	],
	singleRun: !argv.watch,
	frameworks: ['mocha'],
	reporters: ['mocha', 'coverage'],
	preprocessors: {
		'test/test-bundler.js': ['webpack'],
		'test/**/*.js': ['babel'],
		'src/**/*.js': ['babel', 'coverage'],
	},
	babelPreprocessor: {
		options: {
			presets: ['es2015', 'stage-0'],
		},
	},
	browsers: ['PhantomJS'],
	webpack: {
		devtool: 'eval',
		resolve: webpackConfig.resolve,
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('development'),
				},
				__DEV__: false,
			}),
		],
		module: {
			noParse: [
				/\/sinon\.js/,
			],
			loaders: webpackConfig.module.loaders,
		},
	},
	webpackMiddleware: {
		noInfo: true,
		stats: {
			chunks: false,
		},
	},
	coverageReporter: {
		type: 'html',
		dir: 'coverage/',
	},
};

module.exports = (cfg) => cfg.set(karmaConfig);
