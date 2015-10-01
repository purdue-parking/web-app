var express = require('express');
var router = express.Router();

router.get('/first_route', function(req, res){
	res.render('router');
});

module.exports = router;