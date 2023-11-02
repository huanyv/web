$(function () {
    $.get("https://v1.hitokoto.cn/", function (msg) {
        var arr = new Array();
        arr[0] = msg.hitokoto;
        var typed = new Typed("#subtitle", {
            strings: arr,
            startDelay: 300,
            typeSpeed: 100,
            loop: true,
            backSpeed: 50,
            showCursor: true
        });
    }, "json")

    $("#home").show();
    $("#notes,#about").hide();

    /*内容切换*/
    $("#subMenuHome").click(function () {
        $("#home").fadeIn("500");
        $("#notes,#about").fadeOut("500");
    })
    $("#subMenuNotes").click(function () {
        $("#notes").fadeIn("500");
        $("#home,#about").fadeOut("500");
    })
    $("#subMenuAbout").click(function () {
        $("#about").fadeIn("500");
        $("#notes,#home").fadeOut("500");
    })

    var pageNo = 1;
    var pageSize = 10;

    /*分页函数*/
    function page(no, size, json) {

        var pageTotalCount = json.length;
        var pageTotal = pageTotalCount / pageSize;
        if (pageTotalCount % pageSize != 0) {
            pageTotal++;
        }
        json.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        })
        var pageJson = [];
        var beign = (no - 1) * size;
        var end = beign + size;
        var j = 0;
        for (var i = beign; i < end; i++) {
            pageJson[j] = json[i];
            j++
        } j = 0;

        // console.log(pageJson);

        var html = "";
        for (var i = 0; i < pageJson.length; i++) {
            if (pageJson[i] != undefined) {
                html += "<li>";
                html += "<a href=\"" + pageJson[i].url + "\" target=\"_blank\" id=\"title\">" + pageJson[i].title + "</a>";
                html += "<span>\/" + pageJson[i].date + "</span>";
                html += "</li>";
            }
        }
        $("#list").html(html);
    }

    /* 获取内容*/
    $.get("../notes/notes.json", function (msg) {
        page(pageNo, pageSize, msg);
    }, "json")


    $("#next").on("click", function () {
        $.get("../notes/notes.json", function (msg) {
            var pageTotalCount = msg.length;
            var pageTotal = pageTotalCount / pageSize;
            pageTotal = Math.floor(pageTotal);
            if (pageTotalCount % pageSize != 0) {
                pageTotal++;
            }

            if (pageNo < pageTotal) {
                pageNo++;
                page(pageNo, pageSize, msg);
            }

        })
    });

    $("#last").on("click", function () {
        if (pageNo > 1) {
            pageNo--;
            $.get("../notes/notes.json", function (msg) {
                page(pageNo, pageSize, msg);
            })
        }
    });


    $("#next>img").hide();
    $("#last>img").hide();

    $("#next").on("mouseover", function () {
        $.get("../notes/notes.json", function (msg) {
            var pageTotalCount = msg.length;
            var pageTotal = pageTotalCount / pageSize;
            pageTotal = Math.floor(pageTotal);
            if (pageTotalCount % pageSize != 0) {
                pageTotal++;
            }

            if (pageNo < pageTotal) {
                $("#next>img").show();
            } else {
                $("#next>img").hide();
            }

        })

    })

    $("#last").on("mouseover", function () {
        if (pageNo > 1) {
            $("#last>img").show();
        }
    })

    $("#next").on("mouseout", function () {
        $("#next>img").hide();
    })

    $("#last").on("mouseout", function () {
        $("#last>img").hide();
    })

})