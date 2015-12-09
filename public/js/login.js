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
		var transfer = window.location + 'citizen/messages?username=' + user;
		window.location = transfer;
	});		 
});

$('#signup-btn').click(function(){
	window.location = location.origin + 'login/register';
});