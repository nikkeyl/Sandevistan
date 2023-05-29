import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import { extensionsAndAliases } from './plugins/extensionsAndAliases.js'
import { replaceLoaderOptions } from './plugins/replaceLoaderOptions.js'
import { cssLoaderOptions } from './plugins/cssLoaderOptions.js'

const config = {
	mode: 'development',
	devtool: 'inline-source-map',
	stats: 'errors-warnings',
	optimization: {
		minimize: false
	},
	entry: `${paths.root}/js/app.js`,
	output: {
		filename: 'js/app.min.js',
		path: paths.built,
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true,
		static: paths.built,
		compress: true,
		open: true,

		watchFiles: [
			`${paths.root}/content/**/*.*`,
			`${paths.root}/**/*.html`,
			`${paths.root}/**/*.htm`
		]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: `${paths.root}/fonts`,
				use: [
					'style-loader',
					{
						loader: 'string-replace-loader',
						options: replaceLoaderOptions
					}, {
						loader: 'css-loader',
						options: cssLoaderOptions(1, true, '/')
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new plugins.FileIncludeWebpackPlugin({
			source: paths.srcFolder,
			replace: [
				{
					regex: '<link rel="stylesheet" href="css/style.min.css">',
					to: ''
				}, {
					regex: '../content',
					to: 'content'
				}, {
					regex: '@content',
					to: 'content'
				}
			]
		}),
		new plugins.CopyPlugin({
			patterns: [
				{
					from: `${paths.root}/content`,
					to: 'content',
					noErrorOnMissing: true,
					force: true
				}, {
					from: `${paths.root}/static`,
					to: 'static',
					noErrorOnMissing: true,
					force: true
				}, {
					from: `${paths.root}/favicon.ico`,
					to: './',
					noErrorOnMissing: true
				}
			]
		})
	],
	resolve: extensionsAndAliases
}

export default config
