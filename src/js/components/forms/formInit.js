import { formValidate } from '@js/components/forms/formValidate'

export function formFieldsInit(
	options = { viewPass: false, autoHeight: false }
) {
	const formFields = document.querySelectorAll(
		'input[placeholder],textarea[placeholder]'
	)
	if (formFields.length) {
		formFields.forEach(formField => {
			if (!formField.hasAttribute('data-placeholder-nohide')) {
				formField.dataset.placeholder = formField.placeholder
			}
		})
	}
	document.body.addEventListener('focusin', e => {
		const targetElement = e.target
		if (
			targetElement.tagName === 'INPUT' ||
			targetElement.tagName === 'TEXTAREA'
		) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = ''
			}
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
			targetElement.tagName === 'INPUT' ||
			targetElement.tagName === 'TEXTAREA'
		) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder
			}
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.remove('form-focus')
				targetElement.parentElement.classList.remove('form-focus')
			}
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement)
			}
		}
	})
	if (options.viewPass) {
		document.addEventListener('click', e => {
			let targetElement = e.target// checking how work this code with const
			if (targetElement.closest('[class*="__viewpass"]')) {
				let inputType = targetElement.classList.contains(// checking how work this code with const
					'viewpass-active'
				)
					? 'password'
					: 'text'
				targetElement.parentElement
					.querySelector('input')
					.setAttribute('type', inputType)
				targetElement.classList.toggle('viewpass-active')
			}
		})
	}
	if (options.autoHeight) {
		const textareas = document.querySelectorAll('textarea[data-autoheight]')
		if (textareas.length) {
			textareas.forEach(textarea => {
				const startHeight = textarea.hasAttribute('data-autoheight-min')
					? Number(textarea.dataset.autoheightMin)
					: Number(textarea.offsetHeight)
				const maxHeight = textarea.hasAttribute('data-autoheight-max')
					? Number(textarea.dataset.autoheightMax)
					: Infinity
				setHeight(textarea, Math.min(startHeight, maxHeight))
				textarea.addEventListener('input', () => {
					if (textarea.scrollHeight > startHeight) {
						textarea.style.height = 'auto'
						setHeight(
							textarea,
							Math.min(
								Math.max(textarea.scrollHeight, startHeight),
								maxHeight
							)
						)
					}
				})
			})
			function setHeight(textarea, height) {
				textarea.style.height = `${height}px`
			}
		}
	}
}