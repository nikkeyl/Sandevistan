const svgoConfig = {
	plugins: [
		{
			convertPathData: false
		}, {
			removeAttrs: {
				attrs: '(stroke|fill|style)'
			}
		}, {
			removeViewBox: false
		}, {
			removeXMLNS: true
		}
	]
}

export { svgoConfig }
