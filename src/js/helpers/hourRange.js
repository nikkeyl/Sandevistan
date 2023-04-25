export function hourRange(start, end, script) {
	/*! This feature helps you run other functions at specific times */
	const time = new Date()
	const now = `${time.getHours()}.${time.getMinutes()}`
	return now >= start && now < end && script()
}
