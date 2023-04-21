import groupCssMediaQueries from 'gulp-group-css-media-queries'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import webpcss from 'gulp-webpcss'

export const css = () => {
    return app.gulp.src(`${app.path.build.css}style.css`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'CSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    cascade: true,
                    grid: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isNoWebp,
                webpcss(
                    {
                        noWebpClass: '.no-webp',
                        webpClass: '.webp'
                    }
                )
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss({
                    level: 2
                })
            )
        )
        .pipe(app.plugins.rename({
            suffix: '.min'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
}