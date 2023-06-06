import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import { isNoWebp } from '../../gulpfile.js'

import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import htmlMin from 'gulp-htmlmin'

const html = () => {
	return gulp.src(`${paths.build.html}*.html`)
		.pipe(plugins.catchError('HTML'))
		.pipe(plugins.if(
			isNoWebp,
			webpHtmlNosvg()
		))
		.pipe(versionNumber({
			'value': '%DT%',
			'append': {
				'key': 'v',
				'cover': 0,
				'to': [
					'css',
					'js'
				]
			}
		}))
		.pipe(htmlMin({
			removeRedundantAttributes: true,
			removeEmptyAttributes: true,
			removeEmptyElements: true,
			removeComments: true
		}))
		.pipe(gulp.dest(paths.build.html))
}

export { html }
