const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const backendConfig = {
    entry: path.resolve(__dirname, 'src',  'server.ts'),
    devtool: 'inline-source-map',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    optimization: {
        usedExports: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },
}

module.exports = backendConfig;