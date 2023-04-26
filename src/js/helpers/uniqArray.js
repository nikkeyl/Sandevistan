export const uniqArray = array =>
	array.filter((item, index, self) => self.indexOf(item) === index)
