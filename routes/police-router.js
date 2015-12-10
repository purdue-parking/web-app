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
	var username = req.query.username;
	//TODO: make api call to get helper data
	//getAccount function not written in API yet
	request({
		url: url_base + 'entity/' + username,
		method: 'GET',
	},
	function(error, response, body){
		if(error){
			console.log("ERROR: ", error);
			res.sendStatus(400);
		}
		else{
			console.log('GET account response:', JSON.parse(body));
			// console.log(JSON.parse(body).properties);
			// console.log(JSON.parse(body).properties);
			res.render( 'police-account', _.extend(JSON.parse(body).properties, {layout: 'police-layout'}));
		}
	});
	//res.render( 'citizen-account', testData );
});

router.put('/account', jsonParser, function(req, res){
	//tempUser = req.body;
	// console.log("Here: ", req.body);
	request({
		url: url_base + 'editAccount?alt=json',
		method: 'POST',
		json: req.body
	},
	function(error, response, body){
		if(error)
			console.log("ERROR: ", error);
	});
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

router.post('/map', jsonParser, function(req, res){
	request({
		url: url_base + 'addLotInfo?alt=json',
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

router.delete('/map', jsonParser, function(req, res){
	request({
		url: url_base + 'coloredlotinfo',
		method: 'DELETE'
	},
	function(error, response, body){
		if(error)
			console.log("ERROR: ", error);
		else{
			res.status(200);
			res.send(body);
		}
	})
})


module.exports = router;
