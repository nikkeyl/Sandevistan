function getHash() {
	location.hash ? location.hash.replace('#', '') : null
}
// const getHash = () => location.hash ? location.hash.replace('#', '') : null

export { getHash }
