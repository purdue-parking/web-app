var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render( 'tow-home', {layout: 'tow-layout'} ); 		
});

router.get('/account', function(req, res){
	var accountData={
		account:[
			{account_name: "Dr. B's Towing Emporium", location:"Other Side of Town"},
			{account_name: "Generic Towing Company", location:"You won't find us"}
		],
		layout: 'tow-layout'
	}
	res.render( 'tow-account', accountData);
});

router.get('/tickets', function(req, res){
	var ticketData={
	ticket: [
		{ticket_number: "0001", date: "3/11/94", license_plate: "SQH492",state: "IN",comments: "Owner asked for car to be removed"},
		{ticket_number: "0002", date: "4/25/15", license_plate: "DE8932",state: "MI",comments: "Owner asked for car to be removed"}	
	],
	layout: 'tow-layout'
};

	res.render( 'tow-tickets', ticketData);
});

module.exports = router;