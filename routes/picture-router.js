var express = require('express');
var crypto = require( 'crypto' );
var log = require('tablog');

require('dotenv').load();

var router = express.Router();

router.get( '/auth', function( req, res ){
	//Cloudinary cloudinary = new Cloudinary("cloudinary://CLOUDINARY_URL");

	log.info("ROUTE: GET /picture/auth");
	var shasum = crypto.createHash('sha1');
	var timestamp = ""+Math.round((new Date()).getTime() / 1000); //UNIX timestamp
	var public_id = req.query.public_id ? req.query.public_id : null;
	var params = '';

	params += public_id ? 'public_id=' + public_id + '&' : '';
	params += 'timestamp=' + timestamp + process.env.CLOUDINARY_SECRET;

	shasum.update( params );
	var signature = shasum.digest( 'hex' );
	var auth = {
		'signature': signature
		, 'public_id': public_id
		, 'timestamp': timestamp
		, 'api_key': process.env.CLOUDINARY_KEY
	}
	res.send( auth );

});

module.exports = router;