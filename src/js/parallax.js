var jumboHeight = $('.jumbotron').outerHeight();
var jumboHeight2 = $('.jumbotron2').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
     $('span').css('top', (i*10) + 'px');
    
    //fades wolf and rabbit illustration in and out.
    if($(window).scrollTop() > 1000 ){
    	$(".bg-2").fadeIn("slow");
    	$(".bg-2").css('height', (1805 + jumboHeight2-scrolled) + 'px');
    } else{
		$(".bg-2").fadeOut('slow');
	}

	//adds audio player on scroll bottom
	if($(window).scrollTop() > 1700 ){
		$("#footer").css("visibility","visible");
		$("#footer").removeClass("animated fadeOutDown");
		$("#footer").removeClass("animated fadeInUp");
  		$("#footer").addClass("animated bounceInUp");
  	} else{
  		$("#footer").css("visibility","hidden");
  		$("#footer").removeClass("animated bounceInUp");
		$("#footer").addClass("animated fadeOutDown");
	}
}

$(window).scroll(function(e){
    parallax();

});