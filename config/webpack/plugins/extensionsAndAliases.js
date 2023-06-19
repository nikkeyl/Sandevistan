import { paths } from '../../settings/paths.js'

const extensionsAndAliases = {
  extensions: [
    '.scss',
    '.js'
  ],
  alias: {
    '@scss': `${paths.src.resolve}/scss`,
		'@js': `${paths.src.resolve}/js`
  }
}

export { extensionsAndAliases }
