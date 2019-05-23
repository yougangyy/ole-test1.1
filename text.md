时间戳转时间
function DateToTime(unixTime, type = "Y-M-D H:i:s") {
        var date = new Date(unixTime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var datetime = "";
        datetime += date.getFullYear() + type.substring(1, 2);
        datetime += (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + type.substring(3, 4);
        datetime += (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        if (type.substring(5, 6)) {
            if (type.substring(5, 6).charCodeAt() > 255) {
                datetime += type.substring(5, 6);
                if (type.substring(7, 8)) {
                    datetime += " " + (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
                    if (type.substring(9, 10)) {
                        datetime += type.substring(8, 9) + (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
                        if (type.substring(11, 12)) {
                            datetime += type.substring(10, 11) + (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                        };
                    };
                };
            } else {
                datetime += " " + (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
                if (type.substring(8, 9)) {
                    datetime += type.substring(7, 8) + (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
                    if (type.substring(10, 11)) {
                        datetime += type.substring(9, 10) + (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                    };
                };
            };
        };
        return datetime;
    }
调用方法
DateToTime(1554211055, "Y.m.d");


jquery监听滚动条事件上拉加载更多
// var totalHeight = $(document).height(); //整个文档高度
            // var seeHeight = $(window).height(); //浏览器可视窗口高度
            // var thisBodyHeight = $(document.body).height(); //浏览器当前窗口文档body的高度
            // var totalBodyHeight = $(document.body).outerHeight(true); //浏览器当前窗口文档body的总高度 包括border padding margin
            // var thisWidth = $(window).width(); //浏览器当前窗口可视区域宽度
            // var thisDocumentWidth = $(document).width(); //浏览器当前窗口文档对象宽度
            // var thisBodyWidth = $(document.body).width(); //浏览器当前窗口文档body的宽度
            // var totalBodyWidth = $(document.body).outerWidth(true); //浏览器当前窗口文档body的总宽度 包括border padding margin
            // var scrollTop = $(window).scrollTop(); //浏览器可视窗口顶端距离网页顶端的高度（垂直偏移）
            // // console.log(totalHeight,seeHeight,thisBodyHeight,totalBodyHeight,thisWidth,thisDocumentWidth,thisBodyWidth,totalBodyWidth,scrollTop);
            // //添加滚动事件
            // var clear = $(window).scroll(function () {
            //     scrollTop = $(window).scrollTop();
            //     totalHeight = $(document).height();
            //     // console.log(scrollTop,seeHeight,totalHeight)
            //     if (scrollTop + seeHeight + 50 > totalHeight) {
            //             page++
            //             var _url = url + "/olewallet/getWithdrawList"
            //             var _data = {
            //                 "limit": 10,
            //                 "uid": 6666021,
            //                 "page": page
            //             };
            //             // 加密操作
            //             var encryptData = encrypt(JSON.stringify(_data));
            //             $.ajax({
            //                 type: "POST",
            //                 url: _url,
            //                 data: encryptData,
            //                 dataType: "text",
            //                 success: function (response) {
            //                     var data = decrypt(response);
            //                     var newData = JSON.parse(data).data.record_list;
            //                     console.log(newData.length)
            //                     if (newData.length != 0) {
            //                     for (var i = 0; i < newData.length; i++) {
            //                         if (newData[i].state == "pending") {
            //                             newData[i].state = "待处理"
            //                         } else if (newData[i].state == "pre_approved") {
            //                             newData[i].state = "预审通过"
            //                         } else if (newData[i].state == "approved") {
            //                             newData[i].state = "已批准该提币请求"
            //                         } else if (newData[i].state == "packaged") {
            //                             newData[i].state = "提币请求已打包，等待授权发到链上"
            //                         } else if (newData[i].state == "sent") {
            //                             newData[i].state = "已发送"
            //                         } else if (newData[i].state == "confirmed") {
            //                             newData[i].state = "已确认（链上的确认数已达到要求的数量）"
            //                         } else if (newData[i].state == "denied") {
            //                             newData[i].state = "管理员已拒绝该提币请求"
            //                         }
            //                         list.push(newData[i])
            //                     }
            //                     console.log(list)
            //                     var str = "";
            //                     for (var i = 0; i < list.length; i++) {
            //                         str += `<li>
            //                                     <div class="li-top">
            //                                         <span>外部提现</span>
            //                                         <p>${list[i].price} OLE</p>
            //                                     </div>
            //                                     <div class="li-bottom">
            //                                         <span>${list[i].confirmedAt}</span>
            //                                         <p>${list[i].state}</p>
            //                                     </div>
            //                                 </li>`
            //                     }

            //                     // str+=`<p class="noTime">无更多记录~</p>`
            //                     $("#ul").html(str)

            //                 } else {
            //                     // console.log(list)
            //                     // var str = "";
            //                     // for (var i = 0; i < list.length; i++) {
            //                     //     str += `<li>
            //                     //                 <div class="li-top">
            //                     //                     <span>外部提现</span>
            //                     //                     <p>${list[i].price} OLE</p>
            //                     //                 </div>
            //                     //                 <div class="li-bottom">
            //                     //                     <span>${list[i].confirmedAt}</span>
            //                     //                     <p>${list[i].state}</p>
            //                     //                 </div>
            //                     //             </li>`
            //                     // }

            //                     // str+=`<p class="noTime">无更多记录~</p>`
            //                     // $("#ul").html(str)
            //                     $(window).unbind( "scroll" )
            //                 }
            //                 }
            //             });


            //     }
            // })