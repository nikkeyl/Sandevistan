import { plugins } from '../../settings/plugins.js'
import { paths } from '../../settings/paths.js'

const pugPages = plugins.fs
	.readdirSync(paths.srcFolder)
	.filter(fileName => fileName.endsWith('.pug'))

export { pugPages }
