import { nodeObjects } from '@js/helpers/nodeList'

const formValidate = {
	getErrors(form) {
		const formRequiredItems = form.querySelectorAll('*[data-required]')

		let error = 0

		formRequiredItems.forEach(formRequiredItem => {
			if (
				(formRequiredItem.offsetParent !== null ||
					formRequiredItem.tagName === 'SELECT') &&
				!formRequiredItem.disabled
			) {
				error += this.validateInput(formRequiredItem)
			}
		})

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
		} else if (!formRequiredItem.value.trim()) {
			this.addError(formRequiredItem)
			error++
		} else {
			this.removeError(formRequiredItem)
		}

		return error
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('form-error')
		formRequiredItem.parentElement.classList.add('form-error')

		const inputError =
			formRequiredItem.parentElement.querySelector('.form__error')

		if (inputError) {
			formRequiredItem.parentElement.removeChild(inputError)
		}

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

			inputs.forEach(el => {
				el.parentElement.classList.remove('form-focus')
				el.classList.remove('form-focus')
				formValidate.removeError(el)
			})

			const checkboxes = form.querySelectorAll('.checkbox__input')

			checkboxes.forEach(checkbox => {
				checkbox.checked = false
			})

			if (nodeObjects.select) {
				const selects = form.querySelectorAll('.select')

				selects.forEach(select => {
					select.querySelector('select')
					nodeObjects.select.selectBuild(select)
				})
			}
		}, 0)
	},
	emailTest(formRequiredItem) {
		return (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/).test(
			formRequiredItem.value
		)
	}
}

export { formValidate }
