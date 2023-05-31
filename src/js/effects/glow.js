import { html } from '@js/helpers/nodeList'

function glow() {
	let bGlow, bGlowColor, bGlowSize

	function buttonActions(e) {
		const button = e.target.closest('[data-glow]')

		if (!button) return

		if (e.type === 'mouseover') {
			button.insertAdjacentHTML(
				'beforeend',
				`
                    <span class="button__glow">
                        <span class="button__color"></span>
                    </span>
                `
			)
			bGlow = button.querySelector('.button__glow')
			bGlowColor = button.querySelector('.button__color')
			bGlowSize = Math.min(button.offsetWidth, button.offsetHeight)
			bGlow.style.width = bGlow.style.height = `${bGlowSize}px`
			bGlowColor.style.width = `${button.offsetWidth}px`
			bGlowColor.style.height = `${button.offsetHeight}px`
		}

		if (e.type === 'mouseout') button.querySelector('.button__glow').remove()

		if (e.type === 'mousemove') {
			const posX = e.pageX - (button.getBoundingClientRect().left - scrollX)

			const posY = e.pageY - (button.getBoundingClientRect().top - scrollY)

			bGlow.style.left = `${posX - bGlowSize / 2}px`
			bGlow.style.top = `${posY - bGlowSize / 2}px`
			bGlowColor.style.transform = `
                    translate(${posX - (button.offsetWidth - bGlowSize / 2)}px,
                            ${posY - (button.offsetHeight - bGlowSize / 2)}px)`
		}
	}

	if (document.querySelector('[data-glow]')) {
		html.addEventListener('mouseover', buttonActions)
		html.addEventListener('mouseout', buttonActions)
		html.addEventListener('mousemove', buttonActions)
	}
}

export { glow }
