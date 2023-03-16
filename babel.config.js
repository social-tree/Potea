module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    'src': './src/',
                },
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.jsx',
                    '.json',
                    '.tsx',
                    '.ts',
                    '.native.js',
                ],
            },
        ],
    ],
};