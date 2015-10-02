var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render( 'tow-home', {layout: 'tow-layout'} ); 		
});

router.get('/account', function(req, res){
	res.render( 'tow-account', {layout: 'tow-layout'} );
});

router.get('/tickets', function(req, res){
	res.render( 'tow-tickets', {layout: 'tow-layout'} );
});

module.exports = router;