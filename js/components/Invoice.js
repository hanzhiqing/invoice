/**
 * Invoice.js  发票助手功能模块
 * 功能：
 */

var Invoice = function() {};

Invoice.prototype = function() {

    var _createInvoice_list = function() {
        // 加载公告列表页dom
        var requestParam = {
            content: $(".search-text").val(),
            callback: function(response) {
                var data = response.data.ReplyKey;
                if (data && data.indexOf('输入') > 0) {
                    var item = "<p style='padding: 15px;color: red;background: #fff;font-size: 15px;'>" + data.replace("<br/>", "") + "</p>";
                    $('#search_result').html(item);
                } else {
                    var item = "<ul>" + data.replace(/\n\n/g, "<br/>").replace(/<br\/><br\/>/g, "<br/>") + "</ul>" + "<div class='btnCon'><button class='copyBtn'  data-clipboard-text='"+data.replace(/<br\/>/g, "")+"'>复制信息</button></div>";
                }
                //$(".list_loading").hide();
                $('#search_result').html(item);
                mui.init({
                    swipeBack: true //启用右滑关闭功能
                });
                //复制代码
                var clipboard = new Clipboard('.copyBtn');
                clipboard.on('success', function(e) {
                    e.clearSelection();
                });
                clipboard.on('error', function(e) {
                    alert('请选择“拷贝”进行复制!')
                });

            }

        };
        // 获取公告列表服务
        SERVER.getInvoice(requestParam);
        
    };

    

    var _bindEvent = function() {
        $(".search-btn").bind("click", function(e) {
            e.preventDefault();
            if ($(".search-text").val()) {
                _createInvoice_list();
            } else {
                alert("关键字不能为空！");
            }
        });
    };


    return {
        init: function() {
            console.info("发票助手功能类初始化开始");
            _bindEvent();
        }
    };
}();