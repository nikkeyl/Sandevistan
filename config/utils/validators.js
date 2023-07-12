import { app } from '../../gulpfile.js'

import { htmlValidator } from 'gulp-w3c-html-validator'
import accessibility from 'gulp-wcag-accessibility'
import bemValidator from 'gulp-html-bem-validator'

const validator = () =>
	app.gulp.src(`${app.paths.build.html}*.html`)
		.pipe(bemValidator())
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter())
		.pipe(accessibility({
			reportLocation: app.paths.binFolder,
			accessibilityLevel: 'WCAG2AAA',
			reportLevels: {
				warning: true,
				error: true
			},
			verbose: false,
			force: true
		}))

export { validator }
