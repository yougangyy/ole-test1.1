$().ready(function () {
    // 测试接口
    // const url = "http://test.api.ppparty.cn"
    // 正式接口
    const url = "http://api.oleip.io"
    var _url = url + "/spread/getSpreadInfoV2"
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
                var uid = data;
                getUrlData(uid);
            }
            bridge.callHandler("callObjectiveCNativeGetCurrentUserID", null, function (responseData) {
                // 获取用户uid执行回掉，将uid带入函数内部
                getUid(responseData);
            });
        })
    } else if (/android/.test(ua)) {
        var uid = OLEAndroidJSHandler.getOLEUid();
        getUrlData(uid)
    }

    


    $(".header-box").on("click", ".rule", function () {
        // document.body.addEventListener('touchmove', function (e) {
        //     e.preventDefault(); 
        // }, {passive: false}); 
        // $(".rule").html($('body').offset().top)
        $(".frame").css("display", "block")
        $(".mask").css("display", "block")
    })


    $(".close").on("click", function () {
        $(".frame").css("display", "none")
        $(".mask").css("display", "none")
        // window.location.reload()
        
    })

    $(".mask").on("click", function () {
        $(".frame").css("display", "none")
        $(".mask").css("display", "none")
        // window.location.reload()
        
    })

    function getUrlData(uid) {
        // 6666020 天使 ， 6666019 1星 ，6666032 2星 ，6666026 普通 ，6666029 三星
        var _data = {
            "limit": 1000,
            "uid": uid,
            "page": 1
        };
        // 加密操作
        var encryptKey = "abcdefgabcdefg12";
        var encryptData = encrypt(JSON.stringify(_data));
        $.ajax({
            type: "POST",
            url: _url,
            data: encryptData,
            dataType: "text",
            success: function (response) {
                // 解密操作
                var data = decrypt(response);
                var newData = JSON.parse(data).data;
                console.log(newData)
                console.log(newData)
                var bodyOne = `<span class="title">类别</span>`
                var bodyTwo = `<span class="title">昵称</span>`
                var bodyThree = `<span class="title">累计收益</span>`
                var bodyFour = `<span class="title">邀请人</span>`
                var grade0 = `<div class="grade-0">
                            <div class="grade-left">
                                <div class="grade-text">普通矿工</div>
                                <div class="grade-speed">
                                    <div class="grade-img"><img src="./image/myTeam_v1-0.png" alt=""></div>
                                    <p><b class="speed"></b></p>
                                    <div class="grade-img"><img src="./image/myTeam_v2-0.png" alt=""></div>
                                </div>
                                <div class="grade-grow">矿工成长值 <span class="grade0-min">0</span>/<span class="grade0-max">0</span>
                                </div>
                            </div>
                            <div class="grade-right">
                                <span class="rule">活动规则</span>
                            </div>
                         </div>`
                var grade1 = `<div class="grade-1">
                            <div class="header-boxTop">
                                <span class="grade1-grade"></span>
                                <i class="rule">活动规则</i>
                            </div>
                            <img src="./image/myTeam_star1.png" alt="" class="star">
                            <div class="header-boxStrip">
                                <span><img src="./image/myTeam_v1-1.png" alt="" class="grade1-leftImg"></span>
                                <p><b class="speed"></b></p>
                                <span><img src="./image/myTeam_v2-1.png" alt="" class="grade1-rightImg"></span>
                            </div>
                            <span class="header-boxSpeed">成长值 <span class="grade1-min">0</span>/<span
                                    class="grade1-max">0</span></span>
                        </div>`
                var grade3 = `<div class="grade-3">
                                <div class="grade3-boxTop">
                                    <span class="grade3-grade">三星会员</span>
                                    <i class="rule">活动规则</i>
                                </div>
                                <img src="./image/myTeam_star3.png" alt="" class="grade3-star">
                                <span class="grade3-team">团队累计挖矿金额</span>
                                <p><b class="speed"></b></p>
                                <span class="grade3-boxspeed">挖矿总投入&nbsp;<span class="grade3-min"></span>/<span
                                class="grade3-max"></span>&nbsp;OLE</span>
                                <div class="grade3-progress">
                                    <img src="./image/myTeam_upgrade3.png" alt="">
                                    <span class="grade-differ"></span>
                                </div>
                            </div>`
                var grade4 = `<div class="grade-4">
                            <div class="angel-boxTop">
                                <span class="angel-grade">天使会员</span>
                                <i class="rule">活动规则</i>
                            </div>
                            <img src="./image/myTeam_star4.png" alt="" class="angel">
                            <p>天使矿工将享有最大的推荐奖励！</p>
                        </div>`
                if (newData.parent_info.account == "") {
                    $(".header-title").html("我的推荐人:" + newData.parent_info.nick)
                } else {
                    $(".header-title").html("我的推荐人:" + newData.parent_info.nick + "（" + newData.parent_info.account + "）")
                }
                

                if (newData.is_angel == 1) {
                    $(".header-title").html("")
                    $(".header-box").html(grade4)
                    $(".header-box").css("background", "url('./image/myTeam_back4.png') no-repeat center / 100% 100%")
                } else {
                    if (newData.grade_info.vip_level == 0) {
                        $(".header-box").html(grade0)
                        $(".grade0-min").html(newData.grade_info.now_grade)
                        $(".grade0-max").html(newData.grade_info.max_grade)
                        $(".header-box").css("background", "url('./image/myTeam_back0.png')  no-repeat center /100% 100%")
                    } else if (newData.grade_info.vip_level == 1) {
                        $(".header-box").html(grade1)
                        $(".grade1-min").html(newData.grade_info.now_grade)
                        $(".grade1-max").html(newData.grade_info.max_grade)
                        $(".grade1-grade").html(newData.grade_info.vip_content)
                        $(".header-box").css("background", "url('./image/myTeam_back1.png')  no-repeat center /100% 100%")
                    } else if (newData.grade_info.vip_level == 2) {
                        $(".header-box").html(grade1)
                        $(".grade1-min").html(newData.grade_info.now_grade)
                        $(".grade1-max").html(newData.grade_info.max_grade)
                        $(".grade1-grade").html(newData.grade_info.vip_content)
                        $(".header-box").css("background", "url('./image/myTeam_back2.png')  no-repeat center /100% 100%")
                        $(".grade1-grade").css("background", "url('./image/myTeam_trim2.png')  no-repeat center /100% 100%")
                        $(".grade1-grade").css("color", "#835B1C")
                        $(".rule").css("color", "#835B1C")
                        $(".grade1-leftImg").attr("src", "./image/myTeam_v1-2.png")
                        $(".grade1-rightImg").attr("src", "./image/myTeam_v2-2.png")
                        $(".star").attr("src", "./image/myTeam_star2.png")
                    } else if (newData.grade_info.vip_level == 3) {
                        $(".header-box").html(grade3)
                        $(".header-box").css("background", "url('./image/myTeam_back3.png')  no-repeat center /100% 100%")
                        $(".header-box").css("height", "3.01rem")
                        $(".grade3-min").html(toThousands(newData.grade_info.childer_olenum))
                        $(".grade3-max").html(toThousands(newData.grade_info.max_grade))
                        $(".grade3-grade").html(newData.grade_info.vip_content)
                        var disparity = toThousands(newData.grade_info.max_grade - newData.grade_info.childer_olenum)
                        $(".grade-differ").html("还差" + disparity + "成长值，即可升级天使会员！")
                    }
                }


                $(".all_num").html(newData.num.all_profit)
                $(".from_num").html(newData.num.all_num)
                $(".indirect_num").html(newData.num.from_num)
                var angelAll = newData.num.indirect_num + newData.num.indirect_two + newData.num.angel_num
                $(".angel_num").html(angelAll)
                var dataList = newData.list
                for (var i = 0; i < dataList.length; i++) {
                    if (dataList[i].type == 1) {
                        bodyOne += `<span>直接推荐</span>`
                    } else if (dataList[i].type >= 2) {
                        bodyOne += `<span>团队推荐</span>`
                    }
                    bodyTwo += `<span>${dataList[i].nick}</span>`
                    bodyThree += `<span>${dataList[i].sum_profit}</span>`
                    bodyFour += `<span>${dataList[i].from_user}</span>`

                }

                bodyThree += `<p>没有更多了～</p>`

                $(".main-bodyOne").html(bodyOne)
                $(".main-bodyTwo").html(bodyTwo)
                $(".main-bodyThree").html(bodyThree)
                $(".main-bodyFour").html(bodyFour)

                var speedWidth = 0;
                if (newData.grade_info.now_grade <= newData.grade_info.min_grade) {
                    speedWidth = 0;
                } else {
                    speedWidth = (newData.grade_info.now_grade - newData.grade_info.min_grade) / (newData.grade_info.max_grade - newData.grade_info.min_grade) * 100 + "%";
                }
                $(".speed").css("width", speedWidth);
            }
        });
    }
})