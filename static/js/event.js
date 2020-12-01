/**
 * @file  event页面脚本
 * */

$(function () {
    var clickTagEvent = function (className) {
        var item = className.split('-')[1]
        var target = '.item-' + item
        $(className).on('click', function () {
            $(this).addClass("active").siblings().removeClass('active');
            $(target).addClass('active').siblings().removeClass('active');
        });
    }

    var newEventList = [];
    var checkFlag = false;
    eventList = eventList.sort(function (a, b){
        return Number(b.date.substring(0, 4) + b.date.substring(5, 7)) - Number(a.date.substring(0, 4) + a.date.substring(5, 7));
    })
    eventList.forEach(function (item, index) {
        if(index){
            checkFlag = false;
            newEventList.forEach(function (newItem) {
                if(item.date.split('-')[0].substring(0, 7).includes(newItem.month)){
                    checkFlag = true;
                    newItem.eventList.push(item);
                }
            })
            if(!checkFlag){
                newEventList.push({
                    month: item.date.split('-')[0].substring(0, 7),
                    eventList: [item]
                })
            }
        }else{
            newEventList.push({
                month: item.date.split('-')[0].substring(0, 7),
                eventList: [item]
            })
        }
    })
    newEventList = newEventList.sort(function (a, b){
        return Number(b.month.substring(0, 4) + b.month.substring(5, 7)) - Number(a.month.substring(0, 4) + a.month.substring(5, 7));
    })
    var date = new Date();
    var curMonth = (date.getMonth() < 9) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
    var curDate = (date.getDate().toString().length === 1) ? ('0' + date.getDate()) : date.getDate();
    var curDate = Number('' + date.getFullYear() + curMonth + curDate);
    var filterFlag = false;
    newEventList.forEach(function (item) {
        filterFlag = false;
        item.eventList.forEach(function (secondItem) {
            if(secondItem.date.split('-')[1] && (secondItem.date.split('-')[1].length === 7)){
                filterFlag = true;
                secondItem.isLatest = true;
                
            }
            if(secondItem.date.split('-')[1] && (secondItem.date.split('-')[1].length !== 7)){
                if(Number(secondItem.date.split('-')[1].substring(0, 10).replace(/\./g, '')) >= curDate){
                    
                    filterFlag = true;
                    secondItem.isLatest = true;
                }
                
            }
            if(!secondItem.date.split('-')[1]){
                if(secondItem.date.split('-')[0].length === 7){
                    filterFlag = true;
                    secondItem.isLatest = true;
                }else if(Number(secondItem.date.split('-')[0].substring(0, 10).replace(/\./g, '')) >= curDate){
                    filterFlag = true;
                    secondItem.isLatest = true;
                }
            }
        })
        if(filterFlag){
            item.isLatest = true;
        }
    })
    var checkAllFlag = 0;;
    newEventList.forEach(function (item) {
        checkAllFlag = false;
        item.eventList.forEach(function (secondItem) {
            if(secondItem.isLatest){
                checkAllFlag++;
            }
        })
        if((checkAllFlag > 0) && (checkAllFlag < item.eventList.length)){
            item.all = true;
        }
    })
    var outsideDom = null;
    var insideDom = null;
    var olderOutsideDom = null;
    var olderInsideDom = null;
    newEventList.reverse().forEach(function (item){
        if(item.isLatest){
            if($(window).innerWidth() > 992){
                outsideDom = $('.js-clone-out').clone().removeClass('hide').removeClass('js-clone-out');
                $(outsideDom).find('.event-item-time').text(item.month);
                item.eventList.forEach(function (itemEvent){
                    if(itemEvent.isLatest){
                        insideDom = $('.js-clone-inside').clone().removeClass('hide').removeClass('js-clone-inside');
                        $(insideDom).find('.item-left-time span').text(itemEvent.date);
                        $(insideDom).find('.item-left-location span').text(itemEvent.location);
                        $(insideDom).find('.item-left-tag span').text(itemEvent.tag);
                        $(insideDom).find('.item-box-right h5').text(itemEvent.title);
                        $(insideDom).find('.item-box-right p').text(itemEvent.description);
                        $(insideDom).find('.item-box-right a').attr('href', itemEvent.link);
                        $(insideDom).find('.item-box-right .isPC').attr('src', itemEvent.img);
                        $(insideDom).find('.item-box-right .isH5').attr('src', itemEvent.img_mobile);
                        $(outsideDom).append($(insideDom));    
                    }
                    
                })
                $('.js-latest-event').append($(outsideDom));    
            }else{
                outsideDom = $('.js-latest-h5-outside').clone().removeClass('hide').removeClass('js-latest-h5-outside');
                $(outsideDom).find('.event-item-time').text(item.month);
                item.eventList.forEach(function (itemEvent){
                    if(itemEvent.isLatest){
                        insideDom = $('.js-latest-h5-inside').clone().removeClass('hide').removeClass('js-latest-h5-inside');
                        $(insideDom).find('.item-left-time span').text(itemEvent.date);
                        $(insideDom).find('.item-left-location span').text(itemEvent.location);
                        $(insideDom).find('.item-left-tag span').text(itemEvent.tag);
                        $(insideDom).find('h5').text(itemEvent.title);
                        $(insideDom).find('.js-desc').text(itemEvent.description);
                        $(insideDom).find('a').attr('href', itemEvent.link);
                        $(insideDom).find('.isH5').attr('src', itemEvent.img_mobile);
                        $(outsideDom).find('.meeting-inner').append($(insideDom));    
                    }
                    
                })
                $('.js-latest-tag .js-content').append($(outsideDom));    
            }
            

            
        }
        if((item.isLatest && item.all) || !item.isLatest) {

            if($(window).innerWidth() > 992){
                olderOutsideDom = $('.js-back-out').clone().removeClass('hide').removeClass('js-back-out');
                $(olderOutsideDom).find('.event-item-time').text(item.month);
                item.eventList.forEach(function (itemEvent){
                    if(!itemEvent.isLatest){
                        olderInsideDom = $('.js-back-inside').clone().removeClass('hide').removeClass('js-back-inside');
                        $(olderInsideDom).find('.item-left-time span').text(itemEvent.date);
                        $(olderInsideDom).find('.item-left-location span').text(itemEvent.location);
                        $(olderInsideDom).find('.item-left-tag span').text(itemEvent.tag);
                        $(olderInsideDom).find('.item-box-right h5').text(itemEvent.title);
                        $(olderInsideDom).find('.item-box-right p').text(itemEvent.description);
                        $(olderInsideDom).find('.item-box-right a').attr('href', itemEvent.link);
                        $(olderInsideDom).find('.item-box-right .isPC').attr('src', itemEvent.img);
                        $(olderInsideDom).find('.item-box-right .isH5').attr('src', itemEvent.img_mobile);
                        $(olderOutsideDom).append($(olderInsideDom));    
                    }
                    
                })
                $('.js-back-event').prepend($(olderOutsideDom));    
            }else{
                olderOutsideDom = $('.js-back-h5-outside').clone().removeClass('hide').removeClass('js-back-h5-outside');
                $(olderOutsideDom).find('.event-item-time').text(item.month);
                item.eventList.forEach(function (itemEvent){
                    if(!itemEvent.isLatest){
                        olderInsideDom = $('.js-back-h5-inside').clone().removeClass('hide').removeClass('js-back-h5-inside');
                        $(olderInsideDom).find('.item-left-time span').text(itemEvent.date);
                        $(olderInsideDom).find('.item-left-location span').text(itemEvent.location);
                        $(olderInsideDom).find('.item-left-tag span').text(itemEvent.tag);
                        $(olderInsideDom).find('h5').text(itemEvent.title);
                        $(olderInsideDom).find('.js-desc').text(itemEvent.description);
                        $(olderInsideDom).find('a').attr('href', itemEvent.link);
                        $(olderInsideDom).find('.isH5').attr('src', itemEvent.img_mobile);
                        $(olderOutsideDom).find('.meeting-inner').append($(olderInsideDom));    
                    }
                    
                })
                $('.js-back-tag .js-content').prepend($(olderOutsideDom));    
            }

        }
    })
    $('.post').on('click', '.item-line', function () {
        if($(window).innerWidth() > 992){
            $(this).siblings().toggleClass('hide');
            if($(this).find('img').attr('src').includes('open')){
                $(this).find('img').attr('src', '../img/events/event-close.svg');
            }else{
                $(this).find('img').attr('src', '../img/events/event-open.svg');
            }
        }else{
            $(this).parent().siblings().toggleClass('hide');
            if($(this).find('img').attr('src').includes('open')){
                $(this).find('img').attr('src', '../img/events/event-close.svg');
            }else{
                $(this).find('img').attr('src', '../img/events/event-open.svg');
            }
        }
    })
    $('.js-pc-latest .item-line').each(function(index, item) {
        if(index > 3){
            $(item).trigger('click');
        }
    })
    $('.js-pc-older .item-line').each(function(index, item) {
        if(index > 3){
            $(item).trigger('click');
        }
    })
    $('.js-h5-latest .item-line').each(function(index, item) {
        if(index > 3){
            $(item).trigger('click');
        }
    })
    $('.js-h5-older .item-line').each(function(index, item) {
        if(index > 3){
            $(item).trigger('click');
        }
    })
    $('.js-tag-item').click(function () {
        if($(this).find('.js-arrow').hasClass('inner-arrow-right')){
            $(this).find('.js-arrow').removeClass('inner-arrow-right').addClass('inner-arrow-down');
        }else{
            $(this).find('.js-arrow').removeClass('inner-arrow-down').addClass('inner-arrow-right');
        }
        $(this).siblings('.js-content').toggleClass('hide');
        $(this).toggleClass('active')
    })
    $('.js-event-sel').on('change', function (){
        $('.js-plan-detail').removeClass('active');
        $('.js-plan-detail' + $(this).val()).addClass('active');
    })
    if ($(window).innerWidth() > 992) {
        clickTagEvent('.tag-coming');
        clickTagEvent('.tag-back');
        clickTagEvent('.tag-plan');
    }
});

