import { app } from '../../gulpfile.js'

import ttf2woff2 from 'gulp-ttf2woff2'
import fonter from 'gulp-fonter-fix'

export const otfToTtf = () => {
	return app.gulp.src(`${app.paths.srcFolder}/fonts/*.otf`)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'FONTS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(app.gulp.dest(`${app.paths.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	return app.gulp.src(`${app.paths.srcFolder}/fonts/*.ttf`)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'FONTS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.paths.build.fonts))
		.pipe(app.gulp.src(`${app.paths.srcFolder}/fonts/*.woff2`))
		.pipe(app.gulp.dest(app.paths.build.fonts))
}

export const fontsStyle = () => {
	const fontsFile = `${app.paths.srcFolder}/scss/base/fonts/fonts.scss`
	app.plugins.fs.existsSync(fontsFile)
		? app.plugins.fs.unlink(fontsFile, cb)
		: null
	app.plugins.fs.readdir(app.paths.build.fonts, (err, fontsFiles) => {
		if (fontsFiles) {
			app.plugins.fs.writeFile(fontsFile, '', cb)
			let newFileOnly
			fontsFiles.forEach(file => {
				const fontFileName = file.split('.')[0]
				if (newFileOnly !== fontFileName) {
					const fontName = fontFileName.split('-')[0]
						? fontFileName.split('-')[0]
						: fontFileName
					let fontWeight = fontFileName.split('-')[1]
						? fontFileName.split('-')[1]
						: fontFileName
					if (fontWeight.toLowerCase() === 'thin') {
						fontWeight = 100
					} else if (fontWeight.toLowerCase() === 'extralight') {
						fontWeight = 200
					} else if (fontWeight.toLowerCase() === 'light') {
						fontWeight = 300
					} else if (fontWeight.toLowerCase() === 'medium') {
						fontWeight = 500
					} else if (fontWeight.toLowerCase() === 'semibold') {
						fontWeight = 600
					} else if (fontWeight.toLowerCase() === 'bold') {
						fontWeight = 700
					} else if (
						fontWeight.toLowerCase() === 'extrabold' ||
						fontWeight.toLowerCase() === 'heavy'
					) {
						fontWeight = 800
					} else if (fontWeight.toLowerCase() === 'black') {
						fontWeight = 900
					} else {
						fontWeight = 400
					}
					app.plugins.fs.appendFile(fontsFile, `@font-face {\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-family: "${fontName}";\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n\tfont-display: swap;\n}\n\n`, cb)
					newFileOnly = fontFileName
				}
			})
		}
	})
	return app.gulp.src(app.paths.srcFolder)
	function cb() { }
}