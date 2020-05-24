const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDEV = process.env.NODE_ENV == 'development'

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/docs',
        publicPath: '/coviz19',
        filename: 'bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: "none",

        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new webpack.ProvidePlugin({
            h: ['jsx-pragma', 'h'],
            f: ['jsx-pragma', 'f']
        }),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ],
    devtool: isDEV ? 'inline-source-map': 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    isDEV ? 'style-loader' :  {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]'
                            },
                            localsConvention: 'camelCase',
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                  ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
              test: /\.(woff(2)?|ttf|eot|svg|csv)(\?v=\d+\.\d+\.\d+)?$/,
              use: [{
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                  }
              }]
          }
        ]
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        historyApiFallback: true
    }
}