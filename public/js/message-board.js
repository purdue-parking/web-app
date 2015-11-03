console.log(user);

$('.message-field').click(function(){
	var row = $(this).closest('tr');
	var msgID = row.attr('id');

	window.location = window.location + '/' + msgID + '?message=' + $(this).html() + '&votes=' + row.find('#voteCount').html();
});

$('.up-btn').click(function(){
	var grouping = $(this).closest('td');
	var downBtn = grouping.find('.down-btn');
	var voteCount = parseInt(grouping.find('#voteCount').html());

	if(downBtn.prop('disabled')){
		voteCount += 2;
	}
	else{
		voteCount++;
	}

	downBtn.prop('disabled', false);
	$(this).prop('disabled', true);
	grouping.find('#voteCount').html(voteCount);
});

$('.down-btn').click(function(){
	var grouping = $(this).closest('td');
	var upBtn = grouping.find('.up-btn');
	var voteCount = parseInt(grouping.find('#voteCount').html());

	if(upBtn.prop('disabled')){
		voteCount -= 2;
	}
	else{
		voteCount--;
	}

	upBtn.prop('disabled', false);
	$(this).prop('disabled', true);
	grouping.find('#voteCount').html(voteCount);
});