/**
 * @file  blog页面脚本
 * */


$(function () {
    $('.tag-filter .tag-filter-header .header-left').on('click', function () {
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

            }

        } else {
            $('.sidebar-menu').hide();
        }

    }));
});
