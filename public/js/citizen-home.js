$( '#testBtn' ).click( function(){
	console.log( 'button clicked' );
	gapi.client.purdueParking.ticket.add({
		'ticketNum': 1234,
		'plateNum': '123ABC',
		'plateState': 'Indiana',
		'time': '1:23 pm',
		'date': 'August 8, 2014',
		'reason': 'You parked like a dick',
		'towAddress': null
	}).execute(function(resp){
		console.log(resp);
	});
});

console.log("hi from home");