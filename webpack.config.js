const path = require('path');
const dotenv = require('dotenv').config({ path: './.env' });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    target,
    devtool,
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'project-name.bundle.[contenthash].js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            core: path.resolve(__dirname, 'src/core/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            services: path.resolve(__dirname, 'src/services/'),
            hoc: path.resolve(__dirname, 'src/hoc/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            handlebars: 'handlebars/dist/handlebars.min.js',
        },
    },
    performance: {
        hints: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 3000,
        open: true,
        compress: true,
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.ts|tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(
                                __dirname,
                                'tsconfig.json'
                            ),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
