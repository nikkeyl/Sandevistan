import gulp from 'gulp'

import { argv } from 'node:process'

import { validator } from './config/modules/validators.js'
import { reset } from './config/modules/reset.js'
import { zip } from './config/modules/zip.js'
import { ftp } from './config/modules/ftp.js'

import { otfToTtf, ttfToWoff, fontsStyles } from './config/gulp/fonts.js'
import { images } from './config/gulp/images.js'
import { sprite } from './config/gulp/sprite.js'
import { jsProd } from './config/gulp/jsProd.js'
import { jsDev } from './config/gulp/jsDev.js'
import { html } from './config/gulp/html.js'
import { css } from './config/gulp/css.js'

const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fontsStyles)
const build = gulp.series(
	fonts,
	jsDev,
	jsProd,
	gulp.parallel(html, css, images),
	gulp.parallel(validator, zip)
)
const dev = gulp.parallel(fonts, sprite)
const runFTP = gulp.series(build, ftp)
const isNoWebp = !argv.includes('--nowebp')

gulp.task('default', dev)

export {
	isNoWebp,
	sprite,
	runFTP,
	build,
	fonts
}
