'use strict'; // eslint-disable-line

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require('./config');

const assetsFilenames = config.production ? config.cacheBusting : '[name]';

let webpackConfig = {
    context: config.paths.assets,
    entry: config.entry,
    output: {
        path: config.paths.dist,
        publicPath: config.publicPath,
        filename: `${assetsFilenames}.js`,
    },
    stats: {
        hash: false,
        version: false,
        timings: false,
        children: false,
        errors: false,
        errorDetails: false,
        warnings: false,
        chunks: false,
        modules: false,
        reasons: false,
        source: false,
        publicPath: false,
    },
    module: {
        rules: [
            // {
            //     test: /\.(js)$/,
            //     exclude: /node_modules/,
            //     include: config.paths.assets,
            //     use: 'eslint',
            // },
            {
                enforce: 'pre',
                test: /\.(js|s?[ca]ss)$/,
                include: config.paths.assets,
                loader: 'import-glob',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ]
                    },
                },
            },
        ],
    },
    resolve: {
        modules: [
            config.paths.assets,
            'node_modules',
        ],
        enforceExtension: false,
    },
    resolveLoader: {
    },
    plugins: [
        new CleanPlugin([config.paths.cache, config.paths.dist], {
            root: config.paths.root,
            verbose: false,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: config.enabled.optimize,
            debug: config.enabled.watcher,
            stats: {colors: true},
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.js$/,
            options: {
                eslint: {failOnWarning: false, failOnError: true},
            },
        }),
        new FriendlyErrorsWebpackPlugin(),
    ],
};

/* eslint-disable global-require */ /** Let's only load dependencies as needed */

if (config.enabled.optimize) {
    webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.production) {
    webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.watcher) {
    webpackConfig.entry = require('./util/addHotMiddleware')(webpackConfig.entry);
    webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = [webpackConfig];
