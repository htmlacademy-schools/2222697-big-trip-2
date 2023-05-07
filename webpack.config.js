const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    // Указываем путь до входной точки:
    entry: './src/main.js',
    // Описываем, куда следует поместить результат работы:
    output: {
        // Путь до директории (важно использовать path.resolve):
        path: path.resolve(__dirname, 'build'),
        // Имя файла со сборкой:
        filename: 'bundle.js',
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'public' }]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            }
        ]
    }
}