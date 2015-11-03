var voteCount = parseInt($('#voteCount').html());;

$('#upBtn').click(function(){
	if($('#downBtn').prop('disabled')){
		voteCount += 2;
	}
	else{
		voteCount++;
	}
	$('#upBtn').prop('disabled', true);
	$('#downBtn').prop('disabled', false);
	$('#voteCount').html(voteCount);
});

$('#downBtn').click(function(){
	if($('#upBtn').prop('disabled')){
		voteCount -= 2;
	}
	else{
		voteCount--;
	}
	$('#downBtn').prop('disabled', true);
	$('#upBtn').prop('disabled', false);
	$('#voteCount').html(voteCount);
});

$('#comment-btn').click(function(){
	var comment = $('#comment-input').val()
	if(!comment){
		return;
	}
	var html = '<div class="comment">' + comment + '</div>';
	$('#comments-container').append(html);
	$('#comment-input').val('');
});