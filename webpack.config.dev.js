const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config');

const config = {
    mode: 'development',
    devServer: {
        port: 3000,
        open: true,
        compress: true,
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.dev.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
};

module.exports = merge(baseConfig, { ...config });
