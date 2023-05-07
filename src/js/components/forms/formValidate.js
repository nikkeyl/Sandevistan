import { nodeObjects } from '@js/helpers/nodeList'

let formValidate = {
	getErrors(form) {
		let error = 0
		const formRequiredItems = form.querySelectorAll('*[data-required]')
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if (
					(formRequiredItem.offsetParent !== null ||
						formRequiredItem.tagName === 'SELECT') &&
					!formRequiredItem.disabled
				) {
					error += this.validateInput(formRequiredItem)
				}
			})
		}
		return error
	},
	validateInput(formRequiredItem) {
		let error = 0
		if (formRequiredItem.dataset.required === 'email') {
			formRequiredItem.value = formRequiredItem.value.replace(' ', '')
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem)
				error++
			} else {
				this.removeError(formRequiredItem)
			}
		} else if (
			formRequiredItem.type === 'checkbox' &&
			!formRequiredItem.checked
		) {
			this.addError(formRequiredItem)
			error++
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem)
				error++
			} else {
				this.removeError(formRequiredItem)
			}
		}
		return error
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('form-error')
		formRequiredItem.parentElement.classList.add('form-error')
		const inputError =
			formRequiredItem.parentElement.querySelector('.form__error')
		if (inputError) formRequiredItem.parentElement.removeChild(inputError)
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML(
				'beforeend',
				`<div class="form__error">${formRequiredItem.dataset.error}</div>`
			)
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('form-error')
		formRequiredItem.parentElement.classList.remove('form-error')
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(
				formRequiredItem.parentElement.querySelector('.form__error')
			)
		}
	},
	formClean(form) {
		form.reset()
		setTimeout(() => {
			const inputs = form.querySelectorAll('input,textarea')
			// for (let index = 0; index < inputs.length; index++) {
			// 	const el = inputs[index]
			// 	el.parentElement.classList.remove('form-focus')
			// 	el.classList.remove('form-focus')
			// 	formValidate.removeError(el)
			// }
			inputs.forEach(el => {
				el.parentElement.classList.remove('form-focus')
				el.classList.remove('form-focus')
				formValidate.removeError(el)
			})
			const checkboxes = form.querySelectorAll('.checkbox__input')
			if (checkboxes.length > 0) {
				// for (let index = 0; index < checkboxes.length; index++) {
				// 	const checkbox = checkboxes[index]
				// 	checkbox.checked = false
				// }
				checkboxes.forEach(checkbox => {
					checkbox.checked = false
				})
			}
			if (nodeObjects.select) {
				let selects = form.querySelectorAll('.select')
				if (selects.length) {
					for (let index = 0; index < selects.length; index++) {
						const select = selects[index].querySelector('select')
						nodeObjects.select.selectBuild(select)
					}
				}
			}
		}, 0)
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
			formRequiredItem.value
		)
	}
}

export { formValidate }
