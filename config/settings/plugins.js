import { catchError } from '../utils/catchErrors.js'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import webpack from 'webpack-stream'
import rename from 'gulp-rename'
import ifPlugin from 'gulp-if'
import chalk from 'chalk'
import fs from 'fs'

//! FIX: Add the new operator to plugin declarations
const plugins = {
	HtmlWebpackPlugin,
	if: ifPlugin,
	TerserPlugin,
	catchError,
	CopyPlugin,
	webpack,
	rename,
	chalk,
	fs
}

export { plugins }
