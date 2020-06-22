
$(".book-icon").on("click", function (){
    $("#TableOfContents").closest("aside").toggleClass("hidden");
})

$($(window).scroll(function (){
    if($(".container").innerWidth() == 1170 || $(".container").innerWidth() == 970){
        try {
            if($(".book-toc").offset().top - $(window).scrollTop() < 120){
                $(".book-toc nav").css({
                    "position": "fixed",
                    "top": "120px",
                    "left": $(".markdown").offset().left + $(".markdown").innerWidth() + 75 + "px",
                    "bottom": "unset"
                })
            }else{
                $(".book-toc nav").css({
                    "position": "static"
                })
            }
        } catch (error) {
            
        }
          
    }

    if($(window).innerWidth() > 992){
        try {
            
            $(".sidebar-menu").css({
                "position": "fixed",
                "top": $("#blog-listing-medium").offset().top,
                "right": $("#blog-listing-medium").offset().right - $(".sidebar-menu").innerWidth(),
            }) 
        } catch (error) {
            
        }
          
    }
    
}));
$(".book-menu>nav>ul>li>a").remove();
var $activeMenuParents = $(".book-menu").find(".active").parents("li");
console.log($activeMenuParents);
$activeMenuParents.each(function(){
    if($(this).find(".active")){
        $(this).find(".active").addClass("arrow-down");
        $(this).children("a").addClass("arrow-down");
    }
});
var $delArrowDown = $(".book-menu").find(".active");
if(!$delArrowDown.hasClass("collapsed")){
    $delArrowDown.removeClass("arrow-down");
}

(function (){

    var div = document.createElement("div");
    var spanBack = document.createElement("a");
    var spanNext = document.createElement("a");
    $(spanBack).html("&lt;Back").css({
        float: "left",
        cursor: "pointer"
    }).addClass("doc-back");
    $(spanNext).html("Next&gt;").css({
        float: "right",
        cursor: "pointer"
    }).addClass("doc-next");
    $(div).append(spanBack)
    .append(spanNext)
    .css({
        color: "rgba(90, 155, 131, 1)",
        "font-size": "18px",
        "font-weight": "bold",
        "margin-top": "10px"
    });
    $(".book-toc nav").append(div);

    $("#book-search-input").attr("placeholder", "Search");
    $(".book-toc nav").prepend($(".book-search"));

    var $menuList = $(".book-menu nav>ul li a");
    $menuList.each(function (index){
        if($(this).hasClass("active")){
            if(index == 0){
                $(".doc-back").remove();
            }else{
                $(".doc-back").attr("href", $menuList.eq(index-1).attr("href"));
                $("#docPreviousPage").text("<"+$menuList.eq(index-1).text())
            }
            if(index == ($menuList.length - 1)){
                $(".doc-next").remove();
            }else{
                $(".doc-next").attr("href", $menuList.eq(index+1).attr("href"));
                $("#docNextPage").text($menuList.eq(index+1).text() + ">")
            }
        }
    })
    

})();
