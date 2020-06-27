/**
 * @file  cla页面脚本
 * */


$(function () {
    initEvent();
    initClaPage();
    initCurrentDate();
});

function initEvent() {
    $('td.radio-td').on('click', function () {

        var $this = $(this);
        $this.addClass('cla-bt-color');
        $this.siblings('td').removeClass('cla-bt-color');
    })
}

function initCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var time = null;
    month = month + 1;

    if (month < 10) {
        month = '0' + month;
    } 
    if (date < 10) {
         date = '0' + date;
    }

    time = year + '-' + month + '-' + date;

    if ($('#individual-table').length) {
        $('#individual-date').val(time);
        $('#individual-date').attr('disabled', true);
    }
    if ($('#legalentity-table').length) {
        $('#legalentity-date').val(time);
        $('#legalentity-date').attr('disabled', true);
    }
}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } 
    return null;
}

function readCookie(name) {
    var namePrefix = name + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(namePrefix) == 0) {
            return c.substring(namePrefix.length, c.length);
        }
    }
    return null;
}

function getLanguage() {
    var url = window.location.href;
    if (url.indexOf('/en/') >= 0) {
        return 'en';
    }
    if (url.indexOf('/zh/') >= 0) {
        return 'zh';
    }
    return 'en';
}

function oauthLogin() {
    let config = {
        providerID: 'openeuler_bot',
        client_id: $('#client').val(),
        redirect_uri: window.location.origin + '/cla',
        response_type: 'code',
        authorization: 'https://gitee.com/oauth/authorize',
        scopes: {
            request: ['user_info', 'emails']
        }
    }

    let client = new jso.JSO(config);
    client.callback()

    let f = new jso.Fetcher(client);
    let url = 'https://gitee.com/v5/user';
    f.fetch(url, {})
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            console.log('I got protected json data from the API', data);
        })
        .catch((err) => {
            console.error('Error from fetcher', err);
        });
}

// init cla page
function initClaPage() {

    var v = null;
    var type = null;
    
    $('#client').val('d00e9b289d8cf8f98e2fc68a9c240304f6413007d82d30701cd1da7e937db75c');

    var cla = readCookie('cla-info');
    if (!cla || cla == '') {
        // oauthLogin();
    }

    if ($('#cla-type-table').length) {
        // default show individual
        $('#individual-table').show();
        $('#legalentity-table').hide();
        $('td', '#cla-type-table').click(function () {
            // select checked
            $("input[name='track']").removeAttr('checked');
            $(this).find("input[name='cla-type-radio']").prop('checked', true);

            // show or hide
            v = $("input[name='cla-type-radio']:checked").val();
            if (v == 0) {
                $('#individual-table').show();
                $('#legalentity-table').hide();
            } else {
                $('#individual-table').hide();
                $('#legalentity-table').show();
            }
        });
    }

    type = readCookie('type')
    if (type && type == '0') {

        $('#individual-email').val(readCookie('email'));
        $('#individual-address').val(readCookie('address'));
        $('#individual-name').val(readCookie('name'));
        $('#individual-telephone').val(readCookie('telephone'));
        $('#individual-fax').val(readCookie('fax'));
        $('#individual-date').val(readCookie('date'));

        $('#individual-table').show();
        $('#legalentity-table').hide();

        $('#sign-cla-button').attr('disabled', true);
        $('#reset-cla-button').attr('disabled', true);
    } else if (type && type == '1') {

        $('#legalentity-name').val(readCookie('name'));
        $('#legalentity-title').val(readCookie('title'));
        $('#legalentity-corporation').val(readCookie('corporation'));
        $('#legalentity-address').val(readCookie('address'));
        $('#legalentity-date').val(readCookie('date'));
        $('#legalentity-email').val(readCookie('email'));
        $('#legalentity-telephone').val(readCookie('telephone'));
        $('#legalentity-fax').val(readCookie('fax'));

        $('#individual-table').hide();
        $('#legalentity-table').show();
        $('#sign-cla-button').attr('disabled', true);
        $('#reset-cla-button').attr('disabled', true);

    }

    $('#individual-email').val(readCookie('email'));

    $('#cla-table .cla-checkbox').on('change', function () {
        if ($(this)[0].checked) {
            $('#sign-cla-button').removeClass('disabled')
        } else {
            $('#sign-cla-button').addClass('disabled');
        }
    })

    if ($('#sign-cla-button').length) {
        $('#sign-cla-button').bind('click', function () {

            v = parseInt($("input[name='cla-type-radio']:checked").val());
            var regphone = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            var regmobile = /^1\d{10}$/;
            var regemail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            $('#tip-cla-label').html('');
            var lang = $('html').attr('lang');

            if ($(this).hasClass('disabled')) {
                lang == 'zh-cn' ? $('#tip-cla-label').html('请确认阅读XXX!') : $('#tip-cla-label').html('check before you sign xxxxxx!');
                return;
            }
            if (v == 0) {
                // individual
                var checkpass = true;
                $('input[type=text]', '#individual-table').each(function (i) {
                    if ($(this).hasClass('require')) {
                        if ($.trim($(this).val()) == '') {
                            checkpass = false;
                            return false;
                        }
                    }
                    return true;
                });
                if (!checkpass) {
                    if (lang == 'zh-cn') {
                        $('#tip-cla-label').html('必填字段缺失!');
                    } else {
                        $('#tip-cla-label').html('Required field is missing!');
                    }
                    return false;
                }
                var email = $.trim($('#individual-email').val());
                if (!regemail.test(email)) {
                    if (lang == 'zh-cn') {
                        $('#tip-cla-label').html('邮箱格式不正确!');
                    } else {
                        $('#tip-cla-label').html('E-Mail format is incorrent!');
                    }
                    return false;
                }
                var telephone = $.trim($('#individual-telephone').val());
                if (telephone != '') {
                    if ((!regphone.test(telephone)) && (!regmobile.test(telephone))) {
                        if (lang == 'zh-cn') {
                            $('#tip-cla-label').html('电话格式不正确!');
                        } else {
                            $('#tip-cla-label').html('Telephone format is incorrent!');
                        }
                        return false;
                    }
                }
            } else {
                // legalentity
                var checkpass = true;
                $('input[type=text]', '#legalentity-table').each(function (i) {
                    if ($(this).hasClass('require')) {
                        if ($.trim($(this).val()) == '') {
                            checkpass = false;
                            return false;
                        }
                    }
                    return true;
                });
                if (!checkpass) {
                    if (lang == 'zh-cn') {
                        $('#tip-cla-label').html('必填字段缺失!');
                    } else {
                        $('#tip-cla-label').html('Required field is missing!');
                    }
                    return false;
                }
                var email = $.trim($('#legalentity-email').val());
                if (!regemail.test(email)) {
                    if (lang == 'zh-cn') {
                        $('#tip-cla-label').html('邮箱格式不正确!');
                    } else {
                        $('#tip-cla-label').html('E-Mail format is incorrent!');
                    }
                    return false;
                }
                var telephone = $.trim($('#legalentity-telephone').val());
                if (telephone != '') {
                    if ((!regphone.test(telephone)) && (!regmobile.test(telephone))) {
                        if (lang == 'zh-cn') {
                            $('#tip-cla-label').html('电话格式不正确!');
                        } else {
                            $('#tip-cla-label').html('Telephone format is incorrent!');
                        }
                        return false;
                    }
                }
            }

            // build json
            var posturl = $(this).attr('posturl');
            var jsonData = {};
            if (v == 0) {
                // individual
                jsonData = {
                    'type': v,
                    'name': $.trim($('#individual-name').val()),
                    'address': $.trim($('#individual-address').val()),
                    'date': $.trim($('#individual-date').val()),
                    'email': $.trim($('#individual-email').val()),
                    'telephone': $.trim($('#individual-telephone').val()),
                    'fax': $.trim($('#individual-fax').val()),
                    'code': $.trim($('#oauth-code').val()),
                    'lang': $.trim($('#language').val()),
                    'client': $.trim($('#client').val()),
                };
            } else {
                // legalentity
                jsonData = {
                    'type': v,
                    'name': $.trim($('#legalentity-name').val()),
                    // only for legalentity
                    'title': $.trim($('#legalentity-title').val()),
                    // only for legalentity
                    'corporation': $.trim($('#legalentity-corporation').val()),
                    'address': $.trim($('#legalentity-address').val()),
                    'date': $.trim($('#legalentity-date').val()),
                    'email': $.trim($('#legalentity-email').val()),
                    'telephone': $.trim($('#legalentity-telephone').val()),
                    'fax': $.trim($('#legalentity-fax').val()),
                    'code': $.trim($('#oauth-code').val()),
                    'lang': $.trim($('#language').val()),
                    'client': $.trim($('#client').val()),
                };
            }

            // send request
            $.ajax({
                type: 'POST',
                url: posturl,
                data: JSON.stringify(jsonData),
                contentType: 'application/json; charset=utf-8',
                crossDomain: true,
                datatype: 'json',
                success: function (data) {
                    if (data) {
                        if (data.isSuccess) {
                            $('#reset-cla-button').trigger('click');
                            if (lang == 'zh-cn') {
                                alert('签署成功!');
                            } else {
                                alert('Sign succeed!');
                            }
                        }
                    }
                },
                error: function (data) {
                    if (data.responseJSON.errorCode == 1) {
                        if (lang == 'zh-cn') {
                            alert('服务器处理错误!');
                        } else {
                            alert('Server handle error!');
                        }
                    } else if (data.responseJSON.errorCode == 2) {
                        if (lang == 'zh-cn') {
                            alert('邮箱已经被注册!');
                        } else {
                            alert('E-Mail is already registered!');
                        }
                    } else if (data.responseJSON.errorCode == 3) {
                        if (lang == 'zh-cn') {
                            alert('电话已经被注册!');
                        } else {
                            alert('Telephone is already registered!');
                        }
                    } else if (data.responseJSON.errorCode == 4) {
                        if (lang == 'zh-cn') {
                            alert('注册邮箱与gitee账号邮箱不一致，请在这里检查：https://gitee.com/profile/emails')
                        } else {
                            alert('The submit email is not the gitee account email. Please checck in https://gitee.com/profile/emails.');
                        }
                    }
                }
            });

            return false;
        });
    }

    if ($('#reset-cla-button').length) {
        $('#reset-cla-button').bind('click', function () {
            $("input[type='text']", '#individual-table').val('');
            $("input[type='text']", '#legalentity-table').val('');
            $('#tip-cla-label').html('');
            initCurrentDate();
            return false;
        });
    }
}