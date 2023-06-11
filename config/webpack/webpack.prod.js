import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import { extensionsAndAliases } from './plugins/extensionsAndAliases.js'
import { replaceLoaderOptions } from './plugins/replaceLoaderOptions.js'
import { cssLoaderOptions } from './plugins/cssLoaderOptions.js'
import { output } from './plugins/webPackOutputFile.js'
import { linters } from '../modules/linters.js'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config = {
	mode: 'production',
	cache: { type: 'filesystem' },
	optimization: {
		minimizer: [
			new plugins.TerserPlugin({ extractComments: false })
		]
	},
	output: output('app.min.js'),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				resolve: { fullySpecified: false }
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'string-replace-loader',
						options: replaceLoaderOptions
					}, {
						loader: 'css-loader',
						options: cssLoaderOptions()
					}, {
						loader: 'sass-loader',
						options: {
							sassOptions: { outputStyle: 'expanded' }
						}
					}
				]
			}
		]
	},
	plugins: [
		linters.styleLint,
		linters.esLint,

		new plugins.FileIncludeWebpackPlugin({
			source: paths.srcFolder,
			destination: '../',
			replace: [
				{
					regex: '../img',
					to: 'img'
				}, {
					regex: '@img',
					to: 'img'
				}
			]
		}),
		new MiniCssExtractPlugin({ filename: '../css/style.css' }),
		new plugins.CopyPlugin({
			patterns: [
				{
					from: `${paths.root}/static`,
					to: '../static',
					noErrorOnMissing: true
				}, {
					from: `${paths.root}/favicon.ico`,
					to: '../',
					noErrorOnMissing: true
				}
			]
		})
	],
	resolve: extensionsAndAliases
}

export default config
