import { catchError } from '../modules/catchErrors.js'

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
	catchError,
	CopyPlugin,
	webpack,
	rename,
	fs
}

export { plugins }