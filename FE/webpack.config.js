const path = require('path');

module.exports = {
    mode: 'development', //개발용(development), 배포용(production)
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name]_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        hot: true,
        port: 9000,
        proxy: {
            '/api': 'http://localhost:4000',
        },
    },
    plugins: [],
};
