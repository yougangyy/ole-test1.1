$().ready(function () {

    // 测试接口
    // const url = "http://test.api.ppparty.cn"
    // 正式接口
    const url = "http://api.oleip.io"

    var ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod|ios/.test(ua)) {
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
                var uid = data;
                var _data = {
                    "uid": uid,
                };
                var _url = url + "/spread/getInvitePermission"
                // 加密操作
                var encryptData = encrypt(JSON.stringify(_data));
                $.ajax({
                    type: "POST",
                    url: _url,
                    data: encryptData,
                    dataType: "text",
                    success: function (response) {
                        var data = decrypt(response);
                        var newData = JSON.parse(data).data.invite_image;
                        $("#images").attr("src",newData);
                        $(".copy").on("click", function () {
                            bridge.callHandler('callObjectiveCNativeShareMethod', {
                                    // 分享 URL
                                    "shareURL": "",
                                    // 分享的 URL 是否需要拼接 UID, 1 : 需要, 0 : 不需要
                                    "needAppendUID": "0",
                                    // 分享内容
                                    "content": "",
                                    // 是否需要将分享 URL 拼接到分享内容上, 1 : 需要, 0 : 不需要
                                    "shareURLAppendToContent": "0",
                                    // 分享标题
                                    "title": "",
                                    // 分享的网络图片 URL
                                    "imageURL": newData,
                                    // 分享内容的类型, 也就是分享到其他应用之后的类型, 下面会详细列出都有哪些类型
                                    "shareContentType": "2",
                                    // 需要的分享平台类型 list, value 传 json 字符串, 可支持的分享平台下面会详细列出
                                    "platformsType": '["1", "2"]'
                                },
                                function responseCallback(responseData) {
                                    console.log("JS received response:", responseData)
                                })
                        })
                    }
                });

            }

            bridge.callHandler("callObjectiveCNativeGetCurrentUserID", null, function (responseData) {
                // 获取用户uid执行回掉，将uid带入函数内部
                getUid(responseData);
            });


        })
    } else if (/android/.test(ua)) {
        // 安卓获取用户uid
        var uid = OLEAndroidJSHandler.getOLEUid();
        var _data = {
            "uid": uid,
        };
        var _url = url + "/spread/getInvitePermission"
        // 加密操作
        var encryptData = encrypt(JSON.stringify(_data));
        $.ajax({
            type: "POST",
            url: _url,
            data: encryptData,
            dataType: "text",
            success: function (response) {
                var data = decrypt(response);
                var newData = JSON.parse(data).data.invite_image;
                $("#images").attr("src",newData);
                $(".copy").on("click", function () {
                    OLEAndroidJSHandler.showShare("","","",newData,2); //调取安卓分享接口
                })
            }
        });

    }



})