import { paths } from '../settings/paths.js'

import { deleteAsync } from 'del'

const reset = () =>
	deleteAsync([
		paths.buildFolder,
		paths.tempFolder,
		'**/.gitkeep'
	])

export { reset }
