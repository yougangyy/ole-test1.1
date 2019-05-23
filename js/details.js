$().ready(function () {


    // 点击按钮复制内容
    var copyCode = new ClipboardJS('#buttonCodde')
    copyCode.on("success", function (e) {
        console.log("复制成功")

        e.clearSelection();
    })

    copyCode.on("error", function (e) {
        console.log("复制失败")
    })

    // getUrlParam获取url里的参数数据
    // 提现金额变量
    var price = getUrlParam("price")
    // 链上txid变量
    var txid = getUrlParam("txid")
    // 手续费变量
    var fee = getUrlParam("fee")
    // 确认时间变量
    var confirmedAt = getUrlParam("confirmedAt")
    // 提现状态
    var state = JSON.parse(decrypt(getUrlParam("state")))


    if (state != "null" && state != null && state != "") {
        $(".main-state").html(state)
    }

    if (confirmedAt != "null" && confirmedAt != null && confirmedAt != "") {
        $(".main-time").html(confirmedAt)
    }

    if (fee != "null" && fee != null && fee != "") {
        $(".main-service").html(fee + "OLE")
    }

    if (price != "null" && price != null && price != "") {
        $(".main-price").html(price + " OLE")
    }

    if (txid != "null" && txid != null && txid != "") {
        $(".textCode").html(txid + '<button id="buttonCodde" data-clipboard-action = "copy"  data-clipboard-target =  ".textCode"></button>')
    }
})