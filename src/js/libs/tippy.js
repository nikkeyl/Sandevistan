/*
 *!
 * Tips (Tippy plugin)
 * https://atomiks.github.io/tippyjs/
 */
import { nodeObjects } from '@js/helpers/nodeList'
import tippy from 'tippy.js'

/*
 *InlinePositioning,
 *followCursor,
 *animateFill,
 *roundArrow,
 *sticky,
 */

import '@scss/libs/tippy'

if (document.querySelectorAll('[data-tippy-content]')) {
	const hints = tippy('[data-tippy-content]', {
		plugins: [
			/*
			 * AnimateFill,
			 * RoundArrow,
			 * FollowCursor,
			 * InlinePositioning,
			 * Sticky
			 */
		],

		/*
		 * AllowHTML: false,
		 * AnimateFill: false,
		 * Animation: 'fade',
		 * AppendTo: () => document.body,
		 * AppendTo: 'parent',
		 * AppendTo: element,
		 */
		/*
		 * Aria: {
		 * content: 'auto',
		 * expanded: 'auto'
		 * },
		 */
		/*
		 * Arrow: true,
		 * Content: '',
		 */
		delay: 0,
		duration: [300, 250],

		/*
		 * FollowCursor: false,
		 * GetReferenceClientRect: null,
		 * HideOnClick: true,
		 * IgnoreAttributes: false,
		 * Inertia: false,
		 * InlinePositioning: false,
		 */
		interactive: false,
		interactiveBorder: 2,
		interactiveDebounce: 0,
		maxWidth: 350,
		moveTransition: '',
		offset: [0, 10],
		placement: 'top',
		role: 'tooltip',
		showOnCreate: false,
		theme: '',
		touch: true,
		trigger: 'click',
		triggerTarget: null
	})

	nodeObjects.hints = hints
}
