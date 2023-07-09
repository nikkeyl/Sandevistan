import { app } from '../../gulpfile.js'

import webPackConfig from '../webpack/webpack.prod.js'

const jsProd = () =>
	app.gulp.src(app.paths.src.js)
		.pipe(app.plugins.catchError('JS'))
		.pipe(app.plugins.webpack({
			config: webPackConfig
		}))
		.pipe(app.gulp.dest(app.paths.build.js))

export { jsProd }
