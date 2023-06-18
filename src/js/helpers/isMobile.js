const isMobile = {
	blackBerry: () => navigator.userAgent.match(/BlackBerry/i),
	ios: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
	opera: () => navigator.userAgent.match(/Opera Mini/i),
	android: () => navigator.userAgent.match(/Android/i),
	any: () =>
		isMobile.blackBerry() || isMobile.android() || isMobile.opera() || isMobile.ios()
}

export { isMobile }
