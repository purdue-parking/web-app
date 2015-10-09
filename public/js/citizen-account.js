// 
// var source = $("#entry-template").html();
// var template = Handlebars.compile(source);
// var html = template(testData);
// $('#result').html(html);

$('#editBtn').click(function(){
	$('.account-field').prop("disabled", false);
	$('#saveBtn').prop("disabled", false);
});

$('#saveBtn').click(function(){
	$('#saveBtn').prop("disabled", true);
	$('.account-field').prop("disabled", true);
	
	//TODO: save all fields
	$.ajax({
		url: window.location,
		method: 'PUT',
		dataType: 'json',
		data: {
			username: $('#username-field').val(),
			email: $('#email-field').val(),
			phoneNumber: $('#phone-field').val(),
			name: $('#name-field').val()
		}
	}).done(function(){

	});
});

$('#deleteBtn').click(function(){
	$.ajax({
		url: window.location,
		method: 'DELETE',
		dataType: 'json',
		data: JSON.stringify({
			'username': 'deletethis'
		})
	}).done(function(){
		console.log("deleted user: deletethis");
	});
});