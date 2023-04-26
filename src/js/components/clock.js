export function clock() {
	window.addEventListener('load', () => {
		setInterval(() => {
			const time = new Date()
			const clock = document.querySelector('[data-clock]')
			if (clock) {
				clock.innerHTML = time.toLocaleTimeString()
			}
			// clock ? clock.innerHTML = time.toLocaleTimeString() : null [NEW]
		}, 1000)
	})
}
