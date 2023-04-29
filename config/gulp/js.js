import { app } from '../../gulpfile.js'

import webPackConfig from '../webpack/webpack.prod.js'

export const js = () => {
	return app.gulp.src(app.paths.src.js)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(app.plugins.webpack({
			config: webPackConfig
		}))
		.pipe(app.gulp.dest(app.paths.build.js))
}