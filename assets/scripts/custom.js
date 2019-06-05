$( document ).ready(function() {
   
    /* Play sound on menu hover */
    $(function(){
		$('.nav-item').hover(
			function() {	$("audio")[0].play();},
			/*function() {	$("audio")[0].pause();}*/
		)
	});
	
	$(".nav-item").on("click", function() {
      $(".nav-item").removeClass("active");
      $(this).addClass("active");
    });
    
	$("#link2").click(function(){
		$("#chart1, #chart3").hide(1000);
		$("#chart2").show(1000);
	});
	
	$("#link3").click(function(){
		$("#chart2, #chart1").hide(1000);
		$("#chart3").show(1000);
	});
	
	$("#link1").click(function(){
		$("#chart2, #chart3").hide(1000);
		$("#chart1").show(1000);
		
	});
	
	/* Text to speech on mouse hover */
	$('h1, h2, label, svg').each(function(){
		if ($(this).text().trim().length){
			$(this).mouseover(function() {
				responsiveVoice.speak($(this).text(),'US English Female');
				});
			
			$(this).mouseleave(function() {
				responsiveVoice.cancel();
			});
		}
	});
	
	$("#link2b").click(function(){
		$("#chart1b, #chart3b").hide(1000);
		$("#chart2b").show(1000);
	});
	
	$("#link3b").click(function(){
		$("#chart2b, #chart1b").hide(1000);
		$("#chart3b").show(1000);
	});
	
	$("#link1b").click(function(){
		$("#chart2b, #chart3b").hide(1000);
		$("#chart1b").show(1000);
		
	});

});
