export function hoverEffect() {
	const menuLinksWrappers = document.querySelectorAll('[data-line-effect]')
	menuLinksWrappers.length ? menuEffect() : null
	function menuEffect() {
		menuLinksWrappers.forEach(menuLinksWrapper => {
			const menuLinks = menuLinksWrapper.querySelectorAll('a')
			const effectSpeed = menuLinksWrapper.dataset.lineEffect
				? menuLinksWrapper.dataset.lineEffect
				: 200
			menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null
		})
		function menuEffectItem(menuLinks, effectSpeed) {
			const effectTransition = `transition: transform ${effectSpeed}ms ease;`
			const effectHover = `transform: translateX(0);`
			const effectRight = `transform: translateX(-100%);`
			const effectLeft = `transform: translateX(100%);`
			menuLinks.forEach(menuLink => {
				menuLink.insertAdjacentHTML(
					'beforeend',
					`
                <span class="hover" style="transform: translateX(100%);">
                    <span class="hover__text" style="transform: translateX(-100%);">
                    ${menuLink.textContent}
                    </span>
                </span>
            `
				)
				menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions
			})
			function menuLinkActions(e) {
				const menuLink = e.target
				const menuLinkItem = menuLink.querySelector('.hover')
				const menuLinkText = menuLink.querySelector('.hover__text')
				const menuLinkWidth = menuLink.offsetWidth / 2
				const menuLinkPos =
					e.pageX - (menuLink.getBoundingClientRect().left + scrollX)
				if (e.type === 'mouseenter') {
					menuLinkItem.style.cssText =
						menuLinkPos > menuLinkWidth ? effectLeft : effectRight
					menuLinkText.style.cssText =
						menuLinkPos > menuLinkWidth ? effectRight : effectLeft
					setTimeout(() => {
						menuLinkItem.style.cssText =
							effectHover + effectTransition
						menuLinkText.style.cssText =
							effectHover + effectTransition
					}, 5)
				}
				if (e.type === 'mouseleave') {
					menuLinkItem.style.cssText =
						menuLinkPos > menuLinkWidth
							? effectLeft + effectTransition
							: effectRight + effectTransition
					menuLinkText.style.cssText =
						menuLinkPos > menuLinkWidth
							? effectRight + effectTransition
							: effectLeft + effectTransition
				}
			}
			// const effectHover = `transform: translateY(0);`
			// const effectTop = `transform: translateY(-100%);`
			// const effectBottom = `transform: translateY(100%);`
			// menuLinks.forEach(menuLink => {
			//     menuLink.insertAdjacentHTML(
			//         'beforeend',
			//         `
			//         <span class="hover" style="transform: translateY(100%);">
			//             <span class="hover__text" style="transform: translateY(-100%);">
			//             ${menuLink.textContent}
			//             </span>
			//         </span>
			//     `
			//     )
			//     menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions
			// })
			// function menuLinkActions(e) {
			//     const menuLink = e.target
			//     const menuLinkItem = menuLink.querySelector('.hover')
			//     const menuLinkText = menuLink.querySelector('.hover__text')
			//     const menuLinkHeight = menuLink.offsetHeight / 2
			//     const menuLinkPos =
			//         e.pageY - (menuLink.getBoundingClientRect().top + scrollY)
			//     if (e.type === 'mouseenter') {
			//         menuLinkItem.style.cssText =
			//             menuLinkPos > menuLinkHeight ? effectBottom : effectTop
			//         menuLinkText.style.cssText =
			//             menuLinkPos > menuLinkHeight ? effectTop : effectBottom
			//         setTimeout(() => {
			//             menuLinkItem.style.cssText =
			//                 effectHover + effectTransition
			//             menuLinkText.style.cssText =
			//                 effectHover + effectTransition
			//         }, 5)
			//     }
			//     if (e.type === 'mouseleave') {
			//         menuLinkItem.style.cssText =
			//             menuLinkPos > menuLinkHeight
			//                 ? effectBottom + effectTransition
			//                 : effectTop + effectTransition
			//         menuLinkText.style.cssText =
			//             menuLinkPos > menuLinkHeight
			//                 ? effectTop + effectTransition
			//                 : effectBottom + effectTransition
			//     }
			// }
		}
	}
}
