/**
 * @file  docs页面脚本
 * */

(function () {

    $('.book-icon').on('click', function () {
        $('#TableOfContents').closest('aside').toggleClass('hidden');
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
                if (offsetTop - scrollTop < 70 && !hasClass) {

                    cloneBookMenuHeader.css({
                        'position': 'fixed',
                        'top': '70px',
                        'width': '100%',
                        'z-index': '999',
                        'background-color': 'white',
                        'padding': '0 30px',
                        'left': '0',
                        'line-height': '70px'
                    });
                    $('.download-content').eq(0).after(cloneBookMenuHeader);
                    $('.book-page .book-header').eq(0).hide();
                } else if (offsetTop - scrollTop >= 70 && hasClass) {
                    $('.book-page .book-header').eq(0).show();
                    $('.download-content+.book-header').remove();
                }

            } catch (error) {
                console.log(error);
            }

        }

    }));
    $('.book-menu>nav>ul>li>a').remove();
    var $activeMenuParents = $('.book-menu').find('.active').parents('li');

    $activeMenuParents.each(function () {
        if ($(this).find('.active')) {
            $(this).find('.active').addClass('arrow-down');
            $(this).children('a').addClass('arrow-down');
        }
    });
    var $delArrowDown = $('.book-menu').find('.active');
    if (!$delArrowDown.hasClass('collapsed')) {
        $delArrowDown.removeClass('arrow-down');
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

    // $('#book-search-input').attr('placeholder', 'Search');
    // $('.book-toc nav').prepend($('.book-search'));

    var $menuList = $('.book-menu nav>ul li a');
    $menuList.each(function (index) {
        if ($(this).hasClass('active')) {
            if (index === 0) {
                $('.doc-back').remove();
            } else {
                $('.doc-back').attr('href', $menuList.eq(index - 1).attr('href'));
                $('#docPreviousPage').text('<' + $menuList.eq(index - 1).text());
            }
            if (index === ($menuList.length - 1)) {
                $('.doc-next').remove();
            } else {
                $('.doc-next').attr('href', $menuList.eq(index + 1).attr('href'));
                $('#docNextPage').text($menuList.eq(index + 1).text() + '>');
            }
        }
    });


    $('.book-header .book-header-title').click(function () {
        $('.book-header .book-icon').eq(0).trigger('click');
    });

    if ($('.book-menu').find('.active').length) {
        var targetDom = $('.book-menu').offset();
        $('html,body').animate({
            scrollTop: targetDom.top - 70 + 'px'
        }, 200);
    }

    $('#book-search-results').hide();
    $('#book-search-input').on('input', function () {
        if ($(this).val()) {
            $('#book-search-results').show();
        } else {
            $('#book-search-results').hide();
        }
    });

    $('#TableOfContents > ul > li ul').remove();
})();