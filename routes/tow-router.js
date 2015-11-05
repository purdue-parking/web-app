var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();

var jsonParser = bodyParser.json();

var url_base = 'https://purdue-parking.appspot.com/_ah/api/purdueParking/1/'

router.get('/', function(req, res){
  res.render( 'tow-home', {layout: 'tow-layout'} ); 		
});

router.get('/account', function(req, res){
	var accountData={
	account:[
		{name: "Denver Kirschling", username: "dkirschl", account_type: "Police Officer"}	
	],
	layout: 'tow-layout'
	}
	res.render( 'tow-account', accountData );
});

router.get('/tickets', function(req, res){
	//Get all tickets function since they are a police man/woman
	res.render( 'tow-tickets', {layout: 'tow-layout'});
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
	 		console.log(body);
	 		res.status(200);
	 		res.send(body);
	 	}
	});
	console.log(req.body);
});

module.exports = router;
