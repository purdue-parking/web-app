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

var user = "anthony";

$(".nav-link").click( function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

function init(){
	apiRoot = 'https://purdue-parking.appspot.com/_ah/api';
	gapi.client.load('purdueParking', '1', afterAPILoad, apiRoot);
}

function afterAPILoad() {
	console.log("Api loaded");
}

console.log("here");