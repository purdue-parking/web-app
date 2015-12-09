// queryParams = window.location.search.substr(1).split('&');

// for (pairNum in queryParams) {
//       var param = queryParams[pairNum].split('=');
//       if( param[0] == 'username'){
//       	user = param[1];
//       }
// }
// console.log(user);

var voteCount = parseInt($('#voteCount').html());;

$('#upBtn').click(function(){
	if($('#downBtn').prop('disabled')){
		voteCount += 2;
	}
	else{
		voteCount++;
	}

	$.ajax({
		url: window.location.href.split('?')[0] + '/vote'
		, method: 'PUT'
		, contentType: 'application/json'
		, data: JSON.stringify({
			upvote: true
		})
	}).done(function(data, textStatus, jqXHR){
		$('#upBtn').prop('disabled', true);
		$('#downBtn').prop('disabled', false);
		$('#voteCount').html(data.votes);
	});
	
});

$('#downBtn').click(function(){
	if($('#upBtn').prop('disabled')){
		voteCount -= 2;
	}
	else{
		voteCount--;
	}

	$.ajax({
		url: window.location.href.split('?')[0] + '/vote'
		, method: 'PUT'
		, contentType: 'application/json'
		, data: JSON.stringify({
			upvote: false
		})
	}).done(function(data, textStatus, jqXHR){
		$('#downBtn').prop('disabled', true);
		$('#upBtn').prop('disabled', false);
		$('#voteCount').html(data.votes);
	});
	
});

$('#comment-btn').click(function(){
	var comment = $('#comment-input').val()
	if(!comment){
		return;
	}
	
	$.ajax({
		url: window.location
		, method: 'POST'
		, contentType: 'application/json'
		, data: JSON.stringify({
			comment: comment
			, parent: parseInt($('#msg-container').data('msgid'))
			, username: user
		})
	}).done(function(){
		var html = '<div class="comment">' + comment + '</div><h4>-----------------------------------</h4>';
		$('#comments-container').append(html);
		$('#comment-input').val('');
	});
	
});