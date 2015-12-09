$( document ).ready(function(){
	//TODO: change nav links for usernames -> put in separate file for only citizen layout
	var param = '?username=' + user;
	var oldAcctLink = "/citizen/account";
	var oldVehiclesLink = "/citizen/vehicles";
	var oldTicketsLink = "/citizen/tickets";
	var oldMapLink = "/citizen/map"
	var oldMessageLink = "/citizen/messages";

	$('#account-link').attr('href', oldAcctLink + param);
	$('#vehicles-link').attr('href', oldVehiclesLink + param);
	$('#tickets-link').attr('href', oldTicketsLink + param);
	$('#map-link').attr('href', oldMapLink + param);
	$('#messages-link').attr('href', oldMessageLink + param);
});