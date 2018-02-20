$(document).ready(function(){
	$("body").delegate(".node","click", function(){
		if($(this).hasClass("marked")){
			$(this).removeClass("marked");
		}
		else{
			$(this).addClass("marked");
		}
	});
});