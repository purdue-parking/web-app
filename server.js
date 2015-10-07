var express = require('express');
var http = require('http');
var exhbs = require( 'express3-handlebars' );

var citizenRouter = require( './routes/citizen-router' );
var policeRouter = require( './routes/police-router' );
var towRouter = require( './routes/tow-router');

var app = express();

var server = http.createServer(app);
var port = 3000; //for localhost testing

app.engine( 'handlebars', exhbs( { defaultLayout: 'citizen-layout' } ) );
app.set( 'view engine', 'handlebars' );

app.use( express.static( __dirname ) );

app.get( '/', function( req, res ){
	res.render( 'login' );
});

app.use( '/citizen', citizenRouter );	//use router for all routes under /router/*

app.use( '/police', policeRouter );

app.use( '/tow', towRouter);

server.listen(process.env.PORT || port, function(){
  console.log('listening on *:3000');
  console.log( __dirname );
});