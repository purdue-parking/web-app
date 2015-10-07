var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render( 'citizen-home' ); 		//renders the views/citizen-home.handlebars view
});

router.get('/account', function(req, res){
	//TODO: make api call to get helper data
	res.render( 'citizen-account', testData );
});

router.get('/tickets', function(req, res){
	res.render( 'citizen-tickets' );
});

router.get('/map', function(req, res){
	res.render( 'map' );
});

router.get('/messages', function(req, res){
	res.render( 'message-board' );
});

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