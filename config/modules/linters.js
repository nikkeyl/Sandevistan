import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'

const linters = {
	StyleLint: new ESLintWebpackPlugin({
		fix: true
	}),
	ESLint: new StylelintWebpackPlugin({
		fix: true
	})
}

export { linters }