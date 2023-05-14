import { app } from '../../gulpfile.js'

import webPackConfig from '../webpack/webpack.prod.js'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

let webPackConfigBeautify = Object.assign({}, webPackConfig)

webPackConfigBeautify.optimization = {
	minimizer: [
		new plugins.TerserPlugin({
			extractComments: false,
			terserOptions: {
				keep_classnames: true,
				compress: {
					defaults: false,
					unused: true
				},
				format: {
					beautify: true
				},
				keep_fnames: true,
				mangle: false
			}
		})
	]
}

webPackConfigBeautify.output = {
	path: paths.built,
	filename: 'app.js',
	publicPath: '/'
}

const jsDev = () => {
	return app.gulp.src(app.paths.src.js)
		.pipe(app.plugins.catchError('JS'))
		.pipe(plugins.webpack({
			config: webPackConfigBeautify
		}))
		.pipe(app.gulp.dest(app.paths.build.js))
}

export { jsDev }