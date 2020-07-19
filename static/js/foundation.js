/**
 * @file  foundation页面脚本
 * */

$(function () {

    var $tabsContent = $('.foundation-tabs-content .foundation-tab-pane');
    var $tabsContentTitle = $('.foundation-tabs-content .foundation-tab-pane .foundation-tab-pane-title');
    var $tabsTitle = $('.foundation-tabs-content .foundation-tabs');

    $tabsTitle.find('li').eq(0).addClass('foundation-item-active');
    $tabsContent.hide().eq(0).show();

    $tabsTitle.find('li').on('click', function () {
        $(this).addClass('foundation-item-active').siblings().removeClass('foundation-item-active');
        $tabsContent.hide().eq($(this).index()).show();
    });

    if ($(window).width() < 978) {
        $tabsContent.show().find('.foundation-tab-pane-title').siblings().hide();
    }

    $tabsContentTitle.on('click', function () {
        if (!$(this).find('span').hasClass('inner-arrow-down')) {
            $(this).find('span').removeClass('inner-arrow-right').addClass('inner-arrow-down')
                .closest('.foundation-tab-pane')
                .find('.inner').show();
        } else {
            $(this).find('span').removeClass('inner-arrow-down').addClass('inner-arrow-right')
                .closest('.foundation-tab-pane')
                .find('.inner').hide();
        }
    });

});