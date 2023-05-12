/*
 *!
 * Range (NoUiSlider plugin)
 * https://refreshless.com/nouislider/
 */
import * as noUiSlider from 'nouislider'
import wNumb from 'wnumb'

import '@scss/components/forms/range'

function range() {
	const priceSlider = document.querySelector('[data-range]')

	function rangeInit() {
		noUiSlider.create(priceSlider, {
			start: [0, 200000],
			connect: true,
			tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
			range: {
				min: 0,
				max: 200000
			}
		})

		const priceStart = document.querySelector('[data-price-start]')
		const priceEnd = document.querySelector('[data-price-end]')

		priceStart.addEventListener('change', setPriceValues)
		priceEnd.addEventListener('change', setPriceValues)

		function setPriceValues() {
			let priceStartValue
			let priceEndValue

			priceStart.value !== '' ? (priceStartValue = priceStart.value) : null
			priceEnd.value !== '' ? (priceEndValue = priceEnd.value) : null
			priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
		}
	}

	if (priceSlider) {
		rangeInit()
	}
}

export { range }
