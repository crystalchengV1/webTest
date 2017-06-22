require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        listParam : {
            keyword         : _mm.getUrlParam('keyword')    || '',//关键字
            categoryId      : _mm.getUrlParam('categoryId') || '',//目录关键字搜索
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',//排序
            pageNum         : _mm.getUrlParam('pageNum')    || 1,//第几页
            pageSize        : _mm.getUrlParam('pageSize')   || 1//每页数量
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){//根据点击事件，给data-listParam传递参数
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){//如果没有显示升序，就显示升序，这里默认为升序
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);//到这里，列表全部信息已经获取，页面渲染成功
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,//是否有上一页
                prePage         : res.prePage,//上一页是哪一个
                hasNextPage     : res.hasNextPage,//是否有下一页
                nextPage        : res.nextPage,//下一页是哪一个
                pageNum         : res.pageNum,//这是第几页
                pages           : res.pages//总共几页
            });
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());//new Pagination对象
        this.pagination.render($.extend({}, pageInfo, { //调用Pagination对象的render方法
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})