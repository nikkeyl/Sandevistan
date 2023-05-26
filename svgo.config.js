const svgoConfig = {
	plugins: [
		{
			removeAttrs: {
				attrs: '(stroke|fill|style)'
			}
		}, {
			convertPathData: false
		}, {
			removeViewBox: false // not working
		}, {
			removeXMLNS: true
		},
	]
}

export { svgoConfig }
