import { app } from '../../gulpfile.js'

import webpHtmlNoSvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import htmlMin from 'gulp-htmlmin'

const html = () =>
	app.gulp.src(`${app.paths.build.html}*.html`)
		.pipe(app.plugins.catchError('HTML'))
		.pipe(app.plugins.if(
			app.isNoWebp,
			webpHtmlNoSvg()
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
			},
			'output': {
				'file': `${app.paths.binFolder}/version.json`
			}
		}))
		.pipe(htmlMin({
			removeRedundantAttributes: true,
			removeEmptyAttributes: true
		}))
		.pipe(app.gulp.dest(app.paths.build.html))

export { html }
