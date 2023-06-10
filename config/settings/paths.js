import {
	basename,
	resolve
} from 'path'

const rootFolder = basename(resolve())
const buildFolder = 'dist'
const tempFolder = 'temp'
const srcFolder = 'src'
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
		js: `${srcFolder}/js/app.js`,
		html: `${srcFolder}/*.html`
	},
	built: resolve(buildFolder),
	root: resolve(srcFolder),
	ftp: rootFolder,
	buildFolder,
	tempFolder,
	rootFolder,
	srcFolder
}

export { paths }
