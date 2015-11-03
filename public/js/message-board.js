console.log(user);

$('.message-field').click(function(){
	var row = $(this).closest('tr');
	var msgID = row.attr('id');

	window.location = window.location + '/' + msgID + '?message=' + $(this).html() + '&votes=' + row.find('#voteCount').html();
});
