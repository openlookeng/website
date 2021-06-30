$(function () {
    var clickTagEvent = function (className) {
        var item = className.split('-')[1]
        var target = '.item-' + item
        $(className).on('click', function () {
            $(this).addClass("active").siblings().removeClass('active');
            $(target).addClass('active').siblings().removeClass('active');
        });
    }
    $('.js-tag-item').on('click', function () {
        $(this).toggleClass('active')
        if($(this).find('.js-arrow').hasClass('inner-arrow-right')){
            $(this).find('.js-arrow').removeClass('inner-arrow-right').addClass('inner-arrow-down');
        }else{
            $(this).find('.js-arrow').removeClass('inner-arrow-down').addClass('inner-arrow-right');
        }
        $(this).siblings('.js-content').toggleClass('hide');
    })
    if ($(window).innerWidth() > 992) {
        clickTagEvent('.tag-coming');
        clickTagEvent('.tag-back');
        clickTagEvent('.tag-plan');
    }
});

