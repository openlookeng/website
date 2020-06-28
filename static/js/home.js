/**
 * @file  首页脚本
 * */

$(function () {
    $('video').on('click', function () {
        if ($(this)[0].paused) {
            $(this).attr('controls', true);
            setTimeout(function () {
                $(this)[0].play();
            });

        }
    });
});