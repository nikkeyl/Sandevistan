import { deleteAsync } from 'del'

export const reset = () => {
	return deleteAsync(
		[
			`${app.paths.rootFolder}.zip`,
			app.paths.reportsFolder,
			app.paths.buildFolder,
			'**/.gitkeep'
		]
	)
}