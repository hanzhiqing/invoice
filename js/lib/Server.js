var Server = function() {};
Server.prototype = function() {
    var _getInvoice = function(data) {
        // 向后台发送请求获取发票信息
        $.ajax({
            url: 'https://github.com/hanzhiqing/invoice/result.json',
            // url: 'http://yl.elion.com.cn/invoice/app/query',
            type: 'get',
            dataType: 'json',
            // dataType: 'jsonp',
            // data: { "content": data.content },
            success: function(result) {
                try {
                    if (JSON.stringify(result.data.ReplyKey).indexOf(data.content) == -1) {
                        result = {
                            data: {
                                ReplyKey: "您好，您输入的信息在公司列表中没有明确的对应项，请您输入公司更完整的名称试试。"
                            }
                        }
                    }

                    if ($.isFunction(data.callback)) {
                        data.callback(result);
                    }

                /*
                    改之前，直接调接口写法
                    if ($.isFunction(data.callback)) {
                        data.callback(result);
                    }
                */
                } catch (error) {
                    console.error(error);
                }
            },
        });
    };
    return {
        getInvoice: _getInvoice, // 获取发票信息
    };
}();