/**
 * @file  首页脚本
 * */

$(function () {
    $('video').on('click', function () {
        var that = this;
        if ($(this)[0].paused) {
            $(this).attr('controls', true);
            setTimeout(function () {
                $(that)[0].play();
            });

        }
    });

    var myBannerSwiper = new Swiper ('.banner_swiper', {
        direction: 'horizontal', // 切换选项
        /* loop: true, */ // 循环模式选项
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },

        // 如果需要分页器
        pagination: {
            el: '.banner_swiper_pagination',
            type: 'bullets',
            clickable :true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    })
});