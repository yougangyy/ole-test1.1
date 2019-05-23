
var encryptKey = "abcdefgabcdefg12";
    // 加密
    function encrypt(word) {
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    //解密
    function decrypt(word) {
        if (!word) {
            return null;
        }
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }


    // 设置提示弹框位置
    function styleCss() {
        var styleLeft = ($(window).width() - $(".error").width()) / 2;
        $(".error").css("left", styleLeft)
    }

    // 设置每3位数添加逗号
    function toThousands(num) {
        var result = '',
            counter = 0;
        num = (num || 0).toString();
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result = num.charAt(i) + result;
            if (!(counter % 3) && i != 0) {
                result = ',' + result;
            }
        }
        return result;
    }

    // 获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }