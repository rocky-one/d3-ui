var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const sourcePath = path.join(__dirname, './src');
var setConfig = require('./webpack.base.config.js');
var merge = require('webpack-merge');
var config = setConfig('dllprod', 'production', 'main');
var { produport, commonsChunk } = require('./constBase.js');
var nodeServer = require('./nodeServer.js');
nodeServer(produport);

var dllProdconfig = {
	cache: true,
	plugins: [
		new CleanWebpackPlugin(['dist/js/*.js', 'dist/css/*.css', 'dist/images', 'dist/index.html'], {
			root: process.cwd(),
			verbose: true,
			dry: false,
			exclude: ['dist/js/vendor'],
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'main',
			chunks: commonsChunk,
			minChunks: '2'
		}),
		new webpack.DllReferencePlugin({
			context: path.resolve(__dirname), //和dll文件的context对应
			manifest: require('./manifest.json'),//加载dll编译时输出的 json文件，第三方库不再打包处理
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../src/template/index.html'),
			inject: true,
			// chunks: ['main','common'] 
		})
	]
};

var newConfig = merge(config, dllProdconfig);
webpack(newConfig, function (err, stats) {
	console.log(stats.toString({
		chunks: false,
		colors: true
	}));
});


