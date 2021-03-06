var Hogan=require('hogan.js');
var conf={serverHost:''};
var _mm={
	request:function(param){
		var _this=this;
		$.ajax({
			type    :param.method ||'get',
			url     :param.url    || '',
			dataType:param.type   ||'json',
			data    :param.data   || '',
			success :function(res){
				if(res.status===0){
					typeof param.success==='function' && param.success(res.data,res.msg);
				}
				//没有登录状态，需要强制登录
				else if(res.status===10){
					_this.doLogin();
				}
				//请求数据错误
				else if(res.status===1){
					typeof param.error==='function' && param.error(res.msg);
				}
			},
			error:function(err){
				typeof param.error==='function' && param.error(err.statusText);
			}
		});
	},
	//获取服务器地址
	getServerUrl:function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam:function(name){
		//http://happymmall.com/product/list.do?keyword=1&page=1
		var reg=new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
		var result=window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]):null;
	},
	//渲染html
	renderHtml:function(htmlTemplate,data){
		var template=Hogan.compile(htmlTemplate);
		var result  =template.render(data);
		return result;
	},
	//成功提示
	successTips:function(msg){
		alert(msg||'操作成功');
	},
	//错误提示
	errorTips:function(msg){
		alert(msg||'哪里出错喽');
	},
	//表单验证、支持是否为空、手机、邮箱
	validate:function(value,type){
		var value=$.trim(value);
		//非空验证
		if(type==='require'){
			return !!value;
		}
		//手机号验证
		if(type==='phone'){
			return /^1\d{10}$/.test(value);
		}
		//邮箱格式验证
		if(type==='email'){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//统一登录处理
	doLogin:function(){
		window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
	},
	//返回主页
	goHome:function(){
		window.location.href='./index.html';
	}
	
};
module.exports=_mm;
