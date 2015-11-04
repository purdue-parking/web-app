var express = require('express');
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var url_base = 'https://purdue-parking.appspot.com/_ah/api/purdueParking/1/'

router.get('/', function(req, res){
  res.render( 'police-home', {layout: 'police-layout'} ); 		
});

router.get('/account', function(req, res){
	var accountData={
	account:[
		{name: "Denver Kirschling", username: "dkirschl", account_type: "Police Officer"}	
	],
	layout: 'police-layout'
	}
	res.render( 'police-account', accountData );
});

router.get('/tickets', function(req, res){
	//Get all tickets function since they are a police man/woman
	res.render( 'police-tickets', 'police-layout');
});

router.post('/tickets', jsonParser, function(req, res){
	request({
		url: url_base + 'addTicket?alt=json',
		method: 'POST',
		json: req.body
	},
 	function(error, response, body){
	 	if( error )
	 		console.log("ERROR: ", error);
	 	else{
	 		res.status(200);
	 		res.send(body);
	 	}
	});
	console.log(req.body);
});

router.get('/map', function(req, res){
	res.render( 'police-map', {layout: 'police-layout'} );
});

module.exports = router;
