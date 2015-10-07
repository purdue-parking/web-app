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
});