var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');
var cloudinary = require('cloudinary');
var router = express.Router();

var jsonParser = bodyParser.json();

var url_base = 'https://purdue-parking.appspot.com/_ah/api/purdueParking/1/';

router.get('/', function(req, res){
	//Get all tickets function since they are a police man/woman
	console.log("Getting all the tickets");
	request({
		url: url_base + 'ticketcollection/' + req.query.username,
		method: 'POST'
	},
	function(error, response, body){
		if(error){
			console.log("ERROR: ", error);
			res.sendStatus(400);
		}
		else{
			console.log("Body Properties");
			console.log(JSON.parse(body));
			console.log("That was the exciting body");
			res.render('police-tickets', _.extend(JSON.parse(body), {layout: 'police-layout'}));
		}
	})
});	

function formatDate(dateStr){
	if( dateStr ){
		var date = new Date(dateStr);
		return date.toLocaleString();
	}
	else
		return '';
}

router.get('/messages', function(req, res){
	request({
		url: url_base + 'usermessagecollection/1'
		, method: 'GET'
	},
	function(error, response, body){
		if(error){
			res.send(error);
		}
		var extension = {
			layout: 'police-layout'
			, helpers: {
				formatDate: formatDate
			}
		}
		res.render( 'message-board',  _.extend(JSON.parse(body), extension) );
	});
});

router.get('/tickets', function(req, res){
	//Get all tickets function since they are a police man/woman
	console.log("Getting all the tickets");
	request({
		url: url_base + 'ticketcollection/' + req.query.username,
		method: 'POST'
	},
	function(error, response, body){
		if(error){
			console.log("ERROR: ", error);
			res.sendStatus(400);
		}
		else{
			console.log("Body Properties");
			console.log(JSON.parse(body));
			console.log("That was the exciting body");
			res.render('police-tickets', _.extend(JSON.parse(body), {layout: 'police-layout'}));
		}
	})
});

router.get('/map', function(req, res){
	res.render( 'police-map', {layout: 'police-layout'} );
});

router.get('/account', function(req, res){
	console.log("Getting the police account page");
	res.render( 'police-account', {layout: 'police-layout'});
})

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

router.post('/map', jsonParser, function(req, res){
	request({
		url: url_base + '',
		method: 'POST',
		json: req.body
	},
	function(error, response, body){
		if(error)
			console.log("ERROR: ", error);
		else{
			res.status(200);
			res.send(body);
		}
	});
});


module.exports = router;
