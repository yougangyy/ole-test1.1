$().ready(function () {
    // 测试接口
    // const url = "http://test.api.ppparty.cn"
    // 正式接口
    const url = "http://api.oleip.io"

    // 声明空数组保存后台数据用于拼接url
    var list = [];

    // 获取手机ua判断手机类型
    var ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod|ios/.test(ua)) { //ios操作
        function setupWebViewJavascriptBridge(callback) {
            //ios注册方法**必须**
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }

        setupWebViewJavascriptBridge(function (bridge) {
            function getUid(data) {
                // 保存uid，发给后台
                var uid = data;
                // 调用请求函数，获取数据
                getUrlData(uid);
            }
            bridge.callHandler("callObjectiveCNativeGetCurrentUserID", null, function (responseData) {
                // 获取用户uid执行回掉，将uid带入函数内部
                getUid(responseData);
            });
        })
    } else if (/android/.test(ua)) {
        // 安卓获取用户uid方法
        var uid = OLEAndroidJSHandler.getOLEUid();
        // 调用请求函数，获取数据
        getUrlData(uid);
    }


    // 封装请求功能，用于ios和android调用
    function getUrlData(uid) {
        // 后台借口url
        var _url = url + "/olewallet/getWithdrawList"
        // 声明分页变量动态改变
        var page = 1
        // 声明请求参数做加密操作
        var _data = {
            "limit": 10,
            "uid": uid,
            "page": page
        };
        // 声明空变量用于保存字符串拼接元素，插入页面
        var str = "";
        // 加密操作
        var encryptData = encrypt(JSON.stringify(_data));
        // ajax请求
        $.ajax({
            type: "POST",
            url: _url,
            data: encryptData,
            dataType: "text",
            success: function (response) {
                // 请求成功做解码操作
                var data = decrypt(response);
                // 保存后台数据中的数组
                var newData = JSON.parse(data).data.record_list
                // for循环将state的状态转为中文
                var dataStr = `<img src="./image/record_null.png" alt="" class="dataNull">
                                <p class="textNull">暂无纪录～</p>`
                if (newData.length == 0 || newData == null) {
                    $("body").html(dataStr)
                }
                console.log(newData.length)
                for (var i = 0; i < newData.length; i++) {
                    if (newData[i].state == "pending") {
                        newData[i].state = "待处理"
                    } else if (newData[i].state == "pre_approved") {
                        newData[i].state = "预审通过"
                    } else if (newData[i].state == "approved") {
                        newData[i].state = "已批准该提币请求"
                    } else if (newData[i].state == "packaged") {
                        newData[i].state = "提币请求已打包，等待授权发到链上"
                    } else if (newData[i].state == "sent") {
                        newData[i].state = "已发送"
                    } else if (newData[i].state == "confirmed") {
                        newData[i].state = "已确认（链上的确认数已达到要求的数量）"
                    } else if (newData[i].state == "denied") {
                        newData[i].state = "管理员已拒绝该提币请求"
                    }
                    // 保存数组
                    list.push(newData[i])
                }

                // for循环把数据插入页面
                for (var i = 0; i < list.length; i++) {
                    str += `<li id=${i}>
                            <div class="li-top">
                                <span class="test">外部提现</span>
                                <p>${list[i].price} OLE</p>
                            </div>
                            <div class="li-bottom">
                                <span>${list[i].confirmedAt}</span>
                                <p>${list[i].state}</p>
                            </div>
                        </li>`
                }
                $("#ul").html(str)
                // 执行上滑加载操作
                $(".main").dropload({
                    // 可滚动区域
                    scrollArea: window,
                    // 上滑后的操作
                    loadDownFn: function (me) {
                        // 改变page的值，请求第2页数据
                        page++
                        // 请求的url
                        var _url = url + "/olewallet/getWithdrawList"
                        // 请求参数，
                        var _data = {
                            "limit": 10,
                            "uid": uid,
                            "page": page
                        };
                        // 加密操作
                        var encryptData = encrypt(JSON.stringify(_data));
                        $.ajax({
                            type: "POST",
                            url: _url,
                            data: encryptData,
                            dataType: "text",
                            success: function (response) {
                                var data = decrypt(response);
                                var newData = JSON.parse(data).data.record_list;

                                console.log(newData.length)
                                if (newData.length != 0) {
                                    for (var i = 0; i < newData.length; i++) {
                                        if (newData[i].state == "pending") {
                                            newData[i].state = "待处理"
                                        } else if (newData[i].state == "pre_approved") {
                                            newData[i].state = "预审通过"
                                        } else if (newData[i].state == "approved") {
                                            newData[i].state = "已批准该提币请求"
                                        } else if (newData[i].state == "packaged") {
                                            newData[i].state = "提币请求已打包，等待授权发到链上"
                                        } else if (newData[i].state == "sent") {
                                            newData[i].state = "已发送"
                                        } else if (newData[i].state == "confirmed") {
                                            newData[i].state = "已确认（链上的确认数已达到要求的数量）"
                                        } else if (newData[i].state == "denied") {
                                            newData[i].state = "管理员已拒绝该提币请求"
                                        }
                                        list.push(newData[i])
                                    }
                                    var str = "";
                                    for (var i = 0; i < list.length; i++) {
                                        str += `<li id=${i}>
                                                <div class="li-top">
                                                    <span class="test">外部提现</span>
                                                    <p>${list[i].price} OLE</p>
                                                </div>
                                                <div class="li-bottom">
                                                    <span>${list[i].confirmedAt}</span>
                                                    <p>${list[i].state}</p>
                                                </div>
                                            </li>`
                                    }

                                    me.noData(false);

                                } else {
                                    me.lock(); // 无数据
                                    me.noData();
                                }
                                setTimeout(function () {
                                    // 插入数据到页面，放到最后面
                                    $("#ul").html(str)
                                    // 每次数据插入，必须重置
                                    me.resetload();
                                }, 1000);
                            }
                        });

                    }

                });
            }
        });
    }


    // 点击每一项进入明细页面，将参数添加到url里，用于显示
    $("#ul").on("click", "li", function () {
        var index = $(this).attr('id')
        var state = encrypt(JSON.stringify(list[index].state));
        var url_ = "http://test.h5.oleip.io/ole1.1/details.html?confirmedAt=" + list[index].confirmedAt + "&fee=" + list[index].fee + "&price=" + list[index].price + "&state=" + state + "&txid=" + list[index].txid
        window.location.href = url_
    })
})