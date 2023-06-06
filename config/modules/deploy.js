import { paths } from '../settings/paths.js'

import ghPages from 'gh-pages'

const deploy = () =>
  ghPages.publish(paths.buildFolder, {
    repo: `https://github.com/nikkeyl/${paths.rootFolder}.git`
  })

export { deploy }
