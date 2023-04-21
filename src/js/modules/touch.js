import { isMobile } from '@js/helpers/isMobile'
import { html } from '@js/helpers/nodeList'

export function addTouchClass() {
    if (isMobile.any()) html.classList.add('touch')
}
