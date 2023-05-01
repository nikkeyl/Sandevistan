import { app } from '../../gulpfile.js'

import webPackConfig from '../webpack/webpack.prod.js'

const js = () => {
	return app.gulp.src(app.paths.src.js)
		.pipe(app.plugins.handleError('JS'))
		.pipe(app.plugins.webpack({
			config: webPackConfig
		}))
		.pipe(app.gulp.dest(app.paths.build.js))
}

export { js }