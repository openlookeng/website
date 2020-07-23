/**
 * @file  blog页面脚本
 * */


$(function () {
    $('.post .row .col-md-12 h3 a').attr('style', 'font-family:HuaweiSans');
    $('.read-more a').attr('style', 'font-family:roboto!important');
    $('.tag-filter .tag-filter-header .header-left').on('click', function () {
        $('.tag-filter .tag-filter-content').toggleClass('hide');
        $('.blog-mask').toggleClass('hide');
    });
    $('.blog-mask').on('click', function () {
        $(this).toggleClass('hide');
        $('.tag-filter .tag-filter-content').toggleClass('hide');
    });
    $($(window).scroll(function () {

        if ($(window).innerWidth() > 992) {
            try {

                $('.sidebar-menu').css({

                    'position': 'fixed',
                    'top': $('#blog-listing-medium').offset().top,
                    'right': $('#blog-listing-medium').offset().right - $('.sidebar-menu').innerWidth(),
                }).show();

            } catch (error) {
                console.log(error);
            }

        } else {
            $('.sidebar-menu').hide();
        }

    }));
});
