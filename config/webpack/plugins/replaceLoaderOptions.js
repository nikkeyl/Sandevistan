const replaceLoaderOptions = startPath => ({
  search: '@img',
  replace: `${startPath}img`,
  flags: 'g'
})

export { replaceLoaderOptions }
