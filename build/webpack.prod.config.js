//生产环境配置
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var sourcePath = path.join(__dirname, './src');
var setConfig = require('./webpack.base.config.js');
var merge = require('webpack-merge');
var config = setConfig('dllprod','production','main');
var { vendor, produport, commonsChunk } = require('./constBase.js');
var nodeServer = require('./nodeServer.js');
nodeServer(produport);
var prodConfig ={
    entry: { 
        main: path.resolve(__dirname, '../src/main.js'),
        vendor: vendor
    },
    
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd(),
            verbose: true,
            dry: false,
            exclude: [],
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            chunks: commonsChunk,
            minChunks: '2'
        }),
        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        })
    ]
};
var newConfig = merge(config,prodConfig);
webpack(newConfig, function(err, stats) {
    console.log(stats.toString({
        chunks: false,
        colors: true 
    }));
});


