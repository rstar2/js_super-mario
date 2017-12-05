const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const folderDist = 'public';
const bundleJS = 'js/bundle.app.js';
const bundleSTYLES = 'css/bundle.css';

module.exports = function (env) {
    const config = {
        entry: {
            [bundleJS]: [
                './src/js/main.js',

                // import CSS but actually it will be extracted to a separate combined file
                './src/css/styles.css'
            ]
        },

        output: {
            filename: '[name]',
            path: path.resolve(__dirname, folderDist),
        },

        resolve: {
            extensions: ['.js']
        },

        plugins: [
            // clean the build folder first
            new CleanWebpackPlugin(folderDist),

            new ExtractTextPlugin(bundleSTYLES),

            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),

            new CopyWebpackPlugin([
                { from: './src/img', to: 'img' },
                { from: './src/data', to: 'data' }
            ])
        ],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "es2015",
                                "stage-0"
                            ],
                            "plugins": [
                                "transform-runtime"
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    url: false, // don't import/inline the url like in background-image : url('')
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ]
        },

        // Turn on/off sourcemaps globally - for all loaders
        devtool: 'source-map'
    };

    // if building for Electron then add a new entry
    if (env.electron) {
        // This will build a new JS bundle but there's no guaranty
        // that it will be put and parsed before the main JS bundle (but this is necessary)
        // const bundleElectron = 'js/bundle.electron.js';
        // config.entry[bundleElectron] = './src/js-electron/renderer.js';

        // This will use the main JS bundle and add the Electron stuff in front
        config.entry[bundleJS].unshift('./src/js-electron/renderer.js');
    }

    return config;
};