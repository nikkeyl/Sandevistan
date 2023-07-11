/*! Calendar (Datepicker plugin) https://www.npmjs.com/package/js-datepicker */
import { nodeObjects } from '@js/helpers/nodeList'

import datepicker from 'js-datepicker'

import '@scss/vendors/datepicker'

if (document.querySelector('[data-datepicker]')) {
	const picker = datepicker('[data-datepicker]', {
		customDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		customMonths: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'July',
			'Aug',
			'Sen',
			'Oct',
			'Nov',
			'Dec'
		],
		overlayButton: 'Apply',
		overlayPlaceholder: 'Year (4 digits)',
		startDay: 1,
		formatter: (input, date) => {
			const value = date.toLocaleDateString()

			input.value = value
		}
	})

	nodeObjects.datepicker = picker
}
