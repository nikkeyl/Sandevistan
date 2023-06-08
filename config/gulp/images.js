import { app } from '../../gulpfile.js'

import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'
import webp from 'gulp-webp'

const images = () => {
	return app.gulp.src(app.paths.src.images)
		.pipe(app.plugins.catchError('IMAGES'))
		.pipe(newer(app.paths.build.images))
		.pipe(app.plugins.if(
			app.isNoWebp,
			webp()
		))
		.pipe(app.plugins.if(
			app.isNoWebp,
			app.gulp.dest(app.paths.build.images)
		))
		.pipe(app.plugins.if(
			app.isNoWebp,
			app.gulp.src(app.paths.src.images)
		))
		.pipe(app.plugins.if(
			app.isNoWebp,
			newer(app.paths.build.images)
		))
		.pipe(imagemin({
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true
		}))
		.pipe(app.gulp.dest(app.paths.build.images))
		.pipe(app.gulp.src(app.paths.src.svg))
		.pipe(app.gulp.dest(app.paths.build.images))
}

export { images }
