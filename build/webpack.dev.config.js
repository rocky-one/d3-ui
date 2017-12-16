
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpackDevServer = require('webpack-dev-server');
var setConfig = require('./webpack.base.config.js');
var merge = require('webpack-merge');
var config = setConfig('dlldev', 'development', 'main');
var { devport, commonsChunk } = require('./constBase.js');

var devConfig = {
	entry: {
		main: path.resolve(__dirname, '../src/main.js'),
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'main',
			chunks: commonsChunk,
			minChunks: '2'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			inject: true
		})
	]
};
var newConfig = merge(config, devConfig);
//  热替换
Object.keys(newConfig.entry).forEach(function (name) {
	newConfig.entry[name] = [
		`webpack-dev-server/client?http://localhost:${devport}/`,
		"webpack/hot/dev-server"
	].concat(newConfig.entry[name])
});

var compiler = webpack(newConfig);
var server = new webpackDevServer(compiler, {
	hot: true,
	publicPath: '/',
	contentBase: path.join(__dirname, '../dist'),
	stats: {
		assets: true,
		colors: true,
	},
	historyApiFallback: true,//当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
});
var opn = require('opn');
server.listen(devport, function () {
	opn(`http://localhost:${devport}/`);
});

