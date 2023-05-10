import { uniqArray } from '@js/helpers/uniqArray'

function dataMediaQueries(array, dataSetValue) {
	/*! This function helps to run other functions depending on the width of the viewport [768, max] or [768, min] */
	const media = Array.from(array).filter(item => {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(',')[0]
		}
	})
	if (media.length) {
		const breakpointsArray = []
		media.forEach(item => {
			const params = item.dataset[dataSetValue]
			const breakpoint = {}
			const paramsArray = params.split(',')
			breakpoint.value = paramsArray[0]
			breakpoint.type = paramsArray[1]?.trim() || 'max'
			breakpoint.item = item
			breakpointsArray.push(breakpoint)
		})
		let mdQueries = breakpointsArray.map(item => {
			return (
				'(' +
				item.type +
				'-width: ' +
				item.value +
				'px),' +
				item.value +
				',' +
				item.type
			)
		})
		mdQueries = uniqArray(mdQueries)
		const mdQueriesArray = []
		if (mdQueries.length) {
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(',')
				const mediaBreakpoint = paramsArray[1]
				const mediaType = paramsArray[2]
				const matchMedia = window.matchMedia(paramsArray[0])
				const itemsArray = breakpointsArray.filter(item => {
					if (
						item.value === mediaBreakpoint &&
						item.type === mediaType
					) {
						return true
					}
				})
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			})
			return mdQueriesArray
		}
	}
}

export { dataMediaQueries }
