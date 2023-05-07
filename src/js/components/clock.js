function clock() {
	window.addEventListener('load', () => {
		setInterval(() => {
			const time = new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})
			const clock = document.querySelector('[data-clock]')
			clock ? (clock.innerHTML = time) : null
		}, 1000)
	})
}

export { clock }
