import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const catchError = title =>
	plumber(notify.onError({
		title: title,
		message: 'Error: <%= error.message %>'
	}))

export { catchError }
