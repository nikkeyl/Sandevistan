import { paths } from '../../settings/paths.js'

const output = fileName => ({
  filename: fileName,
  path: paths.built,
  publicPath: '/'
})

export { output }
