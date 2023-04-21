import FileIncludeWebpackPlugin from 'file-include-webpack-plugin-replace'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import webpack from 'webpack-stream'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import rename from 'gulp-rename'
import ifPlugin from 'gulp-if'
import fs from 'fs'

export const plugins = {
    FileIncludeWebpackPlugin,
    if: ifPlugin,
    TerserPlugin,
    CopyPlugin,
    plumber,
    webpack,
    notify,
    rename,
    fs
}