
import './jquery-3.6.0.js'

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

export const post = (url, param, fn) => {
    $.ajax({
        url: url,
        dataType:"json",
        type:"POST",
        data: param,
        success: fn
    })
}

export const put = (url, param, fn) => {
    param._method = "PUT"
    $.ajax({
        url: url,
        dataType:"json",
        type:"POST",
        data: param,
        success: fn
    })
}

export const del = (url, param, fn) => {
    param._method = "DELETE"
    $.ajax({
        url: url,
        dataType:"json",
        type:"POST",
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

 
