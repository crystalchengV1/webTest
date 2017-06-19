/* 
* @Author: crystalchengV1
* @Date:   2017-06-19 10:11:16
* @Last Modified by:   crystalchengV1
* @Last Modified time: 2017-06-19 10:47:03
*/
var webpack=require('webpack');
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var htmlWebpackPlugin=require('html-webpack-plugin');
//环境变量配置
var WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev';
//获取html-webpack-plugin参数的方法
var getHtmlConfig=function(name){
	return{
		template:'./src/view/'+ name +'.html',
    	filename:'view/'+ name +'.html',
    	inject:true,
    	hash:true,
    	chunks:['common',name]
	};
};
//webpack config
var config={
	entry:{
		'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js'],
    },
    output:{
        path:'./dist',
        publicPath:'/dist',
        filename:'js/[name].js'
    },
    externals:{
    	'jquery':'window.jQuery'
    },
    //所使用的一些依赖模块
    module:{
    	//加载器
    	loaders:[
    		{test: /\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
    		{test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=8192&name=resource/[name].[ext]'}
    	]
    },
    plugins:[
         //独立通用模块到js/base.js
    	new webpack.optimize.CommonsChunkPlugin({
    		name:'common',
    		filename:'js/base.js'
    	}),
    	//把css单独打包到文件
    	new ExtractTextPlugin("css/[name].css"),
    	//html模板的处理
    	new  htmlWebpackPlugin(getHtmlConfig('index')),
    	new  htmlWebpackPlugin(getHtmlConfig('login')),
    ]
};
if('dev'=== WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports = config;

   

