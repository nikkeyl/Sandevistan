import { app } from '../../gulpfile.js'

import groupCssMediaQueries from 'gulp-group-css-media-queries'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import webpcss from 'gulp-webpcss'
import purge from 'gulp-css-purge'

const css = () => {
	return app.gulp.src(`${app.paths.build.css}style.css`)
		.pipe(app.plugins.catchError('CSS'))
		.pipe(groupCssMediaQueries())
		.pipe(webpcss({
			noWebpClass: '.no-webp',
			webpClass: '.webp'
		}))
		.pipe(purge({
			shorten: false,
			trim: false
		}))
		.pipe(autoprefixer())
		.pipe(app.gulp.dest(app.paths.build.css))
		.pipe(cleanCss({
			level: 2
		}))
		.pipe(app.plugins.rename({
			suffix: '.min'
		}))
		.pipe(app.gulp.dest(app.paths.build.css))
}

export { css }
