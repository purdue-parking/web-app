$('#login-btn').click(function(){
	var username = $('#username-field').val();
	var pass = $('#password-field').val();

	$.ajax({
		url: window.location + 'login'
		, method: 'POST'
		, contentType: 'application/json'
		, data: JSON.stringify({
			username: username
			, password: pass
		})
	}).done(function( acctInfo ){
		user = acctInfo.username;
		var transfer;
		if(acctInfo.accountType === "CITIZEN"){
			transfer = window.location + 'citizen/messages?username=' + user;
		}
		else if(acctInfo.accountType === "POLICE"){
			transfer = window.location + 'police/tickets';
		}
		else{
			transfer = window.location + 'tow';
		}
		window.location = transfer;
	});		 
});

$('#signup-btn').click(function(){
	window.location = location.origin + 'login/register';
});