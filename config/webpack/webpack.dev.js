import { plugins } from '../settings/plugins.js'
import { path } from '../settings/path.js'

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    stats: 'errors-warnings',
    optimization: {
        minimize: false
    },
    entry: `${path.root}/js/app.js`,
    output: {
        filename: 'js/app.min.js',
        path: path.built,
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        static: path.built,
        compress: true,
        open: true,

        watchFiles: [
            `${path.root}/content/**/*.*`,
            `${path.root}/**/*.html`,
            `${path.root}/**/*.htm`
        ]
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                exclude: `${path.root}/fonts`,
                use: [
                    'style-loader',
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: '@content',
                            replace: '../content',
                            flags: 'g'
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: false,
                            url: {
                                filter: url => {
                                    if (
                                        url.includes('content/') ||
                                        url.includes('fonts/')
                                    ) {
                                        return false
                                    }
                                    return true
                                }
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new plugins.FileIncludeWebpackPlugin({
            source: path.srcFolder,
            replace: [
                {
                    regex: '<link rel="stylesheet" href="css/style.min.css">',
                    to: ''
                }, {
                    regex: '../content',
                    to: 'content'
                }, {
                    regex: '@content',
                    to: 'content'
                }
            ]
        }),
        new plugins.CopyPlugin({
            patterns: [
                {
                    from: `${path.root}/content`,
                    to: 'content',
                    noErrorOnMissing: true,
                    force: true
                }, {
                    from: `${path.root}/static`,
                    to: 'static',
                    noErrorOnMissing: true,
                    force: true
                }, {
                    from: `${path.root}/favicon.svg`,
                    to: './',
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    resolve: {
        extensions: [
            '.scss',
            '.css',
            '.js'
        ],
        alias: {
            '@scss': `${path.root}/scss`,
            '@js': `${path.root}/js`
        }
    }
}

export default config