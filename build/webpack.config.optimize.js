'use strict'; // eslint-disable-line

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 7,
                warnings: false,
                compress: {
                    drop_console: true,
                },
                output: {
                    comments: false,
                },
            },
        }),
    ],
};
