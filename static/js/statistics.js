const format = function (string) {
    string = string.toString()
    let len = string.length
    let digit = Math.pow(10, len-1)
    let num = Number(string)
    if (len > 4) {
        num = num / digit
        num = num.toFixed(1) + 'W';
    } else if (len > 3) {
        num = num / digit
        num = num.toFixed(1) + 'K';
    }
    return num
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
        if(res.msg === 'OK'){
            $('.contributors-num').text(format(res.data.contributors));
            $('.users-num').text(format(res.data.users));
            $('.platforms-num').text(format(res.data.communitymembers));
        }
    }
});