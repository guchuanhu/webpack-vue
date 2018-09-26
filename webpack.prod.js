//生产环境
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            name: "assets/img/[name].[ext]",
                            publicPath: './lib/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(['lib'],{
            root: path.resolve(__dirname, '../public')
        })
    ]
});