$(function($) {
    $('.js-to-top').on('click', function (e) {
        scroll(0, 0);
        $('.fixed-nav ul').find('li').removeClass('active');
        $('.fixed-nav ul li:first').addClass('active');
    });
    $('.fixed-nav ul').find('li').on('click', function (e) {
        let target = e.target
        // 页面结构为 ul > li > a
        // 为了防止误触
        // 需要判断点击的 tagName 是否为 A
        if (target.tagName === 'A') {
            $(this).addClass('active').siblings().removeClass('active')
        }

    })

    $(window).scroll(function () {
        let top = $(window).scrollTop()
        if (top < 310) {
            $('.fixed-nav ul li:nth-child(1)').addClass('active').siblings().removeClass('active')
        } else if ((top > 310) && (top < 1250)) {
            $('.fixed-nav ul li:nth-child(2)').addClass('active').siblings().removeClass('active')
        }  else if ((top >= 1250) && (top < 1360)) {
            $('.fixed-nav ul li:nth-child(3)').addClass('active').siblings().removeClass('active')
        }  else if ((top >= 1360) && (top < 1650)) {
            $('.fixed-nav ul li:nth-child(4)').addClass('active').siblings().removeClass('active')
        }  else if ((top >= 1650) && (top < 1880)) {
            $('.fixed-nav ul li:nth-child(5)').addClass('active').siblings().removeClass('active')
        }  else if (top >= 1880) {
            $('.fixed-nav ul li:nth-child(6)').addClass('active').siblings().removeClass('active')
        }
    })
});