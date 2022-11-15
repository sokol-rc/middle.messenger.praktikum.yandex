const { merge } = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./webpack.config');

const config = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[contenthash:8].js',
    },
    optimization: {
        minimize: true,
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CompressionPlugin(),
        {
            apply: (compiler) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                compiler.hooks.done.tap('DonePlugin', (stats) => {
                    console.log('Compile is done !');
                    setTimeout(() => {
                        process.exit(0);
                    });
                });
            },
        },
    ],
};

module.exports = merge(baseConfig, { ...config });
