export function clock() {
	window.addEventListener('load', () => {
		setInterval(() => {
			const time = new Date()
			const clock = document.querySelector('[data-clock]')
			if (clock) {
				clock.innerHTML = time.toLocaleTimeString()
			}
		}, 1000)
	})
}
