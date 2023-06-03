const svgoConfig = {
	plugins: [
		{
			convertPathData: false
		}, {
			removeAttrs: {
				attrs: '(stroke|fill|style)'
			}
		}, {
			removeViewBox: false // not working
		}, {
			removeXMLNS: true
		}
	]
}

export { svgoConfig }
