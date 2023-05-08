function counter() {
	window.addEventListener('load', () => {
		function digitsCountersInit(digitsCountersItems) {
			const digitsCounters = digitsCountersItems
				? digitsCountersItems
				: document.querySelectorAll('[data-digits-counter]')
			digitsCounters.forEach(digitsCounter => {
				digitsCountersAnimate(digitsCounter)
			})
		}
		function digitsCountersAnimate(digitsCounter) {
			let startTimestamp = null
			const duration = parseInt(digitsCounter.dataset.digitsCounter)
				? parseInt(digitsCounter.dataset.digitsCounter)
				: 1000
			const startValue = parseInt(digitsCounter.innerHTML)
			const startPosition = 0
			const step = timestamp => {
				if (!startTimestamp) startTimestamp = timestamp
				const progress = Math.min(
					(timestamp - startTimestamp) / duration,
					1
				)
				digitsCounter.innerHTML = Math.floor(
					progress * (startPosition + startValue)
				)
				progress < 1 ? window.requestAnimationFrame(step) : null
			}
			window.requestAnimationFrame(step)
		}
		const options = {
			threshold: 0.3
		}
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const targetElement = entry.target
					const digitsCountersItems = targetElement.querySelectorAll(
						'[data-digits-counter]'
					)
					digitsCountersInit(digitsCountersItems)
					observer.unobserve(targetElement)
				}
			})
		}, options)
		const sections = document.querySelectorAll(
			'[data-digits-counter-wrapper]'
		)
		sections.forEach(section => {
			observer.observe(section)
		})
	})
}

export { counter }
