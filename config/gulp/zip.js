import { app } from '../../gulpfile.js'

import zipPlugin from 'gulp-zip'

const zip = () => {
	return app.gulp.src(`${app.paths.buildFolder}/**/*.*`)
		.pipe(app.plugins.handleError('ZIP'))
		.pipe(zipPlugin(`${app.paths.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'))
}

export { zip }