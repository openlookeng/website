$(document).ready(function () {
    $('.btm_left h4').click(function (e) {
        e.preventDefault();
        $('.btm_left h4').siblings().css('color', '')
        $(this).css('color', '#5A9B83');
        var index = $(this).index();
        var top = index*46 + "px";
        // 设置最左边的竖线条top值，发生位置对应跳转显示
        $('.line').css('top', top)

        // 得到右边所对应的项
        console.dir($('.btm_right > .right_item').eq(index).index());
        $('.btm_right > .right_item').eq(index).siblings().removeClass('active');
        $('.btm_right > .right_item').eq(index).addClass('active');

    });
})