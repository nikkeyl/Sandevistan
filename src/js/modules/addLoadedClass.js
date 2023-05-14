import { html } from '@js/helpers/nodeList'

function addLoadedClass() {
    window.onload = html.classList.add('loaded')
}

export { addLoadedClass }
