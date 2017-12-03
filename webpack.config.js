module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'public/static/js/bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    // Add minification
    // plugins: [
    //    new webpack.optimize.UglifyJsPlugin()
    // ]
};