var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render( 'police-home', {layout: 'police-layout'} ); 		
});

router.get('/account', function(req, res){
	res.render( 'police-account', {layout: 'police-layout'} );
});

router.get('/tickets', function(req, res){
	res.render( 'police-tickets', {layout: 'police-layout'} );
});

router.get('/map', function(req, res){
	res.render( 'police-map', {layout: 'police-layout'} );
});
module.exports = router;