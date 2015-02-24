$(document).ready(function () {

	  //toggle the hamburger
	  $(".navbar-toggle").on("click", function () {
		    $(this).toggleClass("active");
	  });
	});
	
	//switch the navbar to white when it reaches a certain point
	$(document).scroll(function(){
    var scrollPos = 715;

    if($(this).scrollTop() > scrollPos){
        $(".navbar-inverse").css({"background":"white","border-bottom":"1px solid lightgray"});
        $(".nav-menu-items li a").css({"color":"#444"});
        $(".navbar-nav li a:focus").css({"color":"#444"});
        $(".navbar-brand .logo").addClass("logo-inverse");
        $(".icon-bar").css({"background":"black"});
        $(".navbar-inverse .navbar-toggle:hover").css({"color":"black","background":"none","transform":"scale(1)"});
        $(".navbar-toggle.active .icon-bar:nth-of-type(2)").css({"background-color":"transparent","background":"none"});
        
	}else{
        $(".navbar-inverse").css({"background":"none","border-bottom":"0px solid lightgray"});
        $(".nav-menu-items li a").css({"color":"white"});
        $(".navbar-brand .logo").removeClass("logo-inverse");
        $(".icon-bar").css({"background":"white"});
        $(".navbar-inverse .navbar-toggle:hover").css({"color":"white","background":"none","transform":"scale(1)"});
        $(".navbar-toggle.active .icon-bar:nth-of-type(2)").css({"background-color":"white","background":"none"});
        
    }
});
