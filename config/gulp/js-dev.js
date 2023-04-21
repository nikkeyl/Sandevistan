import webPackConfig from '../webpack/webpack.prod.js'
import { plugins } from '../settings/plugins.js'
import { path } from '../settings/path.js'

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
    path: path.built,
    filename: 'app.js',
    publicPath: '/'
}

export const jsDev = () => {
    return app.gulp.src(app.path.src.js)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(plugins.webpack({
            config: webPackConfigBeautify
        }))
        .pipe(app.gulp.dest(app.path.build.js))
}