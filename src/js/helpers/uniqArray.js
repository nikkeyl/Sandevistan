export function uniqArray(array) {
	return array.filter((item, index, self) => self.indexOf(item) === index)
}
