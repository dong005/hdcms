//显示左侧栏目列表
$(function () {
    //点击+图标，添加文章
    $("span.file").live("click", function () {
//        $("[name='content']").attr("src", $(this).find("a").attr("href"));
//        $(this).find("a").eq(0).trigger("click");
        window.open($(this).find("a").attr("href"));
    })
    //收缩
    $("div.hitarea,span.folder").live("click", function () {
        var _hidden = $(this).siblings("ul:hidden").length;
        if (_hidden) {
            $(this).parent("li").removeClass("close").addClass("open");
        } else {
            $(this).parent("li").removeClass("open").addClass("close");
        }
        return false;
    })
    //展开
    $("li.cat_tree_top").live("click", function () {
        var open_obj = $("li.collapsable[class*='open']");
        var close_obj = $("li.collapsable[class*='close']");
        open_obj.each(function () {
            $(this).removeClass("open").addClass("close");
        })
        close_obj.each(function () {
            $(this).removeClass("close").addClass("open");
        })
    })
    function set_category_tree(d) {
        var h = "";
        for (var i in d) {
            var _span_class = d[i].cattype == 2 ? "folder" : "file";
            var _li_class = d[i].children ? " class='collapsable open'" : "";
            var _li_class = d[i]._end && !d[i].children && d[i].level != 1 ? " class='last'" : _li_class;
            h += '<li' + _li_class + '>';
            if (d[i].children) {
                h += '<div class="hitarea collapsable-hitarea"></div>';
            }
            //栏目url
            var cat_url = APP + "&c=Content&m=content&cid=" + d[i].cid;
            var add_con_url = APP + "&c=Content&m=add&cid=" + d[i].cid;
            h += '<span class="' + _span_class + '"><a href="' + add_con_url + '" target="_blank">' + d[i].text + '</a></span>';
            h += '<a href="' + cat_url + '">' + d[i].text + '</a>';
            //含有子栏目
            if (d[i].children) {
                h += "<ul>";
                h += set_category_tree(d[i]['children']);
                h += "</ul>";
            }
            h += "</li>";
        }
        return h;
    }
    $.ajax(
        {
            url: CONTROL + "&m=ajax_category_tree",
            dataType: "JSON",
            cache: false,
            success: function (data) {
                var h = "<li class='cat_tree_top'><div class='tree_top'></div>";
                h += "<a href='javascript:;'>展开收缩</a></li>";
                h += set_category_tree(data);
                $("#browser").html(h);
            }
        })
    $("#browser").treeview()
})