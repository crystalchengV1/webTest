/* 
* @Author: crystalchengV1
* @Date:   2017-06-19 10:11:16
* @Last Modified by:   crystalchengV1
* @Last Modified time: 2017-06-19 10:47:03
*/
var webpack=require('webpack');
var ExtractTextPlugin=require("extract-text-webpack-plugin");//npm安装插件extract-text-webpack-plugin
var htmlWebpackPlugin=require('html-webpack-plugin');//npm安装插件html-webpack-plugin
//环境变量配置
var WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev';
//封装方法,获取html-webpack-plugin参数的方法
var getHtmlConfig=function(name,title){
	return{
		template	:'./src/view/'+ name +'.html',
    	filename	:'view/'+ name +'.html',
    	favicon		:'./favicon.ico',
    	title		:title,
    	inject		:true,
    	hash		:true,
    	chunks		:['common',name]
	};
};
//webpack config
var config={
	entry:{
		'common'			:	['./src/page/common/index.js'],//公用入口（js+css）
        'index'				:	['./src/page/index/index.js'],//主入口（js+css）
        'result'			:	['./src/page/result/index.js'],//主入口（js+css）
        'user-login'		:	['./src/page/user-login/index.js'],//主入口（js+css）
        'user-register'		:	['./src/page/user-register/index.js'],//主入口（js+css）
        'user-pass-reset'	:	['./src/page/user-pass-reset/index.js'],//主入口（js+css）
        'user-center'       : 	['./src/page/user-center/index.js'],
        'user-center-update': 	['./src/page/user-center-update/index.js'],
        'user-pass-update'	: 	['./src/page/user-pass-update/index.js'],
        'list'              : 	['./src/page/list/index.js'],
        'detail'            : 	['./src/page/detail/index.js'],
        'cart'              : 	['./src/page/cart/index.js'],
        'order-confirm'     : ['./src/page/order-confirm/index.js'],
        'order-list'        : ['./src/page/order-list/index.js'],
        'order-detail'      : ['./src/page/order-detail/index.js'],
        'payment'           : ['./src/page/payment/index.js'],
        'about'             : ['./src/page/about/index.js'],
    },
    output:{
        path		:	__dirname + '/dist/',//打包过后的文件目录
        publicPath	:	'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',//系统主目录
        filename	:	'js/[name].js'
    },
    externals:{
    	'jquery':'window.jQuery'
    },
    //所使用的一些依赖模块
    module:{
    	//加载器
    	loaders:[
    		{test: /\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
    		{test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=100&name=resource/[name].[ext]'},
    		{test: /\.string$/,loader:'html-loader',
    		 query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
    		 }
    	]
    },
    resolve:{
    	alias:{
    		node_modules    : __dirname+'/node_modules',
    		util    		: __dirname+'/src/util',
    		page    		: __dirname+'/src/page',
    		image   		: __dirname+'/src/image',
    		service 		: __dirname+'/src/service',
    		view    		: __dirname+'/src/view',
    	}
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
    	new  htmlWebpackPlugin(getHtmlConfig('index','c首页')),
    	new  htmlWebpackPlugin(getHtmlConfig('result','c操作结果')),
    	new  htmlWebpackPlugin(getHtmlConfig('user-login','c用户登录')),
    	new  htmlWebpackPlugin(getHtmlConfig('user-register','c用户注册')),
    	new  htmlWebpackPlugin(getHtmlConfig('user-pass-reset','c重置密码')),
    	new  htmlWebpackPlugin(getHtmlConfig('user-center','c个人中心')),
    	new  htmlWebpackPlugin(getHtmlConfig('user-center-update','c个人中心信息更新')),
    	new  htmlWebpackPlugin(getHtmlConfig('user-pass-update','c修改密码')),
    	new  htmlWebpackPlugin(getHtmlConfig('list', 'c商品列表页')),
    	new  htmlWebpackPlugin(getHtmlConfig('detail', 'c商品详情页')),
    	new  htmlWebpackPlugin(getHtmlConfig('cart', 'c购物车')),
    	new  htmlWebpackPlugin(getHtmlConfig('about', 'c关于MMall')),
    	new  htmlWebpackPlugin(getHtmlConfig('order-confirm', 'c订单确认')),
        new  htmlWebpackPlugin(getHtmlConfig('order-list', 'c订单列表')),
        new  htmlWebpackPlugin(getHtmlConfig('order-detail', 'c订单详情')),
        new  htmlWebpackPlugin(getHtmlConfig('payment', 'c订单支付')),
    ]
};
if('dev'=== WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports = config;

   

