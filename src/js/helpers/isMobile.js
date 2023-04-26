export const isMobile = {
	BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
	iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
	Opera: () => navigator.userAgent.match(/Opera Mini/i),
	Android: () => navigator.userAgent.match(/Android/i),
	any: () =>
		isMobile.BlackBerry() ||
		isMobile.Android() ||
		isMobile.Opera() ||
		isMobile.iOS()
}
