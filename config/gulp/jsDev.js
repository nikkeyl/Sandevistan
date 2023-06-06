import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import webPackConfig from '../webpack/webpack.prod.js'

const webPackConfigBeautify = Object.assign({}, webPackConfig)

webPackConfigBeautify.optimization = {
	minimizer: [
		new plugins.TerserPlugin({
			extractComments: false,
			terserOptions: {
				compress: { defaults: false },
				format: { beautify: true },
				keep_classnames: true,
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
	return gulp.src(paths.src.js)
		.pipe(plugins.catchError('JS'))
		.pipe(plugins.webpack({ config: webPackConfigBeautify }))
		.pipe(gulp.dest(paths.build.js))
}

export { jsDev }
