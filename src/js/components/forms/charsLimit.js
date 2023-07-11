function charsLimit() {
	window.addEventListener('load', () => {
		const txtItem = document.querySelector('textarea[maxlength]')

		if (txtItem) {
			const txtItemLimit = txtItem.getAttribute('maxlength')
			const txtCounter = document.querySelector('[data-max-length]')

			if (txtCounter && txtItemLimit) {
				txtCounter.innerHTML = txtItemLimit
				txtItem.addEventListener('input', () => {
					txtCounter.innerHTML = txtItemLimit - txtItem.value.length
				})
			}
		}
	})
}

export { charsLimit }
