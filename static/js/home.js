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
});