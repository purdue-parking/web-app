var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');

require('dotenv').load();

var router = express.Router();
var jsonParser = bodyParser.json();

var url_base = 'https://purdue-parking.appspot.com/_ah/api/purdueParking/1/'

router.post('/', jsonParser, function(req, res){
	var user = req.body.username;
	var pass = req.body.password;


});

router.get('/register', function(req, res){
	res.render('register', {layout: 'prelogin-layout'});
})

router.post('/register', jsonParser, function(req, res){
	request({
		url: url_base + 'addAccount',
		method: 'POST',
		json: req.body
	},
	function(error, response, body){
		if(error){
			console.log("ERROR: ", error);
			res.sendStatus(400);
		}
		else{
			//console.log('GET account response:', JSON.parse(body).properties);
			console.log(body.properties);
			//console.log(JSON.parse(body).properties);
			// console.log(JSON.parse(body).properties);
			res.send( body.properties );
		}
	});
});


module.exports = router;