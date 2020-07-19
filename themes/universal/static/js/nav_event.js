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

    var judgeCommunity = function (str) {

        if (str.includes('contribution')) {
            return true
        } else if (str.includes('who-we-are')) {
            return true
        } else if (str.includes('communication')) {
            return true
        } else {
            return false
        }
    }

    var judgeNewsroom = function (str) {

        if (str.includes('tags')) {
            return true
        } else if (str.includes('blog')) {
            return true
        } else if (str.includes('news')) {
            return true
        } else if (str.includes('events')) {
            return true
        } else {
            return false
        }
    }

    var judgeDocs = function (str) {

        if (str.includes('docs')) {
            return true
        } else {
            return false
        }
    }

    var navStyle = function () {

        var currentUrl = window.location.href

        currentUrl = currentUrl.split('/')
        var strUrl = currentUrl.join('')

        if (judgeDocs(strUrl)) {
            $(".dropdown").eq(1).addClass('active')
        } else if (judgeCommunity(strUrl)) {
            $(".dropdown").eq(2).addClass('active')
        } else if (judgeNewsroom(strUrl)) {
            $(".dropdown").eq(3).addClass('active')
        }
    }

    var __main = function (){
        navEvent()
        navStyle()
        // debounce(navEvent, 1000)
    }

    if($(window).width() < 751){
        $(".container .navbar-header").append($(".lang"));

        $('.navbar-toggle').click(function () {
            $('.search-img').eq(0).toggleClass('mobile')
            $('.search-img').eq(1).toggleClass('mobile')
            $('.nav-mask').toggleClass('hide');
        });
        $('.nav-mask').on('click', function () {
            $('.search-img').eq(0).toggleClass('mobile')
            $('.search-img').eq(1).toggleClass('mobile')
            $(this).toggleClass('hide');
            $('#navigation').removeClass('in')
        });
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
    $('#book-search-results').hide();
    $('#book-search-input').on('input', function () {
        if ($(this).val()) {
            $('#book-search-results').show();
        } else {
            $('#book-search-results').hide();
        }
    });

})

