module.exports = {
    input: 'src/js/main.js',
    output: {
        sourcemap: true,
        // sourcemap: 'inline',
        // file: 'bundle.js',
        // format: 'cjs'
        file: 'bundle.mjs',
        format: 'esm'
    },
};