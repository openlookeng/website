$(function (){
    var es = function (selector){
        var elements = document.querySelectorAll(selector)
        if (elements.length === 0) {
            var s = "选择器" + selector + "获取错误"
            alert(s)
            return null
        } else {
            return elements
        }
    }

    var childHide = function (element, target){
        var arrow = element.querySelector('.dropdown-arrow')
        var t = target
        element.addEventListener('mouseleave', function () {
            target.classList.remove('hover')
            arrow.classList.remove('hover')
        })
    }

    var childShow = function (element, target){
        var arrow = element.querySelector('.dropdown-arrow')
        var t = target
        element.addEventListener('mouseover', function (e) {
            target.classList.add('hover')
            arrow.classList.add('hover')
        })
    }

    var navEvent = function (){
        var uls = es('.dropdown-menu')
        for (var i = 0; i < uls.length; i++) {
            var ul = uls[i]
            var parent = ul.closest('.dropdown')
            childShow(parent, ul)
            childHide(parent, ul)
        }
    }
    var __main = function (){
        navEvent()
        // debounce(navEvent, 1000)
    }
    


    if($(window).width() < 751){
        $(".container .navbar-header").append($(".lang"));
    }
    if($(window).width() < 978){
        $("#search").append($(".nav-search-input .book-search"));
    }else{
        __main();
    }
    $(window).resize(function (){
        if($(window).width() < 751){
            if(!$(".container .navbar-header").find(".lang").length){
                $(".container .navbar-header").append($(".lang"));  
            }
            
        }else{
            if(!$(".container .nav-search").find(".lang").length){
                $(".container .nav-search").before($(".lang"));   
            }
            
        }

        if($(window).width() < 978){
            if(!$("#search").find(".book-search").length){
                $("#search").append($(".nav-search-input .book-search"));  
            }
            
        }else{
            if(!$(".nav-search-input").find(".book-search").length){
                $(".nav-search-input").append($("#search .book-search"));   
            }
            
        }

    })

    $(".nav-search").on("click", function (){
        $(this).hide().prevAll().hide();
        $(".nav-search-input").addClass("nav-search-input-show");
    })
    $('body').click(function(e){
        if(!$(e.target).hasClass("fa-search") && $(e.target).attr("id") != "book-search-input" && $(".nav-search").is(':hidden')){
            $(".nav-search").show().prevAll().show();
            $(".nav-search-input").removeClass("nav-search-input-show");
        }
    });
})

