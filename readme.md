1. Babel
    - use the es2015 and stage-0 presets to get all ES6 features (even those not fully specified)
    - use 'transform-runtime' plugin so that generators and async/await could work
2. Webpack
 - Clean up the build folder (with 'clean-webpack-plugin')
 - Bundle the ES6 files as first they are compiled by Babel (with 'babel-loader')
 - Bundle and CSS/LESS and extract them to a single combined file
     (with 'extract-text-webpack-plugin')
 - Use template 'index.html' (with 'html-webpack-plugin')
 - Copy Images/Data files (with 'copy-webpack-plugin')

 3. Electron
    - TODO: Require local files require('./fetchLocal');
    - TODO: Use ES6? Pass through Babel and Webpack or not ?
    