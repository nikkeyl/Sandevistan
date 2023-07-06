const slideDown = (target, duration = 500, showMore = 0) => {
	if (!target.classList.contains('slide')) {
		target.classList.add('slide')
		target.hidden = target.hidden ? false : null
		showMore ? target.style.removeProperty('height') : null

		const height = target.offsetHeight

		target.style.overflow = 'hidden'
		target.style.height = `${showMore}px`
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		target.offsetHeight
		target.style.transitionProperty = 'height, margin, padding'
		target.style.transitionDuration = duration + 'ms'
		target.style.height = height + 'px'
		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-top')
		target.style.removeProperty('margin-bottom')

		window.setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('slide')
		}, duration)
	}
}

export { slideDown }
