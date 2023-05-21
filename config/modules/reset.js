import { app } from '../../gulpfile.js'

import { deleteAsync } from 'del'

const reset = () => {
	return deleteAsync(
		[
			app.paths.buildFolder,
			app.paths.tempFolder,
			'**/.gitkeep'
		]
	)
}

export { reset }
