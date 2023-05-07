import { isMobile } from '@js/helpers/isMobile'
import { html } from '@js/helpers/nodeList'

function addTouchClass() {
	if (isMobile.any()) html.classList.add('touch')
}

export { addTouchClass }
