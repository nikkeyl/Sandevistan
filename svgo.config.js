const svgoConfig = {
	plugins: [
		{
			removeAttrs: {
				attrs: '(stroke|fill)'
			}
		}, {
			convertPathData: false
		}, {
			removeViewBox: false
		}, {
			removeXMLNS: true
		}
	]
}

export { svgoConfig }
