$(function($) {
    $(".list-box").find(".video-msg").addClass('hide');
    $(".list-box").find(".video-msg:lt(4)").removeClass('hide');
    $(".video-content[index]").find(".more-btn").click(function(){
        $(this).addClass('hide');
        var btnIndex1 = $(this).attr("index");
        switch(btnIndex1) {
            case 'feature':
                $(".video-content[index='feature']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='feature']").find(".hide-btn").removeClass('hide');
                break;
            case 'theme':
                $(".video-content[index='theme']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='theme']").find(".hide-btn").removeClass('hide');
                break;
            case 'technical':
                $(".video-content[index='technical']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='technical']").find(".hide-btn").removeClass('hide');
                break;
            case 'developer':
                $(".video-content[index='developer']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='developer']").find(".hide-btn").removeClass('hide');
                break;
            default:
                return false;
        }
    });
    $(".video-content[index]").find(".hide-btn").click(function(){
        $(this).addClass('hide');
        var btnIndex2 = $(this).attr("index");
        switch(btnIndex2) {
            case 'feature':
                $(".video-content[index='feature']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='feature']").find(".more-btn").removeClass('hide');
                break;
            case 'theme':
                $(".video-content[index='theme']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='theme']").find(".more-btn").removeClass('hide');
                break;
            case 'technical':
                $(".video-content[index='technical']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='technical']").find(".more-btn").removeClass('hide');
                break;
            case 'developer':
                $(".video-content[index='developer']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='developer']").find(".more-btn").removeClass('hide');
                break;
            default:
                return false;
        }
    });
    // $(".video-content[index]").find(".video-msg").click(function(){
    //     var address = $(this).attr("href");
    //     console.log('address', address)
    //     window.location.href = address;
    // });
});