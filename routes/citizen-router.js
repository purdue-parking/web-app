var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render( 'citizen-home' ); 		//renders the views/citizen-home.handlebars view
});

router.get('/account', function(req, res){
	res.render( 'citizen-account' );
});

router.get('/tickets', function(req, res){
	res.render( 'citizen-tickets' );
});

router.get('/map', function(req, res){
	res.render( 'map' );
});

module.exports = router;