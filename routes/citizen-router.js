var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');
var mapInfo = require('../pic_data.js');

require('dotenv').load();

var router = express.Router();
var jsonParser = bodyParser.json();

var url_base = 'https://purdue-parking.appspot.com/_ah/api/purdueParking/1/'

router.get('/', function(req, res){
	res.render( 'citizen-home' );
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
			//console.log('GET account response:', JSON.parse(body).properties);
			// console.log(JSON.parse(body).properties);
			// console.log(JSON.parse(body).properties);
			res.render( 'citizen-account', JSON.parse(body).properties );
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

router.delete('/account', jsonParser, function(req, res){
	console.log(req);
	// console.log("delete user: ", req.body.username);
	request({
		url: url_base + 'deleteAccount?alt=json',
		method: 'DELETE',
		json: {
			username: req.body.username
		}
	},
	function(error, response, body){
		if(error)
			console.log("ERROR: ", error);
		else{
			res.sendStatus(200);
		}
	});
});

router.get('/tickets', function(req, res){
	var username = req.query.username; //Get username from client
	request({
		url: url_base + 'ticketcollection/' + username,
		method: 'GET'
	},
	function(error, response, body){
		if(error){
			res.send(error);
		}
		else{
			// console.log(body);
			res.render( 'citizen-tickets', JSON.parse(body) );
		}
		
	});
});

router.get('/map', function(req, res){
	// console.log(mapInfo);
	var extension = {
		helpers: {
			getWidth: getWidth
			, getHeight: getHeight
		}
	}
	var data = _.extend(mapInfo, extension);
	res.render( 'citizen-map', data );
});

function getWidth(topLeft, bottomRight){
	return bottomRight[0] - topLeft[0];
}

function getHeight(topLeft, bottomRight){
	return (topLeft[1] - bottomRight[1]) * -1;
}

router.get('/messages', function(req, res){
	request({
		url: url_base + 'messagecollection/1'
		, method: 'GET'
	},
	function(error, response, body){
		if(error){
			res.send(error);
		}
		res.render( 'message-board', JSON.parse(body) );
	});
});

router.post('/messages', jsonParser, function(req, res){
	//console.log("POST to /messages");
	//console.log(req.body);
	request({
		url: url_base + 'addMessage'
		, method: 'POST'
		, json: req.body
	},
	function(error, response, body){
		if(error){
			res.sendStatus(400);
		}
		else{
			console.log(body.properties);
			res.send(body.properties);
		}
		
	});
});

router.get('/messages/sortHelp', function(req, res){
	request({
		url: url_base + 'messagecollection/1'
		, method: 'POST'
	},
	function(error, response, body){
		if(error){
			// console.log('error');
			res.send(error);
		}
		// console.log(JSON.parse(body));
		res.render( 'message-board', JSON.parse(body) );
	});
});

router.get('/messages/sortVotes', function(req, res){
	request({
		url: url_base + 'messagecollection/1/true'
		, method: 'PUT'
	},
	function(error, response, body){
		if(error){
			// console.log('error');
			res.send(error);
		}
		// console.log(JSON.parse(body));
		res.render( 'message-board', JSON.parse(body) );
	});
});

router.get('/messages/:id', function(req, res){
	var id = req.params.id;
	var finalResponse = {
		message: req.query.message
		, messageID: id
		, comments : []
		, votes: req.query.votes
	}
	request({
		url: url_base + 'commentcollection/' + id
		, method: 'GET'
	},
	function(error, response, body){
		finalResponse.comments = JSON.parse(body).items;
		res.render('message', finalResponse);
	});
});

router.post('/messages/:id', jsonParser, function(req, res){
	request({
		url: url_base + 'addComment'
		, method: 'POST'
		, json: req.body
	},
	function(error, response, body){
		// console.log(JSON.parse(body));
		res.sendStatus(200);
	});
});

router.put('/messages/:id/vote', jsonParser, function(req, res){
	// console.log(req.body);
	var req_params = {
		url: url_base + 'upvote/' + req.params.id
		, method: 'POST'
	}

	if(!req.body.upvote){
		req_params.url = url_base + 'downvote/' + req.params.id;
	}

	request(req_params, function(error, response, body){
		console.log(JSON.parse(body));
		res.send(JSON.parse(body).properties);
	});
});

router.get('/vehicles', function(req, res){
	var user = req.query.username;
	request({
		url: url_base + 'vehiclecollection/' + user,
		method: 'GET'
	},
	function(error, response, body){
		if(error)
			console.log("ERROR: ", error);
		else{
			res.status(200);
			//res.send(body);
			// console.log(JSON.parse(body));
			res.render( 'citizen-vehicles', JSON.parse(body) );
		}
	});
	
})

router.post('/vehicles', jsonParser, function(req, res){
	// console.log('Post to /citizens/vehicles');
	request({
		url: url_base + 'addVehicle?alt=json',
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

router.put('/vehicles', jsonParser, function(req, res){
	request({
		url: url_base + 'editVehicle?alt=json',
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

router.delete('/vehicles', jsonParser, function(req, res){
	request({
		url: url_base + 'vehicle/' + req.body.carID,
		method: 'DELETE'
	},
	function(error, response, body){
		if(error)
			console.log("ERROR: ", error);
		else{
			res.sendStatus(200);
		}
	});
});

var tempUser = {
	username: 'anatoli',
	email: 'anatoli@purdue.edu',
	name: 'Anthony Natoli',
	phoneNumber: '1234567890',
	accountType: 'Citizen'
};

var testMessages = {
	testMsgs: [
		{
			message: 'I need help!'
			, timePosted: new Date()
			, owner: 'anatoli'
			, helpNeeded: true
			, messageID: 'abeoa32ab'
			, votes: 10
			, resolved: false
		},
		{
			message: "I need help too, I'm in the Ross Ade parking lot"
			, timePosted: new Date()
			, owner: 'anthony'
			, helpNeeded: true
			, messageID: '123'
			, votes: 25
			, resolved: true
		},
		{
			message: "Are C lots open to everyone right now?"
			, timePosted: new Date()
			, owner: 'anatoli'
			, helpNeeded: false
			, messageID: '15123'
			, votes: 2
			, resolved: false 
		}
	]
};

var testData = {
	layout: 'citizen-layout',
	name: 'Anthony'
	, email: 'anatoli@purdue.edu'
	, username: 'anatoli'
	, phone: '260-271-9467'
	, account_type: 'Citizen'
	, cars: [
		{
			make: 'Chevrolet'
			, model: 'Camaro'
			, year: '2012'
			, color: 'Black'
			, plateNumber: '123ABC'
			, plateState: 'Indiana'
			, carID: '123124432'
		},
		{
			make: 'Pontiac'
			, model: 'G6'
			, year: '2007'
			, color: 'Blue'
			, plateNumber: '123ACB'
			, plateState: 'Indiana'
			, carID: 'fqrr34q13'
		},
		{
			make: 'BMW'
			, model: 'M6'
			, year: '2012'
			, color: 'Black'
			, plateNumber: '113ABC'
			, plateState: 'Indiana'
			, carID: 'qerfoq3113'
		}
	]
};

module.exports = router;