/*
*@file  foundation页面脚本
*/

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

    $tabsContent.eq(0).find('.foundation-tab-pane-title span').addClass('inner-arrow-down');

    if ($(window).width() < 978) {
        $tabsContent.show().eq(0).siblings().find('.foundation-tab-pane-title').siblings().hide();
    }

    $tabsContentTitle.on('click', function () {
        if (!$(this).find('span').hasClass('inner-arrow-down')) {
            $(this).find('span').addClass('inner-arrow-down')
                .closest('.foundation-tab-pane')
                .find('.inner').show()
                .closest('.foundation-tab-pane')
                .siblings()
                .find('.foundation-tab-pane-title span')
                .removeClass('inner-arrow-down')
                .closest('.foundation-tab-pane-title')
                .siblings()
                .hide();
        }
    });

});