$( document ).ready(function(){
	//TODO: change nav links for usernames -> put in separate file for only citizen layout
	var param = '?username=' + user;
	var oldAcctLink = "/police/account";
	var oldTicketsLink = "/police/tickets";
	var oldMapLink = "/police/map"
	var oldMessageLink = "/police/messages";

	$('#account-link').attr('href', oldAcctLink + param);
	$('#tickets-link').attr('href', oldTicketsLink + param);
	$('#map-link').attr('href', oldMapLink + param);
	$('#messages-link').attr('href', oldMessageLink + param);
});