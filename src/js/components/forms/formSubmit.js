import { formValidate } from '@js/components/forms/formValidate'
import { nodeObjects } from '@js/helpers/nodeList'
import { gotoBlock } from '@js/helpers/goToBlock'

function formSubmit() {
	const forms = document.forms
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', e => {
				const form = e.target
				formSubmitAction(form, e)
			})
			form.addEventListener('reset', e => {
				const form = e.target
				formValidate.formClean(form)
			})
		}
	}
	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate')
			? formValidate.getErrors(form)
			: 0
		if (error === 0) {
			const ajax = form.hasAttribute('data-ajax')
			if (ajax) {
				e.preventDefault()
				const formAction = form.getAttribute('action')?.trim()
					|| '#'
				const formMethod = form.getAttribute('method')?.trim()
					|| 'GET'
				const formData = new FormData(form)
				form.classList.add('sending')
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				})
				if (response.ok) {
					const responseResult = await response.json()
					form.classList.remove('sending')
					formSent(form, responseResult)
				} else {
					alert('Ошибка')
					form.classList.remove('sending')
				}
			} else if (form.hasAttribute('data-dev')) {
				e.preventDefault()
				formSent(form)
			}
		} else {
			e.preventDefault()
			if (
				form.querySelector('.form-error') &&
				form.hasAttribute('data-goto-error')
			) {
				const formGoToErrorClass = form.dataset.gotoError || '.form-error'
				gotoBlock(formGoToErrorClass, true, 1000)
			}
		}
	}
	function formSent(form) {
		document.dispatchEvent(
			new CustomEvent('formSent', {
				detail: {
					form: form
				}
			})
		)
		setTimeout(() => {
			if (nodeObjects.popup) {
				const popup = form.dataset.popupMessage
				popup ? nodeObjects.popup.open(popup) : null
			}
		}, 0)
		formValidate.formClean(form)
	}
}

export { formSubmit }
