import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const catchError = title =>
	plumber({
		errorHandler: notify.onError({
			title: title,
			message: 'Error: <%= error.message %>'
		})
	})

export { catchError }
