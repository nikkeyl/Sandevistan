import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'

const linters = {
	styleLint: new StylelintWebpackPlugin({
		fix: true
	}),
	esLint: new ESLintWebpackPlugin({
		fix: true
	})
}

export { linters }
