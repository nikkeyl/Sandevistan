import { html } from '@js/helpers/nodeList'

export function addLoadedClass() {
    window.onload = html.classList.add('loaded')
}
