import { deleteAsync } from 'del'

export const reset = () => {
    return deleteAsync(
        [
            `${app.path.rootFolder}.zip`,
            app.path.reportsFolder,
            app.path.buildFolder,
            '**/.gitkeep'
        ]
    )
}