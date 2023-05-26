import { paths } from '../../settings/paths.js'

const extensionsAndAliases = {
    extensions: [
        '.scss',
        '.js'
    ],
    alias: {
        '@scss': `${paths.root}/scss`,
        '@js': `${paths.root}/js`
    }
}

export { extensionsAndAliases }
