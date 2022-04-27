let baseUrl = "https://"

export const get = (url, param, fn) => {
    $.ajax({
        url: url,
        dataType:"json",
        type:"get",
        data: param,
        success: fn
    })
}
    
$(document).ajaxSend(function(e,xhr,opt){
    // console.log(e);
    // console.log(xhr);
    // console.log(opt);
    opt.url = baseUrl + opt.url
});

 
