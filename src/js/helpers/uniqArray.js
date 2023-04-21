export function uniqArray(array) {
    return array.filter((item, index, self) => {
        return self.indexOf(item) === index
    })
}
