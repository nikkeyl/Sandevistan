import { app } from '../../gulpfile.js'

import { configFTP } from '../settings/ftp.js'

import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnect = vinylFTP.create(configFTP)

	return app.gulp.src(`${app.paths.buildFolder}/**/*.*`)
		.pipe(app.plugins.handleError('FTP'))
		.pipe(ftpConnect.dest(`/${app.paths.ftp}/${app.paths.rootFolder}`))
}