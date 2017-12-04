module.exports = {
    entry: './src/js/main.js',

    output: {
        filename: './public/js/bundle.js'
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    // Turn on sourcemaps
    devtool: 'source-map',
    // Add minification
    // plugins: [
    //    new webpack.optimize.UglifyJsPlugin()
    // ]
};