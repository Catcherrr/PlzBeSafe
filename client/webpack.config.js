const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mode: 'development',
    // entry 파일 설정
    entry: {
        polyfills: '@babel/polyfill',
        bundle: './src/index.tsx',
    },
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    // 번들링 될 파일 정보
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            // loader 나열
            {
                // ts, js
                test: /\.(ts|js)x?$/,
                exclude: '/node_module/',
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                // css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // image
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[ext]?[hash]',
                        },
                    },
                ],
            },
            {
                // font
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/fonts/[name].[ext]?[hash]',
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
};
