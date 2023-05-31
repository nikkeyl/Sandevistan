import { app } from '../../gulpfile.js'

import { svgoConfig } from '../../svgo.config.js'

import svgSprite from 'gulp-svg-sprite'

const sprite = () => {
	return app.gulp.src(app.paths.src.svgSprites)
		.pipe(app.plugins.catchError('SPRITE'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../img/icons/sprite.svg'
				}
			},
			transform: [
				{
					svgo: svgoConfig
				}
			],
			svg: {
				xmlDeclaration: false,
				rootAttributes: {
					style: 'display: none;',
					'aria-hidden': true
				}
			}
		}))
		.pipe(app.gulp.dest(app.paths.srcFolder))
}

export { sprite }
