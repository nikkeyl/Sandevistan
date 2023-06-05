import { app } from '../../gulpfile.js'

import { deleteAsync } from 'del'

const reset = () =>
	deleteAsync([
		app.paths.buildFolder,
		app.paths.tempFolder,
		'**/.gitkeep'
	])

export { reset }
