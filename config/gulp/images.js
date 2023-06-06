import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import { isNoWebp } from '../../gulpfile.js'

import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'
import webp from 'gulp-webp'

const images = () => {
	return gulp.src(paths.src.images)
		.pipe(plugins.catchError('IMAGES'))
		.pipe(newer(paths.build.images))
		.pipe(plugins.if(
			isNoWebp,
			webp()
		))
		.pipe(plugins.if(
			isNoWebp,
			gulp.dest(paths.build.images)
		))
		.pipe(plugins.if(
			isNoWebp,
			gulp.src(paths.src.images)
		))
		.pipe(plugins.if(
			isNoWebp,
			newer(paths.build.images)
		))
		.pipe(imagemin({
			svgoPlugins: [{ removeViewBox: false }], // not working
			interlaced: true
		}))
		.pipe(gulp.dest(paths.build.images))
		.pipe(gulp.src(paths.src.svg))
		.pipe(gulp.dest(paths.build.images))
}

export { images }
