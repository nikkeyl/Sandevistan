import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const catchError = taskName =>
	plumber(notify.onError({
		title: taskName,
		message: 'Error: <%= error.message %>'
	}))

export { catchError }