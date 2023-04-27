export function getHash() {
	location.hash ? location.hash.replace('#', '') : null
}
