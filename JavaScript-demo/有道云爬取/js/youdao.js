
console.log(1111);

// $.ajax({
// 	type:"GET", //使用get方式
// 	url: "https://note.youdao.com/yws/public/notebook/e4db7a48aa494450f768da0ce6e733f8/subdir/WEB3fdd8aaf65743f42de7c903e0884e818", //json文件相对于这个HTML的路径
// 	dataType:"text",
// 	success:function(data) {
//      console.log(11112);
// 		console.log(data)
// 	},
// 	error:function() {
// 		alert("请求失败");
// 	}
// });

console.log(1111);

// $(document).ready(function(){
//     var htmlobj=$.ajax({url:"https://note.youdao.com/yws/public/notebook/e4db7a48aa494450f768da0ce6e733f8/subdir/WEB3fdd8aaf65743f42de7c903e0884e818",async:true});
//     console.log(11);

//     console.log(typeof htmlobj);

//     console.log(htmlobj.toString);

//     // for (let index = 0; index < htmlobj.length; index++) {
//     //     console.log(htmlobj[index]);
        
//     // }
// });


// t = ``;
// $.ajax({
//     type: "GET",
//     url: "https://note.youdao.com/yws/api/personal/file/WEB3fdd8aaf65743f42de7c903e0884e818?all=true&f=true&len=30&sort=1&isReverse=false&method=listPageByParentId&_system=windows&_screenWidth=1536&_screenHeight=864&_appName=ynote&_appuser=0123456789abcdeffedcba9876543210&_vendor=official-website&_launch=7&_firstTime=yyyy/12/Th%2016:55:59&_deviceId=0123456789abcdef&keyfrom=web&cstk=MkT0LDgG&sev=j1",
//     dataType: "jsonp",
//     success: function (json) {
//         // for (var i = 0; i < json.length; i++) {
//         //     title = json[i].title.rendered;
//         //     link = json[i].link;
//         //     time = new Date(json[i].date).Format("yyyy-MM-dd");
//         //     t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
//         //     $('.archive-list').html(t);
//         // }
//         console.log(json);
//         console.log(111);
//     },
//     error:function() {
//         alert("请求失败");
//     }
// })



// var url = "https://note.youdao.com/yws/public/notebook/e4db7a48aa494450f768da0ce6e733f8/getPath/WEB3fdd8aaf65743f42de7c903e0884e818"; //注意：这里这个 ? 就是问号，其他的不正确
// $.getJSON(url,function(result) {
//     console.log(result);
// });





// $.ajax({
//     url: "https://note.youdao.com/yws/public/notebook/e4db7a48aa494450f768da0ce6e733f8/getPath/WEB3fdd8aaf65743f42de7c903e0884e818",
//     type: "GET",
//     dataType: "JSON",
//   //  headers: {
//     'Access-Control-Allow-Origin':'*',
//   // },
//     success: function (result) {
//         write(result.hitokoto);
//     },
//     error: function () {
//        // write("Error...");
//     }
// });




// var url='https://note.youdao.com/yws/public/notebook/e4db7a48aa494450f768da0ce6e733f8/getPath/WEB3fdd8aaf65743f42de7c903e0884e818';
//    $.ajax({
//      url:url,
//      dataType:'jsonp',
//      processData: false, 
//      type:'get',
//      success:function(data){
//        alert(data);
//      },
//      error:function(XMLHttpRequest, textStatus, errorThrown) {
//        alert(XMLHttpRequest.status);
//        alert(XMLHttpRequest.readyState);
//        alert(textStatus);
//      }});




// var url="https://note.youdao.com/yws/public/notebook/e4db7a48aa494450f768da0ce6e733f8/getPath/WEB3fdd8aaf65743f42de7c903e0884e818";
// $.ajax({
//   "url": url,
//   "success": function(data) {
//       console.log(111);
//     $("#current-group").text("当前工作组:"+data.result.name);
//   },
//   "error": function(d,msg) {
//     alert("Could not find user "+msg);
//   }
// });


// $.ajax({
//     url:"https://note.youdao.com/yws/public/notebook/e4db7a48aa494450f768da0ce6e733f8/getPath/WEB3fdd8aaf65743f42de7c903e0884e818",
//     type:"post",
//     dataType:"json",
//     success:function(data){
//         alert("success");
//     }
// }); 

console.log(222);
var href = "http://101.200.129.100";


// $.ajax({
//     type: "GET",
//     url: href,
//     dataType:'html',
//     success: function(data) {
//         console.log(data);
//     }
// });



$.ajax({
    url: href,
    type: "POST",
   // data: JSON.stringify(data),
    dataType: 'jsonp',  //必须写
    crossDomain: true,  //必须写
    headers: {
        'Access-Control-Allow-Origin': '*' //加头部
    },
    contentType: "application/json",
    success: function(data) {
        alert('ok');
    }
});


// makeCorsRequest(href);

// ///根据url发送请求
// ///url: 请求路径
// function makeCorsRequest(url, callbackFunction) {
//     var xmlHttp = new XMLHttpRequest();
//     //设置跨域访问请求对象
//     if ("withCredentials" in xmlHttp) {
//         // "withCredentials"属性是XMLHTTPRequest2中独有的
//         xmlHttp.open('GET', url, true);
//     } else if (typeof XDomainRequest != "undefined") {
//         // 检测是否XDomainRequest可用
//         xmlHttp = new XDomainRequest();
//         xmlHttp.open('GET', url);
//     } else {
//         alert('抱歉，不支持CORS');
//         return;
//     }
 
//     //设置计时器，防止超时
//     var timedout = false;
//     var timer = setTimeout(function () {
//         timedout = true;
//         xmlHttp.abort();
//     }, 5000);
 
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState != 4) { return; }
//         if (timedout) { return; }
//         clearTimeout(timer);
//         if (xmlHttp.status === 200) {
//             callbackFunction(xmlHttp.responseText);
//         }
//         if (xmlHttp.status === 404) {
//             alert("路径请求错误");
//         }
//     };
 
//     xmlHttp.onerror = function () {
//         alert('抱歉，请求错误');
//     };
 
//     xmlHttp.send();

// }