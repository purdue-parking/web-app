var express = require('express');
var http = require('http');
var exhbs = require( 'express3-handlebars' );

var loginRouter = require( './routes/login-router' );
var citizenRouter = require( './routes/citizen-router' );
var policeRouter = require( './routes/police-router' );
var towRouter = require( './routes/tow-router' );
var pictureRouter = require( './routes/picture-router' );

require('dotenv').load();

var app = express();

var server = http.createServer(app);
var port = 3000; //for localhost testing

app.engine( 'handlebars', exhbs( { defaultLayout: 'citizen-layout' } ) );
app.set( 'view engine', 'handlebars' );

app.use( express.static( __dirname ) );

app.get( '/', function( req, res ){
	res.render( 'login', {layout: 'prelogin-layout'} );
});

app.get( '/env', function(req, res){
	res.send({
		cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
		cloudinary_key: process.env.CLOUDINARY_KEY,
		cloudinary_secret: process.env.CLOUDINARY_SECRET
	});
})

app.use( '/login', loginRouter );

app.use( '/citizen', citizenRouter );	//use router for all routes under /router/*

app.use( '/police', policeRouter );

app.use( '/tow', towRouter );

app.use( '/picture', pictureRouter );

server.listen(process.env.PORT || port, function(){
  console.log('listening on *:3000');
  console.log( __dirname );
});
