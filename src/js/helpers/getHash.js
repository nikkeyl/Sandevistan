export function getHash() {
	if (location.hash) return location.hash.replace('#', '')
	// location.hash ? location.hash.replace('#', '') : null [NEW]
}
