import { paths } from '../../settings/paths.js'

const output = fileName => ({
	filename: fileName,
	path: paths.build.resolve,
	publicPath: '/'
})

export { output }
