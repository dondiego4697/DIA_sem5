let isDEV = !['prod', 'testing'].includes(process.env.NODE_ENV);
console.log(isDEV ? 'development' : 'production || testing');

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: ['./res/js/index.js']
    },
    output: {
        filename: isDEV ? '[name].bundle.js' : '[name].bundle.min.js',
        path: __dirname + '/build'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', use: [
                        {loader: 'css-loader', options: {minimize: true}}
                    ]
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader',
                    /*use: [
                        {loader: 'css-loader!sass-loader', options: {minimize: true}}
                    ]*/
                    use: 'css-loader!sass-loader'
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules'],
    },
    plugins: isDEV ? [
        new ExtractTextPlugin('[name].bundle.css')
    ] : [
        new ExtractTextPlugin('[name].bundle.min.css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            minimize: isDEV,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: true,
                drop_console: false,
                unsafe: true
            }
        }),
    ]
};