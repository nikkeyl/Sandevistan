import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import webPackConfig from '../webpack/webpack.prod.js'

const jsProd = () => {
	return gulp.src(paths.src.js)
		.pipe(plugins.catchError('JS'))
		.pipe(plugins.webpack({ config: webPackConfig }))
		.pipe(gulp.dest(paths.build.js))
}

export { jsProd }
