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

var user;
var cloudinary_name;
var cloudinary_key;
var cloudinary_secret;


//set user variable
queryParams = window.location.search.substr(1).split('&');

for (pairNum in queryParams) {
      var param = queryParams[pairNum].split('=');
      if( param[0] == 'username'){
      	user = param[1];
      }
}
console.log(user);

$.ajax({
	url: location.origin + "/env",
	method: 'GET'
}).done(function(data){
	cloudinary_name = data.cloudinary_name;
	cloudinary_key = data.cloudinary_key;
	cloudinary_secret = data.cloudinary_secret;

	// console.log(cloudinary_name);
});

$(".nav-link").on('click', function(){
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