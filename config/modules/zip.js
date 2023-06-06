import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import zipPlugin from 'gulp-zip'

const zip = () => {
	return gulp.src(`${paths.buildFolder}/**/*.*`)
		.pipe(plugins.catchError('ZIP'))
		.pipe(zipPlugin(`${paths.rootFolder}.zip`))
		.pipe(gulp.dest(paths.tempFolder))
}

export { zip }
