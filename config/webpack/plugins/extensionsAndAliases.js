import { paths } from '../../settings/paths.js'

const extensionsAndAliases = {
	extensions: [
		'.scss',
		'.js'
	],
	alias: {
		'@scss': `${paths.srcFolder}/scss`,
		'@js': `${paths.srcFolder}/js`
	}
}

export { extensionsAndAliases }
