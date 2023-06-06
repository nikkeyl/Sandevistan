import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import groupCssMediaQueries from 'gulp-group-css-media-queries'
import autoPrefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss'
import cssComb from 'gulp-csscomb'

// import purge from 'gulp-css-purge'

const css = () => {
	return gulp.src(`${paths.build.css}style.css`)
		.pipe(plugins.catchError('CSS'))
		.pipe(groupCssMediaQueries())
		.pipe(webpCss({
			noWebpClass: '.no-webp',
			webpClass: '.webp'
		}))

		// .pipe(purge({ // working with errors
		// 	shorten: false,
		// 	trim: false
		// }))
		.pipe(cssComb())
		.pipe(autoPrefixer())
		.pipe(gulp.dest(paths.build.css))
		.pipe(cleanCss({ level: 2 }))
		.pipe(plugins.rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.build.css))
}

export { css }
