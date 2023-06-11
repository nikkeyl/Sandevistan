import { app } from '../../gulpfile.js'

import groupCssMediaQueries from 'gulp-group-css-media-queries'
import autoPrefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss'
import cssComb from 'gulp-csscomb'

const css = () =>
	app.gulp.src(`${app.paths.build.css}style.css`)
		.pipe(app.plugins.catchError('CSS'))
		.pipe(groupCssMediaQueries())
		.pipe(webpCss({
			noWebpClass: '.no-webp',
			webpClass: '.webp'
		}))
		.pipe(cssComb())
		.pipe(autoPrefixer())
		.pipe(app.gulp.dest(app.paths.build.css))
		.pipe(cleanCss({ level: 2 }))
		.pipe(app.plugins.rename({ suffix: '.min' }))
		.pipe(app.gulp.dest(app.paths.build.css))

export { css }
