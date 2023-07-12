import { paths } from '../settings/paths.js'

import { deleteAsync } from 'del'

const reset = () =>
	deleteAsync([
		paths.buildFolder,
		paths.binFolder,
		'**/.gitkeep'
	])

export { reset }
