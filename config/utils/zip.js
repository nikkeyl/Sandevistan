import { app } from '../../gulpfile.js'

import zipPlugin from 'gulp-zip'

const zip = () =>
	app.gulp.src(`${app.paths.buildFolder}/**/*.*`)
		.pipe(app.plugins.catchError('ZIP'))
		.pipe(zipPlugin(`${app.paths.rootFolder}.zip`))
		.pipe(app.gulp.dest(app.paths.tempFolder))

export { zip }
