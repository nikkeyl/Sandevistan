import { app } from '../../gulpfile.js'

import webPackConfig from '../webpack/webpack.prod.js'

const webPackConfigBeautify = Object.assign({}, webPackConfig)

webPackConfigBeautify.optimization = {
	minimizer: [
		new app.plugins.TerserPlugin({
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
	path: app.paths.built,
	filename: 'app.js',
	publicPath: '/'
}

const jsDev = () => {
	return app.gulp.src(app.paths.src.js)
		.pipe(app.plugins.catchError('JS'))
		.pipe(app.plugins.webpack({ config: webPackConfigBeautify }))
		.pipe(app.gulp.dest(app.paths.build.js))
}

export { jsDev }
