import { html } from '@js/helpers/nodeList'

function colorScheme() {
	window.addEventListener('load', () => {
		const saveUserTheme = localStorage.getItem('user-theme')

		let userTheme

		if (window.matchMedia) {
			userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
		}

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', () => {
				!saveUserTheme ? changeTheme() : null
			})

		const switchThemeButton = document.querySelector('.switch-theme')

		if (switchThemeButton) {
			switchThemeButton.addEventListener('click', () => {
				changeTheme(true)
			})
		}

		function setThemeClass() {
			if (saveUserTheme) {
				html.classList.add(saveUserTheme)
			} else {
				html.classList.add(userTheme)
			}
		}

		setThemeClass()

		function changeTheme(saveTheme = false) {
			const currentTheme = html.classList.contains('light') ? 'light' : 'dark'

			let newTheme

			currentTheme === 'light' ? (newTheme = 'dark') : (newTheme = 'light')
			html.classList.remove(currentTheme)
			html.classList.add(newTheme)
			saveTheme ? localStorage.setItem('user-theme', newTheme) : null
		}
	})
}

export { colorScheme }
