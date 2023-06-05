/*! Tips (Tippy plugin) https://atomiks.github.io/tippyjs/ */
import { nodeObjects } from '@js/helpers/nodeList'
import tippy from 'tippy.js'

// InlinePositioning,
// FollowCursor,
// AnimateFill,
// RoundArrow,
// Sticky,

import '@scss/libs/tippy'

if (document.querySelectorAll('[data-tippy-content]')) {
	const hints = tippy('[data-tippy-content]', {
		plugins: [],

		// AllowHTML: false,
		// AnimateFill: false,
		// Animation: 'fade',
		// AppendTo: () => document.body,
		// AppendTo: 'parent',
		// AppendTo: element,
		// Aria: {
		//     Content: 'auto',
		//     Expanded: 'auto'
		// },
		// Arrow: true,
		// Content: '',
		delay: 0,
		duration: [
			300,
			250
		],

		// FollowCursor: false,
		// GetReferenceClientRect: null,
		// HideOnClick: true,
		// IgnoreAttributes: false,
		// Inertia: false,
		// InlinePositioning: false,
		interactive: false,
		interactiveBorder: 2,
		interactiveDebounce: 0,
		maxWidth: 350,
		moveTransition: '',
		offset: [
			0,
			10
		],
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
