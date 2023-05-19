import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'

const linters = {
	styleLint: new ESLintWebpackPlugin({
		fix: true
	}),
	esLint: new StylelintWebpackPlugin({
		fix: true
	})
}

export { linters }
