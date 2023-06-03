const cssLoaderOptions = (importLoaders = 0, sourceMap = false, endPath = '') => ({
  importLoaders: importLoaders,
  sourceMap: sourceMap,
  modules: false,
  url: {
    filter: url => {
      !url.includes(`img${endPath}`)
        || !url.includes(`fonts${endPath}`)
    }
  }
})

export { cssLoaderOptions }
