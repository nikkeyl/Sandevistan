import { html } from '@js/helpers/nodeList'

function colorScheme() {
	window.addEventListener('load', () => {
		const htmlBlock = html
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
				!saveUserTheme
					? changeTheme()
					: null
			})

		const themeButton = document.querySelector('.theme-change')
		const resetButton = document.querySelector('.reset-theme')

		if (themeButton) {
			themeButton.addEventListener('click', () => {
				resetButton.classList.add('active')
				changeTheme(true)
			})
		}

		if (resetButton) {
			resetButton.addEventListener('click', () => {
				resetButton.classList.remove('active')
				localStorage.setItem('user-theme', '')
			})
		}

		function setThemeClass() {
			if (saveUserTheme) {
				htmlBlock.classList.add(saveUserTheme)
				resetButton.classList.add('active')
			} else {
				htmlBlock.classList.add(userTheme)
			}
		}

		setThemeClass()

		function changeTheme(saveTheme = false) {
			const currentTheme = htmlBlock.classList.contains('light')
				? 'light'
				: 'dark'

			let newTheme

			currentTheme === 'light'
				? newTheme = 'dark'
				: newTheme = 'light'
			htmlBlock.classList.remove(currentTheme)
			htmlBlock.classList.add(newTheme)
			saveTheme
				? localStorage.setItem('user-theme', newTheme)
				: null
		}
	})
}

export { colorScheme }
