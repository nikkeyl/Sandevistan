const svgoConfig = {
	plugins: [
		{
			removeAttrs: {
				attrs: '(stroke|fill|style)'
			}
		}, {
			convertPathData: false
		}, {
			removeViewBox: false
		}, {
			removeXMLNS: true
		},
	]
}

export { svgoConfig }
