import { handleError } from './error-handler.js'

import FileIncludeWebpackPlugin from 'file-include-webpack-plugin-replace'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import webpack from 'webpack-stream'
import rename from 'gulp-rename'
import ifPlugin from 'gulp-if'
import fs from 'fs'

const plugins = {
	FileIncludeWebpackPlugin,
	if: ifPlugin,
	TerserPlugin,
	handleError,
	CopyPlugin,
	webpack,
	rename,
	fs
}

export { plugins }