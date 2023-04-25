export function ripple() {
	document.addEventListener('click', e => {
		const targetItem = e.target
		const button = targetItem.closest('[data-ripple]')
		const ripple = document.createElement('span')
		function getAnimationDuration() {
			const duration = window.getComputedStyle(ripple).animationDuration
			return duration.includes('ms')
				? duration.replace('ms', '')
				: duration.replace('s', '') * 1000
		}
		if (targetItem.closest('[data-ripple]')) {
			const diameter = Math.max(button.clientWidth, button.clientHeight)
			const radius = diameter / 2
			ripple.style.width = ripple.style.height = `${diameter}px`
			ripple.style.left = `${
				e.pageX -
				(button.getBoundingClientRect().left + scrollX) -
				radius
			}px`
			ripple.style.top = `${
				e.pageY -
				(button.getBoundingClientRect().top + scrollY) -
				radius
			}px`
			ripple.classList.add('ripple')
			button.dataset.ripple === 'once' && button.querySelector('.ripple')
				? button.querySelector('.ripple').remove()
				: null
			button.appendChild(ripple)
			const timeOut = getAnimationDuration(ripple)
			setTimeout(() => {
				ripple ? ripple.remove() : null
			}, timeOut)
		}
	})
}
