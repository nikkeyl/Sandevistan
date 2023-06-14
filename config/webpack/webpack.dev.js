import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import { extensionsAndAliases } from './plugins/extensionsAndAliases.js'
import { replaceLoaderOptions } from './plugins/replaceLoaderOptions.js'
import { cssLoaderOptions } from './plugins/cssLoaderOptions.js'
import { output } from './plugins/webPackOutputFile.js'
import { pugPages } from './plugins/pugPages.js'

const config = {
	mode: 'development',
	devtool: 'inline-source-map',
	stats: 'errors-warnings',
	optimization: {
		minimize: false
	},
	entry: `${paths.root}/js/app.js`,
	output: output('js/app.min.js'),
	devServer: {
		historyApiFallback: true,
		static: paths.built,
		compress: true,
		port: 3000,
		open: true,

		watchFiles: [
			`${paths.root}/img/**/*.*`,
			`${paths.root}/**/*.pug`
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				resolve: {
					fullySpecified: false
				}
			}, {
				test: /\.scss$/,
				exclude: `${paths.root}/fonts`,
				use: [
					'style-loader',
					{
						loader: 'string-replace-loader',
						options: replaceLoaderOptions('../')
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
			}, {
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader'
					}, {
						loader: 'string-replace-loader',
						options: replaceLoaderOptions('')
					}
				]
			}
		]
	},
	plugins: [
		...pugPages.map(pugPage => new plugins.HtmlWebpackPlugin({
			minify: false,
			inject: false,
			template: `${paths.srcFolder}/${pugPage}`,
			filename: pugPage.replace(/\.pug$/, '.html')
		})),
		new plugins.CopyPlugin({
			patterns: [
				{
					from: `${paths.root}/img`,
					to: 'img',
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
