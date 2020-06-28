/**
 * @file  download页面脚本
 * */

 $(function () {

    $('button').on('click', function () {
        window.open($(this).attr('url'));
    });

 });
