$('#register-btn').click(function(){
	$.ajax({
		url: window.location
		, method: 'POST'
		, contentType: 'application/json'
		, data: JSON.stringify({
			'email': $('#email').val()
			,'name': $('#name').val()
			,'phoneNumber': $('#phone').val()
			,'username': $('#username').val()
			,'accountType': 'CITIZEN'
			,'password': $('#password').val()
		})
	}).fail(function(){
		alert("Username already exists");
	}).done(function( acctInfo ){
		user = acctInfo.username;
		window.location = location.origin + '/citizen/messages?username=' + user;
	});
});
