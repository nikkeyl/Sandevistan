function clock() {
	window.addEventListener('load', () => {
		setInterval(() => {
			const currentDate = new Date()

			const time = currentDate.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})

			document.querySelector('[data-clock]')?.innerHTML = time
		}, 1000)
	})
}

export { clock }
