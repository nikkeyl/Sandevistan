import { app } from '../../gulpfile.js'

import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'

export const html = () => {
	return app.gulp.src(`${app.paths.build.html}**/*.html`)
		.pipe(app.plugins.handleError('HTML'))
		.pipe(
			app.plugins.if(
				app.isNoWebp,
				webpHtmlNosvg()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': 'v',
						'cover': 0,
						'to': [
							'css',
							'js'
						]
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.paths.build.html))
}