import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const handleError = taskName =>
	plumber(notify.onError({
		title: taskName,
		message: 'Error: <%= error.message %>'
	}))

export { handleError }