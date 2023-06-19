import { paths } from '../../settings/paths.js'

const output = fileName => ({
	filename: fileName,
	path: paths.buildFolder,
	publicPath: '/'
})

export { output }
