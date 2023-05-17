import { app } from '../../gulpfile.js'

import { deleteAsync } from 'del'

const reset = () => {
	return deleteAsync(
		[
			`${app.paths.rootFolder}.zip`,
			app.paths.reportsFolder,
			app.paths.buildFolder,
			'**/.gitkeep'
		]
	)
}

export { reset }
