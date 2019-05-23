$().ready(function(){


// 测试接口
// const url = "http://test.api.ppparty.cn"
// 正式接口
const url = "http://api.oleip.io"



function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
var invite_code=getUrlParam("invite_code");
$(".code-text").html(invite_code)


//点击x让输入框内容清空
$(".clear").on("click", function () {
    $(".phone-text").val("")
})

// 失去焦点时判断手机号是否输入正确
$(".phone-text").on("blur", function () {
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($(".phone-text").val()))) {
        $(".error").css("display", "block")
        $(".carrier").html("请正确填写手机号!")
        styleCss()
        // 3秒后提示框消失
        setTimeout(function () {
            $(".error").css("display", "none")
        }, 3000)
        console.log("请正确填写手机号！")
        return false;
    }
})

var imgs = [ //定义数组用来存储图片的路径
    './image/register_noeyes.png',
    './image/register_eyes.png'
];
var index = 0; //设置第一张图片的索引值为0
var len = imgs.length; //获取存储图片数组的长度
$('.password-eyes').on('click', function () { //绑定点击事件
    if (index === 1) {
        index = 0; //如果index的值小于0，使index为0
        $(".password-text").attr('type', "password");
    } else {
        index = 1; //如果index大于了数组长度 ，使index等于1
        $(".password-text").attr('type', "");
    }
    $('.password-eyes').attr('src', imgs[index]); //动态改变图片的路径
});




// 设置开关，规定60秒内用户只能点击一次
var show = true;
// 点击按钮获取验证码
$(".obtain").on("click", function () {
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($(".phone-text").val()))) {
        $(".error").css("display", "block")
        $(".carrier").html("请正确填写手机号!")
        styleCss()
        // 3秒后提示框消失
        setTimeout(function () {
            $(".error").css("display", "none")
        }, 3000)
        return false;
    } else {
        // 规定时长
        var showTime = 60;
        // 判断用户是否可以点击获取验证码
        if (show === true) {
            var _url = url + "/h5user/sendPhoneV2"
            var phoneId = $(".phone-text").val()
            var data_ = {
                "phone": phoneId,
                "type": 1,
            }
            var encryptData = encrypt(JSON.stringify(data_));
            $.ajax({
                type: "POST",
                url: _url,
                data: encryptData,
                cache: false,
                async: false,
                dataType: "text",
                success: function (data) {
                    var decryptData = decrypt(data)
                    var newData = JSON.parse(decryptData)
                    if (newData.code == 0) {
                        // 关闭开关，让用户无法点击
                        show = false;
                        $(".obtain").html(showTime + "秒后重试")
                        // 改变按钮内容成倒计时
                        var timer = setInterval(function () {
                            if (showTime != 0) {
                                showTime--
                                $(".obtain").html(showTime + "秒后重试")
                            } else {
                                show = true
                                $(".obtain").html("获取验证码")
                                clearInterval(timer);
                            }
                        }, 1000)    
                    }
                    $(".carrier").html(newData.msg)
                    $(".error").css("display", "block")
                    styleCss()
                    setTimeout(function () {
                        $(".error").css("display", "none")
                    }, 3000)
                }

            });


        }
    }
})

// 点击注册
$(".register-button").on("click", function () {
    var verificationId = $(".verification-text").val()
    var phoneId = $(".phone-text").val()
    var passId = $(".password-text").val()
    var codeId = $(".code-text").html()
    console.log(passId.length)
    // 判断用户信息是否填写完整
    if (phoneId === "" || verificationId === "" || passId.length < 6) {
        $(".carrier").html("请填写完整！")
        $(".error").css("display", "block")
        styleCss()
        setTimeout(function () {
            $(".error").css("display", "none")
        }, 3000)
    } else {
        // var uid=getUrlParam("uid");
        // function getUrlParam(name) {
        //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        //     var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        //     if (r != null) return unescape(r[2]); return null; //返回参数值
        // }
        var _url = url + "/h5user/userRegisterV2"
        var _data = {
            "account": phoneId,
            "password": passId,
            "code": verificationId,
            "invite_code": codeId,
        }
        var encryptKey = "abcdefgabcdefg12";
        var encryptData = encrypt(JSON.stringify(_data));
        $.ajax({
            type: "POST",
            url: _url,
            data: encryptData,
            cache: false,
            async: false,
            dataType: "text",
            success: function (data) {
                var decryptData = decrypt(data)
                var newData = JSON.parse(decryptData)

                $(".carrier").html(newData.msg)
                $(".error").css("display", "block")
                styleCss()
                setTimeout(function () {
                    $(".error").css("display", "none")
                }, 3000)
                if(newData.code == 0){
                    window.location.href="https://download.oleip.io"
                }
            }
        });
    };
})

})


$(".download-click").on("click", function () {
    window.location.href="https://download.oleip.io"
})