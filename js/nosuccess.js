$().ready(function () {
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        var returnBtn=$(".return")
        returnBtn.click(function () {
            OLEAndroidJSHandler.finish(); //调取安卓分享接口
        })
    }else if(/iphone|ipad|ipod|ios/.test(ua)) {
        $(".return").css("display","none")
    }

})