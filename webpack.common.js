//公用
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../public/lib'),
        filename: '[name].bundle.js',
        publicPath: './lib'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            // // 它会应用到普通的 `.css` 文件
            // // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'vue-style-loader',
                // {
                //     loader: MiniCssExtractPlugin.loader,
                //     options: {
                //     // you can specify a publicPath here
                //     // by default it use publicPath in webpackOptions.output
                //     publicPath: '/assets/img/'
                //     }
                // },
                'css-loader'
                ]
            },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 limit: 8192,
            //                 name: "assets/img/[name].[ext]",
            //                 publicPath: './lib'
            //             }
            //         }
            //     ]
            // }
        ]
    },
    resolve: {
        // alias: {//和～配合使用
        //     'img': path.resolve(__dirname, 'src/assets/img/')
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html'
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{ //静态文件存储，避免被打包
            from: 'src/assets/',
            to: 'assets/'
        }]),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ],
    optimization: {
        splitChunks: {
          chunks: 'all',
          name: 'common',
        },
        runtimeChunk: {
          name: 'runtime',
        }
    }
};
