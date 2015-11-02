var express = require('express');
var router = express.Router();

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
	var ticketData={
	ticket: [
		{ticket_number: "15823", date: "3/11/94", parking_pass: "C 105682" , license_plate: "SQH492",state: "IN",comments: "This car has been parked incorrectly"},
		{ticket_number: "35932", date: "4/25/15", parking_pass: "NA" , license_plate: "DE8932",state: "MI",comments: "No Parking Pass"}	
	],
	layout: 'police-layout'

	request({
		url: url_base + 'createTicket?alt=json',
		method: 'POST',
		json: req.body
	})
};

	res.render( 'police-tickets', ticketData);
});

router.get('/map', function(req, res){
	res.render( 'police-map', {layout: 'police-layout'} );
});

module.exports = router;
