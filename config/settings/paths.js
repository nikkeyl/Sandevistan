import { basename, resolve } from 'path'

const rootFolder = basename(resolve())
const buildFolder = 'build'
const tempFolder = 'temp'
const srcFolder = 'src'

const paths = {
	build: {
		images: `${buildFolder}/img/`,
		static: `${buildFolder}/static/`,
		fonts: `${buildFolder}/fonts/`,
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
		js: `${srcFolder}/js/app.js`,
		html: `${srcFolder}/*.html`
	},
	built: resolve(buildFolder),
	root: resolve(srcFolder),
	tempFolder,
	buildFolder,
	rootFolder,
	srcFolder,
	ftp: ``
}

export { paths }
