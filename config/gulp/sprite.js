import gulp from 'gulp'

import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import { svgoConfig } from '../../svgo.config.js'

import svgSprite from 'gulp-svg-sprite'

const sprite = () => {
	return gulp.src(paths.src.svgSprites)
		.pipe(plugins.catchError('SPRITE'))
		.pipe(svgSprite({
			mode: { symbol: { sprite: '../img/icons/sprite.svg' } },
			transform: [{ svgo: svgoConfig }],
			svg: {
				xmlDeclaration: false,
				rootAttributes: {
					style: 'display: none;',
					'aria-hidden': true
				}
			}
		}))
		.pipe(gulp.dest(paths.srcFolder))
}

export { sprite }
