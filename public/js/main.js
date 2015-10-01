// requirejs.config({
// 	baseUrl: '/',
// 	paths:{
//     	'jquery': '/bower_components/jquery/dist/jquery.min',
//     	'handlebars': '/bower_components/handlebars/handlebars',
//     	'underscore': '/bower_components/underscore/underscore',
//     	'home': 'public/js/home',
//     	'route': 'public/js/route'
//   	}		
// });

$(".nav-link").click( function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

console.log("here");