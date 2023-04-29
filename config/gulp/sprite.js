import { app } from '../../gulpfile.js'

import svgSprite from 'gulp-svg-sprite'

export const sprite = () => {
	return app.gulp.src(app.paths.src.svgSprites)
		.pipe(app.plugins.handleError('SPRITE'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../content/icons/sprite.svg'
				}
			},
			shape: {
				transform: [
					{
						svgo: {
							plugins: [
								{
									removeAttrs: { attrs: '(stroke|fill)' }
								}, {
									convertPathData: false
								}, {
									removeViewBox: false
								}, {
									removeXMLNS: true
								}
							]
						}
					}
				]
			},
			svg: {
				rootAttributes: {
					style: 'display: none;',
					'aria-hidden': true
				},
				xmlDeclaration: false
			}
		}))
		.pipe(app.gulp.dest(app.paths.srcFolder))
}