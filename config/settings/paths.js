import {
	basename,
	resolve
} from 'path'

const rootFolder = basename(resolve())
const buildFolder = resolve('dist')
const srcFolder = resolve('src')
const tempFolder = 'temp'
const paths = {
	build: {
		static: `${buildFolder}/static/`,
		fonts: `${buildFolder}/fonts/`,
		images: `${buildFolder}/img/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		html: `${buildFolder}/`
	},
	src: {
		images: `${srcFolder}/img/**/*.{jpg,png,webp}`,
		svgSprites: `${srcFolder}/img/sprites/*.svg`,
		svg: [
			`${srcFolder}/img/**/*.svg`,
			`!${srcFolder}/img/sprites/*.svg`
		],
		scss: `${srcFolder}/scss/style.scss`,
		static: `${srcFolder}/static/**/*.*`,
		fonts: `${srcFolder}/fonts/*.*`,
		pug: `${srcFolder}/views/*.pug`,
		js: `${srcFolder}/js/app.js`,
		html: `${srcFolder}/*.html`
	},
	buildFolder,
	tempFolder,
	rootFolder,
	srcFolder
}

export { paths }
