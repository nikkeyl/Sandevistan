import { app } from '../../gulpfile.js'

import ttf2woff2 from 'gulp-ttf2woff2'
import fonter from 'gulp-fonter-fix'

function cb() { }

const otfToTtf = () =>
	app.gulp.src(`${app.paths.srcFolder}/fonts/*.otf`)
		.pipe(app.plugins.catchError('FONTS'))
		.pipe(fonter({ formats: ['ttf'] }))
		.pipe(app.gulp.dest(`${app.paths.srcFolder}/fonts/`))

const ttfToWoff = () =>
	app.gulp.src(`${app.paths.srcFolder}/fonts/*.ttf`)
		.pipe(app.plugins.catchError('FONTS'))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.paths.build.fonts))
		.pipe(app.gulp.src(`${app.paths.srcFolder}/fonts/*.woff2`))
		.pipe(app.gulp.dest(app.paths.build.fonts))

const fontsStyles = () => {
	const fontStylesFile = `${app.paths.srcFolder}/scss/base/fonts/fonts.scss`

	app.plugins.fs.readdir(app.paths.build.fonts, (error, fontFiles) => {
		if (fontFiles) {
			if (!app.plugins.fs.existsSync(fontStylesFile)) {
				const fontWeights = {
					thin: 100,
					hairline: 100,
					extralight: 200,
					ultralight: 200,
					light: 300,
					regular: 400,
					medium: 500,
					semibold: 600,
					demibold: 600,
					bold: 700,
					extrabold: 800,
					ultrabold: 800,
					black: 900,
					heavy: 900,
					extrablack: 950,
					ultrablack: 950
				}

				let newFileOnly

				app.plugins.fs.writeFile(
					fontStylesFile,
					'',
					cb
				)
				fontFiles.forEach(file => {
					const fileName = file.split('.')[0]

					if (newFileOnly !== fileName) {
						const [
							fontName,
							fontWeight = 'regular'
						] = fileName.split('-')
						const fontWeightValue = fontWeights[fontWeight.toLowerCase()]
						const fontStyle = fileName.includes('-Italic')
							? 'italic'
							: 'normal'

						app.plugins.fs.appendFile(
							fontStylesFile,
							`@font-face {\n\tsrc: url("../fonts/${fileName}.woff2") format("woff2");\n\tfont-family: "${fontName}";\n\tfont-weight: ${fontWeightValue};\n\tfont-style: ${fontStyle};\n\tfont-display: swap;\n}\n\n`,
							cb
						)
						newFileOnly = fileName
					}
				})
				console.log(app.plugins.chalk.green.bold(
					'[SUCCESS]\nThe (fonts.scss) file is written]'
				))
			} else {
				console.log(app.plugins.chalk.yellow.bold(
					`[WARNING]\nThe (${fontStylesFile}) file already exists.`
				))
			}
		} else {
			console.log(app.plugins.chalk.red.bold('[ERROR]\n'), error)
		}
	})

	return app.gulp.src(app.paths.srcFolder)
}

export {
	fontsStyles,
	ttfToWoff,
	otfToTtf
}
