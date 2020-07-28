/**
 * @file  docs页面脚本
 * */

(function () {

    $('.book-icon').on('click', function () {
        $('#TableOfContents').closest('aside').toggleClass('hidden');
        $('.mask').toggleClass('hidden');
        $('.book-header').hide();
        setTimeout(function () {
            $('.book-header').show();    
        }, 100);
    });
    $('.nav-mask').on('click', function () {
        $('.navbar-buttons').trigger('click');
    })

    $('.navbar-buttons').click(function () {
        $('.book-header').toggle();
    });
    var targetUrlArr = [];
    var targetUrl = [];
    $('.book-toc #TableOfContents ul a[href]').each(function () {
        targetUrlArr.push($($(this).attr('href')));
    })
    targetUrl = targetUrlArr.filter(function (item) {
        return ($(window).scrollTop() + 150) > item.offset().top;
    })
    if(targetUrl.length){
        $('.book-toc #TableOfContents ul a[href]').removeClass('book-toc-avtive');
        $("a[href='#" + targetUrl[targetUrl.length - 1].attr('id') + "']").addClass('book-toc-avtive');
    } else if($('.book-toc #TableOfContents ul a[href]').length) {
        $('.book-toc #TableOfContents ul a[href]').removeClass('book-toc-avtive');
        $('.book-toc #TableOfContents ul a[href]').eq(0).addClass('book-toc-avtive');
    }
    var cloneBookMenuHeader = $('.book-page .book-header').clone(true);

    cloneBookMenuHeader.css({
        'position': 'fixed',
        'top': '62px',
        'width': '100%',
        'z-index': '999',
        'background-color': 'white',
        'padding': '0 30px',
        'left': '0',
        'line-height': '62px'
    });
    $('#all').append(cloneBookMenuHeader);
    $('.book-page .book-header').remove();
    $($(window).scroll(function () {
        if ($('.container').innerWidth() === 1170 || $('.container').innerWidth() === 970) {
            try {
                targetUrl = targetUrlArr.filter(function (item) {
                    return ($(window).scrollTop() + 150) > item.offset().top;
                })
                if(targetUrl.length){
                    $('.book-toc #TableOfContents ul a[href]').removeClass('book-toc-avtive');
                    $("a[href='#" + targetUrl[targetUrl.length - 1].attr('id') + "']").addClass('book-toc-avtive');
                }
                if ($('.book-toc').offset().top - $(window).scrollTop() < 120) {
                    $('.book-toc nav').css({
                        'position': 'fixed',
                        'top': '126px',
                        'left': $('.markdown').offset().left + $('.markdown').innerWidth() + 30 + 'px',
                        'bottom': 'unset'
                    });
                } else {
                    $('.book-toc nav').css({
                        'position': 'static'
                    });
                }
            } catch (error) {
                console.log(error);
            }

        }
        if (($(window).innerWidth() <= 992) && $('.book-header').length === 1) {
            try {
                var cloneBookMenuHeader = $('.book-page .book-header').clone(true);
                var offsetTop = $('.container.flex').offset().top;
                var scrollTop = $(window).scrollTop();
                var hasClass = $('.download-content').eq(0).siblings().hasClass('book-header');
                if (offsetTop - scrollTop < 62 && !hasClass) {

                    cloneBookMenuHeader.css({
                        'position': 'fixed',
                        'top': '62px',
                        'width': '100%',
                        'z-index': '999',
                        'background-color': 'white',
                        'padding': '0 30px',
                        'left': '0',
                        'line-height': '62px'
                    });
                    $('#all').append(cloneBookMenuHeader);
                    $('.book-page .book-header').remove();
                }

            } catch (error) {
                console.log(error);
            }

        }

    }));

    var $activeMenuParents = $('.book-menu').find('.active').parents('li');

    $activeMenuParents.each(function () {
        if ($(this).find('.active')) {
            $(this).find('.active').addClass('arrow-down');
            $(this).children('a').addClass('arrow-down');
        }
    });
    var $delArrowDown = $('.book-menu').find('.active');

    $delArrowDown.closest('li').siblings().find('a').not('.collapsed').addClass('unsel-menu-color');

    var div = document.createElement('div');
    var spanBack = document.createElement('a');
    var spanNext = document.createElement('a');
    $(spanBack).html('&lt; Back').css({
        color: 'black',
        float: 'left',
        cursor: 'pointer'
    }).addClass('doc-back');
    $(spanNext).html('Next &gt;').css({
        color: 'black',
        float: 'right',
        cursor: 'pointer'
    }).addClass('doc-next');
    var cloneSpanBack = $(spanBack).clone();
    var cloneSpanNext = $(spanNext).clone();
    $('.book-header>div').append(cloneSpanBack).append(cloneSpanNext);
    $(div).append(spanBack)
        .append(spanNext)
        .css({
            color: 'rgba(90, 155, 131, 1)',
            'font-size': '18px',
            'font-weight': 'bold',
            'margin-top': '30px'
        });
    $('.book-toc nav').append(div);

    $('.book-header .book-header-title, .mask').click(function () {
        $('.book-header .book-icon').eq(0).trigger('click');
    });
    

    $('#TableOfContents > ul > li ul').remove();

    $('.book-menu nav > ul > li > ul > li > a').not('.collapsed').css({
        'padding-left': '20px'
    });
    function getRelativePath() {
        var url = location.href;
        var arrURL = url.split('//');
        return arrURL[1].substring(arrURL[1].indexOf('/'));
    }
    function getCurrentID(wholeData, relativeURL) {
        for (var j in wholeData) {
            var href = wholeData[j].a_attr.href;
            var text = wholeData[j].text;
            if ((href === relativeURL) || (text.indexOf(relativeURL) >= 0)) {
                return wholeData[j].id;
            } else {
                if (wholeData[j].children.length > 0) {
                    var v = getCurrentID(wholeData[j].children, relativeURL);
                    if (v != '') {
                        return v;
                    }
                }
            }
        }
        return '';
    }
    if ($('#docstreeview').length) {
        $('#docstreeview').jstree();
        $('#docstreeview').jstree().hide_dots();
        $('#docstreeview').jstree().hide_icons();
        $('#docstreeview').on('changed.jstree', function (e, data) {
            if (data.node) {
                var link = data.node.a_attr.href;
                if (link == '' || link == '#') {
                    var aElementID = '#' + data.node.id + '_anchor';
                    var aElement = $(aElementID).find('a');
                    if (aElement.length) {
                        link = aElement.attr('href');
                    }
                }
                var relativeURL = getRelativePath();
                if (link != relativeURL) {
                    location.href = link;
                }
            }
        });
        $('#docstreeview').on('ready.jstree', function (e, data) {
            $('#docstreeview').removeClass('hide');
            $('.jstree-anchor').on('click', function () {
                $(this).prev().trigger('click');
                if($(this).find("a[href='%22#%22']").length){
                    return false;
                }
            });
            var relativeURL = getRelativePath();
            var wholeData = $('#docstreeview').jstree().get_json();
            var currentID = getCurrentID(wholeData, relativeURL);
            $('#docstreeview').jstree()._open_to(currentID);
            $('#docstreeview').jstree().select_node(currentID);
            $('#docstreeview').jstree().open_node(currentID);
            var data = $('#docstreeview').jstree().get_json();
            var nodeList = [];
            /*把树状平铺，用于查看是否有上一页下一页*/
            var getAllData = function (Arr) {
                for (var i = 0; i < Arr.length; i++) {
                    var tempNode = {};
                    tempNode.id = Arr[i].id;
                    var href = Arr[i].a_attr.href;
                    if (href === '#') {
                        /*转为jq对象特殊处理*/
                        var jqNode = $(Arr[i].text);
                        tempNode.href = jqNode.find('a').attr('href');
                        tempNode.text = jqNode.find('a').text() || Arr[i].text;
                    } else {
                        tempNode.href = href;
                        tempNode.text = Arr[i].text;
                    }
                    nodeList.push(tempNode);
                    if (Arr[i].children !== []) {
                        getAllData(Arr[i].children);
                    }
                }
            };
            /*获取上一页、下一页*/
            var nextAndPevious = function (arr, id) {
                var result = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === id) {
                        if (i === 0) {
                            result.push(null);
                        } else {
                            if(arr[i - 1].href == '%22#%22'){
                                arr[i - 1] = arr[i - 2];
                            }
                            result.push({
                                href: arr[i - 1].href,
                                text: arr[i - 1].text
                            });
                        }
                        if (i === arr.length - 1) {
                            result.push(null);
                        } else {
                            if(arr[i + 1].href == '%22#%22'){
                                arr[i + 1] = arr[i + 2];
                            }
                            result.push({
                                href: arr[i + 1].href,
                                text: arr[i + 1].text
                            });
                        }
                    }
                }
                return result;
            };
            getAllData(wholeData);
            var nextAndPeviousArr = nextAndPevious(nodeList, currentID);
            if (nextAndPeviousArr[0] == null) {
                $('.doc-back').remove();
                $('#docPreviousPage').remove();
            } else {
                $('.doc-back').attr('href', nextAndPeviousArr[0].href);
                $('#docPreviousPage').text('< ' + nextAndPeviousArr[0].text);
            }
            if (nextAndPeviousArr[1] == null) {
                $('.doc-next').remove();
                $('#docNextPage').remove();
            } else {
                $('.doc-next').attr('href', nextAndPeviousArr[1].href);
                $('#docNextPage').text(nextAndPeviousArr[1].text + ' >');
            }
        });
    }
    $('.book-menu a').attr('style', 'font-family:HuaweiSans');
    setTimeout(function () {
        $('.book-menu a.active').closest('.jstree-open').children('.jstree-anchor').css({
            'color': '#5a9b83'
        });
    }, 100)
    $('.book-menu a.active').parent('.jstree-open').css({
        'color': '#5a9b83'
    });
    $('.markdown p').attr('style', 'font-family:roboto-regular');
    $('#TableOfContents > ul > li > a').attr('style', 'font-family:HuaweiSans');
})();