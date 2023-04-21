import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'

export const html = () => {
    return app.gulp.src(`${app.path.build.html}**/*.html`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(
            app.plugins.if(
                app.isNoWebp,
                webpHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': 'v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js'
                        ]
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
}