import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import { configFTP } from '../settings/configFTP.js'

import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

const ftp = () => {
	configFTP.log = util.log

	const ftpConnect = vinylFTP.create(configFTP)

	return gulp.src(`${paths.buildFolder}/**/*.*`)
		.pipe(plugins.catchError('FTP'))
		.pipe(ftpConnect.dest(`/${paths.ftp}/`))
}

export { ftp }
