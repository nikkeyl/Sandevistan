import { app } from '../../gulpfile.js'

import { configFTP } from '../settings/configFTP.js'

import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

configFTP.log = util.log

const ftpConnect = vinylFTP.create(configFTP)
const ftp = () =>
	app.gulp.src(`${app.paths.buildFolder}/**/*.*`)
		.pipe(app.plugins.catchError('FTP'))
		.pipe(ftpConnect.dest(`/${app.paths.ftp}/`))

export { ftp }
