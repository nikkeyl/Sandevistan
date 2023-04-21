import * as node from 'path'

const rootFolder = node.basename(node.resolve())
const reportsFolder = 'reports'
const buildFolder = 'build'
const srcFolder = 'src'

export const path = {
    build: {
        images: `${buildFolder}/content/`,
        static: `${buildFolder}/static/`,
        fonts: `${buildFolder}/fonts/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        html: `${buildFolder}/`
    },
    src: {
        images: `${srcFolder}/content/**/*.{jpg,png,webp}`,
        svgSprites: `${srcFolder}/content/sprites/*.svg`,
        svg: [
            `${srcFolder}/content/**/*.svg`,
            `!${srcFolder}/content/sprites/*.svg`
        ],
        scss: `${srcFolder}/scss/style.scss`,
        static: `${srcFolder}/static/**/*.*`,
        fonts: `${srcFolder}/fonts/*.*`,
        js: `${srcFolder}/js/app.js`,
        html: `${srcFolder}/*.html`
    },
    built: node.resolve(buildFolder),
    root: node.resolve(srcFolder),
    reportsFolder,
    buildFolder,
    rootFolder,
    srcFolder,
    ftp: ``
}