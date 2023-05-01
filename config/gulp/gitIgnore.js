import { app } from '../../gulpfile.js'

const gitIgnore = () => {
	if (!app.plugins.fs.existsSync('.gitignore')) {
		app.plugins.fs.writeFile('.gitignore', '', cb)
		app.plugins.fs.appendFile('.gitignore', 'package-lock.json\r\n', cb)
		app.plugins.fs.appendFile('.gitignore', 'node_modules/\r\n', cb)
		app.plugins.fs.appendFile('.gitignore', 'phpmailer/\r\n', cb)
		app.plugins.fs.appendFile('.gitignore', '.gitignore\r\n', cb)
		app.plugins.fs.appendFile('.gitignore', '**/*.zip\r\n', cb)
		app.plugins.fs.appendFile('.gitignore', 'reports/\r\n', cb)
		app.plugins.fs.appendFile('.gitignore', 'build/\r\n', cb)
	}
	return app.gulp.src(app.paths.srcFolder)
}
function cb() { }

export { gitIgnore }