//格式化数字 K、W
function formatNumber(num) {
    return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
}
$.ajax({
    type: 'GET',
    headers: {
        'Authorization': 'Basic b3BlbmV1bGVyc2VydmVyOm9wZW5ldWxlcnNlcnZlckAxMjM0'
    },
    url: '/statistics/search/statistics?type=openLookeng',
    contentType: 'application/json; charset=utf-8',
    crossDomain: true,
    datatype: 'json',
    success: function (res) {
        if(res.code === 200){
            $('.contributors-num').text(formatNumber(res.data.communitymembers));
            $('.users-num').text(formatNumber(res.data.users));
            $('.platforms-num').text(formatNumber(res.data.contributors));
        }
    }
});