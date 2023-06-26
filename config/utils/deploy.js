import { app } from '../../gulpfile.js'

import ghPages from 'gh-pages'

//! FIX: Speed up the { deploy } function
const deploy = () =>
	ghPages.publish(
		app.paths.buildFolder,
		{
			repo: `https://github.com/nikkeyl/${app.paths.rootFolder}.git`
		},
		error => {
			error
				? console.log(error)
				: console.log(app.plugins.chalk.green.bold('Published'))
		}
	)

export { deploy }
