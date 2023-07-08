import gulp from 'gulp'

import { argv } from 'node:process'

import { plugins } from './config/settings/plugins.js'
import { paths } from './config/settings/paths.js'

import { validator } from './config/utils/validators.js'
import { deploy } from './config/utils/deploy.js'
import { reset } from './config/utils/reset.js'
import { zip } from './config/utils/zip.js'

import { otfToTtf, ttfToWoff, fontsStyles } from './config/gulp-tasks/fonts.js'
import { images } from './config/gulp-tasks/images.js'
import { sprite } from './config/gulp-tasks/sprite.js'
import { jsProd } from './config/gulp-tasks/jsProd.js'
import { jsDev } from './config/gulp-tasks/jsDev.js'
import { html } from './config/gulp-tasks/html.js'
import { css } from './config/gulp-tasks/css.js'

const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fontsStyles)
const build = gulp.series(
	fonts,
	jsDev,
	jsProd,
	gulp.parallel(html, css, images),
	gulp.parallel(validator, zip)
)
const dev = gulp.parallel(fonts, sprite)
const app = {
	isNoWebp: !argv.includes('--no-webp'),
	plugins,
	paths,
	gulp
}

export {
	sprite,
	deploy,
	build,
	fonts,
	app
}

export default dev
