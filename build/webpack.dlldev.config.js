
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpackDevServer = require('webpack-dev-server');
var setConfig = require('./webpack.base.config.js');
var merge = require('webpack-merge');
var config = setConfig('dlldev', 'development', 'main');
var { devport, commonsChunk } = require('./constBase.js');
var dllDevConfig = {

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'main',
			chunks: commonsChunk,
			minChunks: '2'
		}),
		new webpack.DllReferencePlugin({
			context: path.resolve(__dirname), //和dll文件的context对应
			manifest: require('./manifest.json'),//加载dll编译时输出的 json文件，第三方库不再打包处理

		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../src/template/index.html'),
			inject: true
		})
	]
};
var newConfig = merge(config, dllDevConfig);
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

