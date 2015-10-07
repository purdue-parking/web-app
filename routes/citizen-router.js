var express = require('express');
var request = require('request');
var router = express.Router();

var url_base = 'https://purdue-parking.appspot.com/_ah/api/purdueParking/1/'

router.get('/', function(req, res){
	// request({
	// 		url: url_base + 'createTicket?alt=json',
	// 		method: 'POST',
	// 		json: {
	// 			'ticketNum': 1234,
	// 			'plateNum': '123ABC',
	// 			'plateState': 'Indiana',
	// 			'time': '1:23 pm',
	// 			'date': 'August 8, 2014',
	// 			'reason': 'You parked like a dick',
	// 			'towAddress': null
	// 		}
	// 	},
	// 	function(error, response, body){
	// 		if( error )
	// 			console.log("ERROR: ", error);
	// 		console.log(body);
	// 		res.render( 'citizen-home', body );
	// 	}
	// );
	res.render( 'citizen-home' );
});

router.get('/account', function(req, res){
	//TODO: make api call to get helper data
	//getAccount function not written in API yet
	// request({
	// 	url: url_base + 'getAccount?alt=json',
	// 	method: 'GET',
	// 	json: req.body.username
	// },
	// function(error, response, body){
	// 	if(error){
	// 		console.log("ERROR: ", error);
	// 		res.sendStatus(400);
	// 	}
	// 	else{
	// 		res.render( 'citizen-account', body );
	// 	}
	// });
	res.render( 'citizen-account', testData );
});

router.put('/account', function(req, res){
	tempUser = req.body;
	request({
		url: url_base + 'editAccount?alt=json',
		method: 'POST',
		json: tempUser
	},
	function(error, response, body){
		if(error)
			console.log("ERROR: ", error);
	});
});

router.delete('/account', function(req, res){
	request({
		url: url_base + 'deleteAccount?alt=json',
		method: 'DELETE',
		json: req.body.username
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
	//var user = req.body.username; //Get username from client
	request({
		url: url_base + 'getTickets?alt=json',
		method: 'GET',
		json: {
			username: 'anatoli'
		}
	},
	function(error, response, body){
		res.render( 'citizen-tickets', body );
	});
});

router.get('/map', function(req, res){
	res.render( 'map' );
});

router.get('/messages', function(req, res){
	res.render( 'message-board' );
});

var tempUser = {
	username: 'anatoli',
	email: 'anatoli@purdue.edu',
	name: 'Anthony Natoli',
	phoneNumber: '1234567890',
	accountType: 'Citizen'
}

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
			, plate_num: '123ABC'
			, state: 'Indiana'
		},
		{
			make: 'Pontiac'
			, model: 'G6'
			, year: '2007'
			, color: 'Blue'
			, plate_num: '123ACB'
			, state: 'Indiana'
		},
		{
			make: 'BMW'
			, model: 'M6'
			, year: '2012'
			, color: 'Black'
			, plate_num: '113ABC'
			, state: 'Indiana'
		}
	]
};

module.exports = router;