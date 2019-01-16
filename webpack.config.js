const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDEV = process.env.NODE_ENV == 'development'

module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "no framework needed!",
            chunksSortMode: "none"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            h: ['jsx-dom', 'h'],
            f: ['jsx-dom', 'f']
        })
    ],
    devtool: isDEV ?  'inline-source-map' : 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            importLoaders: 1,
                            localIdentName: '[local]__[hash:base64:5]'
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
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
