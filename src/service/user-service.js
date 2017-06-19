var _mm=require('util/mm.js');
var _user={
	//用户登出功能
	logout:function(resolve,reject){
		_mm.request({
			url		:_mm.getServerUrl('/user/logout.do'),
			method	:'POST',
			success	:resolve,
			error	:reject
		});
	},
	//检验用户登录情况
	checkLogin:function(resolve,reject){
		_mm.request({
			url		:_mm.getServerUrl('/user/get_user_info.do'),
			method	:'POST',
			success	:resolve,
			error	:reject
		});
	}
}
module.exports=_user;
