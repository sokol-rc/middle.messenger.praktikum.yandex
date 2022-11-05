const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = 'development';
const devMode = 'development';

const target = devMode ? 'web' : 'browserlist';
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
            core: './src/core/',
            utils: './src/utils',
            services: './src/services',
            hoc: './src/hoc',
            reducers: './src/reducers',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
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
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
};
