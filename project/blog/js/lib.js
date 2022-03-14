
// 获取请求参数
function getRequestParam(key) {
    var paramList = window.location.search.substring(1).split("&");
    for (var i = 0; i < paramList.length; i++) {
        var param = paramList[i].split("=");
        if(param[0] == key) {
            return param[1];
        }
    }
    return false;
}