$(function(){

  var layout = 'list', // Store the current layout as a variable
      $container = $('#libaryContainer'), // Cache the MixItUp container
      $changeLayout = $('#ChangeLayout'); // Cache the changeLayout button
  
  // Instantiate MixItUp with some custom options:
  
  $container.mixItUp({
    animation: {
		animateChangeLayout: true, // Animate the positions of targets as the layout changes
		animateResizeTargets: true, // Animate the width/height of targets as the layout changes
		animateResizeContainer: true,
		duration: 400,
		effects: 'fade stagger(34ms) translateY(10%)',
		easing: 'ease'
    },
    layout: {
      containerClass: 'list' // Add the class 'list' to the container on load
    }
  });

  $('.tag').click(function(e){

    // Cancel the default action
    e.preventDefault();
  });

  
});