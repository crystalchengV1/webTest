require('./index.css');
var _mm=require('util/mm.js');
var templateIndex=require('./index.string');
//通用侧边导航
var navSide={
	option:{
		name:'',
		navList:[
			{name:'user-center',desc:'个人中心',href:'./user-center.html'},
			{name:'user-list',desc:'我的订单',href:'./user-list.html'},
			{name:'pass-update',desc:'修改密码',href:'./user-pass-reset.html'},
			{name:'about',desc:'关于TaoBao',href:'./about.html'}
		]
	 },
	init : function(option){
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav : function(){
        // 计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
         // 渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
      }
};
module.exports =navSide;
