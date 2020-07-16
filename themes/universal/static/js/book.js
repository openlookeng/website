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

    $('.navbar-buttons').click(function () {
        $('.book-header').toggle();
    });

    $($(window).scroll(function () {
        if ($('.container').innerWidth() === 1170 || $('.container').innerWidth() === 970) {
            try {
                if ($('.book-toc').offset().top - $(window).scrollTop() < 120) {
                    $('.book-toc nav').css({
                        'position': 'fixed',
                        'top': '170px',
                        'left': $('.markdown').offset().left + $('.markdown').innerWidth() + 15 + 'px',
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

        if ($(window).innerWidth() <= 992) {
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
                    $('.book-page .book-header').eq(0).hide();
                } else if (offsetTop - scrollTop >= 62 && hasClass) {
                    $('.book-page .book-header').eq(0).show();
                    $('#all > .book-header').remove();
                }

            } catch (error) {
                console.log(error);
            }

        }

    }));
    // $('.book-menu>nav>ul>li>a').remove();
    var $activeMenuParents = $('.book-menu').find('.active').parents('li');

    $activeMenuParents.each(function () {
        if ($(this).find('.active')) {
            $(this).find('.active').addClass('arrow-down');
            $(this).children('a').addClass('arrow-down');
        }
    });
    var $delArrowDown = $('.book-menu').find('.active');
    if (!$delArrowDown.hasClass('collapsed')) {
        // $delArrowDown.removeClass('arrow-down');
    }
    $delArrowDown.closest('li').siblings().find('a').not('.collapsed').addClass('unsel-menu-color');

    var div = document.createElement('div');
    var spanBack = document.createElement('a');
    var spanNext = document.createElement('a');
    $(spanBack).html('&lt;Back').css({
        color: 'black',
        float: 'left',
        cursor: 'pointer'
    }).addClass('doc-back');
    $(spanNext).html('Next&gt;').css({
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
    $('#book-search-results').hide();
    $('#book-search-input').on('input', function () {
        if ($(this).val()) {
            $('#book-search-results').show();
        } else {
            $('#book-search-results').hide();
        }
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
                console.log(link);
                var relativeURL = getRelativePath();
                console.log(relativeURL);
                if (link != relativeURL) {
                    location.href = link;
                }
            }
        });
        $('#docstreeview').on('ready.jstree', function (e, data) {
            $('#docstreeview').show();
            $('.jstree-anchor').on('click', function () {
                $(this).prev().trigger('click');
                if (!$(this).parent('.jstree-leaf').length) {
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
                            result.push({
                                href: arr[i - 1].href,
                                text: arr[i - 1].text
                            });
                        }
                        if (i === arr.length - 1) {
                            result.push(null);
                        } else {
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
                $('#docPreviousPage').text('<' + nextAndPeviousArr[0].text);
            }
            if (nextAndPeviousArr[1] == null) {
                $('.doc-next').remove();
                $('#docNextPage').remove();
            } else {
                $('.doc-next').attr('href', nextAndPeviousArr[1].href);
                $('#docNextPage').text('<' + nextAndPeviousArr[1].text);
            }
        });
    }
})();