
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var { vendor } = require('./constBase.js');
 var setConfig = function(dll,processEnv,entryName){

    var config ={
        entry: { 
            [entryName]: dll==='dll' ? vendor : path.join(__dirname, '../src/main.js'),
        },
        output: {
            path: path.join(__dirname, '../dist'),
            publicPath: '/',
            filename: 'js/[name].[hash:8].js',
            chunkFilename: 'js/[name].[chunkhash:8].js',
            // library: 'webpackNumbers',
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: 'iconfont/[name].[hash:7].[ext]'
                        }
                    }]
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                
                            },
                            {
                                loader: 'sass-loader',
                                
                            },
                        ],
                    })
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
            ]
        },
        
        plugins: [
            new ExtractTextPlugin({
                filename: "css/style.css?[contenthash:8]"
            }),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify(processEnv) },
            })
        ]
    };
    
    if( processEnv === 'production'){
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告  
            warnings: false,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
            }
        }))
        
    }
    return config;
}

module.exports = setConfig;
