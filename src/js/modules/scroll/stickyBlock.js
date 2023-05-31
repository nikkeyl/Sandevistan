function stickyBlock() {
	function stickyBlockInit() {
		const stickyParents = document.querySelectorAll('[data-sticky]')

		stickyParents.forEach(stickyParent => {
			const stickyConfig = {
				media: parseInt(stickyParent.dataset.sticky) || null,
				top: parseInt(stickyParent.dataset.stickyTop) || 0,
				bottom: parseInt(stickyParent.dataset.stickyBottom) || 0,
				header: stickyParent.hasAttribute('data-sticky-header')
					? document.querySelector('header.header').offsetHeight
					: 0
			}

			stickyBlockItem(stickyParent, stickyConfig)
		})
	}

	function stickyBlockItem(stickyParent, stickyConfig) {
		const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]')
		const headerHeight = stickyConfig.header
		const offsetTop = headerHeight + stickyConfig.top
		const startPoint
            = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop

		document.addEventListener('scroll', stickyBlockActions)

		function stickyBlockActions() {
			const endPoint
                = stickyParent.offsetHeight
                + stickyParent.getBoundingClientRect().top
                + scrollY
                - (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom)
			const stickyItemValues = {
				position: 'relative',
				bottom: 'auto',
				top: '0px',
				left: '0px',
				width: 'auto'
			}

			if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
				if (
					offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight
				) {
					if (scrollY >= startPoint && scrollY <= endPoint) {
						stickyItemValues.position = 'fixed'
						stickyItemValues.bottom = 'auto'
						stickyItemValues.top = `${offsetTop}px`
						stickyItemValues.left = `${
							stickyBlockItem.getBoundingClientRect().left
						}px`
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`
					} else if (scrollY >= endPoint) {
						stickyItemValues.position = 'absolute'
						stickyItemValues.bottom = `${stickyConfig.bottom}px`
						stickyItemValues.top = 'auto'
						stickyItemValues.left = '0px'
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`
					}
				}
			}

			stickyBlockType(stickyBlockItem, stickyItemValues)
		}
	}

	function stickyBlockType(stickyBlockItem, stickyItemValues) {
		stickyBlockItem.style.cssText = `
            position: ${stickyItemValues.position};
            bottom: ${stickyItemValues.bottom};
            top: ${stickyItemValues.top};
            left: ${stickyItemValues.left};
            width: ${stickyItemValues.width};
        `
	}

	stickyBlockInit()
}

export { stickyBlock }
