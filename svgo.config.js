const svgoConfig = {
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					convertPathData: false,
					removeViewBox: false
				}
			}
		}, {
			name: 'removeAttrs',
			params: {
				attrs: '(fill|stroke|style)'
			}
		},
		'removeXMLNS'
	]
}

export { svgoConfig }
