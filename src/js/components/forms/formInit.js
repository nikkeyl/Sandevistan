import { formValidate } from '@js/components/forms/formValidate'

function formFieldsInit(options = {
	viewPass: false,
	autoHeight: false
}) {
	document.body.addEventListener('focusin', e => {
		const targetElement = e.target

		if (
			targetElement.tagName === 'INPUT'
            || targetElement.tagName === 'TEXTAREA'
		) {
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.add('form-focus')
				targetElement.parentElement.classList.add('form-focus')
			}

			formValidate.removeError(targetElement)
		}
	})
	document.body.addEventListener('focusout', e => {
		const targetElement = e.target

		if (
			targetElement.tagName === 'INPUT'
            || targetElement.tagName === 'TEXTAREA'
		) {
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.remove('form-focus')
				targetElement.parentElement.classList.remove('form-focus')
			}

			targetElement.hasAttribute('data-validate')
				? formValidate.validateInput(targetElement)
				: null
		}
	})

	if (options.viewPass) {
		document.addEventListener('click', e => {
			const targetElement = e.target

			if (targetElement.closest('[class*="__viewpass"]')) {
				const inputType = targetElement.classList.contains('viewpass-active')
					? 'password'
					: 'text'

				targetElement.parentElement
					.querySelector('input')
					.setAttribute('type', inputType)
				targetElement.classList.toggle('viewpass-active')
			}
		})
	}

	const textareas = document.querySelectorAll('textarea[data-autoheight]')

	function setHeight(textarea, height) {
		textarea.style.height = `${height}px`
	}

	textareas.forEach(textarea => {
		const startHeight = +textarea.dataset.autoheightMin || +textarea.offsetHeight
		const maxHeight = +textarea.dataset.autoheightMax || Infinity

		setHeight(textarea, Math.min(startHeight, maxHeight))
		textarea.addEventListener('input', () => {
			if (textarea.scrollHeight > startHeight) {
				textarea.style.height = 'auto'
				setHeight(
					textarea,
					Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight)
				)
			}
		})
	})

	if (options.autoHeight) {
		setHeight()
	}
}

export { formFieldsInit }
