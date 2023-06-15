import { html } from '@js/helpers/nodeList'

function addLoadedClass() {
  if (!html.classList.contains('loading')) {
    window.addEventListener('load', html.classList.add('loaded'))
  }
}

export { addLoadedClass }
