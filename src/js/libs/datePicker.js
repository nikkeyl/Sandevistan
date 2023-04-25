/*!
 * Сalendar (Datepicker plugin)
 * https://www.npmjs.com/package/js-datepicker
 */
import { nodeObjects } from '@js/helpers/nodeList'
import datepicker from 'js-datepicker'

import '@scss/libs/datePicker'

if (document.querySelector('[data-datepicker]')) {
	const picker = datepicker('[data-datepicker]', {
		customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
		customMonths: [
			'Янв',
			'Фев',
			'Мар',
			'Апр',
			'Май',
			'Июн',
			'Июл',
			'Авг',
			'Сен',
			'Окт',
			'Ноя',
			'Дек'
		],
		overlayButton: 'Применить',
		overlayPlaceholder: 'Год (4 цифры)',
		startDay: 1,
		formatter: (input, date /* , instance */) => {
			const value = date.toLocaleDateString()
			input.value = value
		}
		/* onSelect: (input, instance, date) => {
		} */
	})
	nodeObjects.datepicker = picker
}
