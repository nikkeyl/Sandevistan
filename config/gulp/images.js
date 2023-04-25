import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'
import webp from 'gulp-webp'

export const images = () => {
	return app.gulp.src(app.paths.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'IMAGES',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(newer(app.paths.build.images))
		.pipe(
			app.plugins.if(
				app.isNoWebp,
				webp()
			)
		)
		.pipe(
			app.plugins.if(
				app.isNoWebp,
				app.gulp.dest(app.paths.build.images)
			)
		)
		.pipe(
			app.plugins.if(
				app.isNoWebp,
				app.gulp.src(app.paths.src.images)
			)
		)
		.pipe(
			app.plugins.if(
				app.isNoWebp,
				newer(app.paths.build.images)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				imagemin({
					svgoPlugins: [{
						removeViewBox: false
					}],
					optimizationLevel: 4,
					progressive: true,
					interlaced: true
				})
			)
		)
		.pipe(app.gulp.dest(app.paths.build.images))
		.pipe(app.gulp.src(app.paths.src.svg))
		.pipe(app.gulp.dest(app.paths.build.images))
}