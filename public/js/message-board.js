// queryParams = window.location.search.substr(1).split('&');

// for (pairNum in queryParams) {
//       var param = queryParams[pairNum].split('=');
//       if( param[0] == 'username'){
//       	user = param[1];
//       }
// }
// console.log(user);

$('.message-field').click(function(){
	var row = $(this).closest('tr');
	var msgID = row.attr('id');

	window.location = location.origin + '/citizen/messages' + '/' + msgID + '?username=' + user + '&message=' + $(this).find('.message-text').html() + '&votes=' + row.find('#voteCount').html();
});

$('#sortHelp').click(function(){
	console.log("click");
	window.location = location.origin + '/citizen/messages/sortHelp?username=' + user;
});

$('#sortVotes').click(function(){
	window.location = location.origin + '/citizen/messages/sortVotes?username=' + user;
});

$('#add-msg').click(function(){
	$('#addMsgModal').modal('show');
})

$('#saveNewMsg').click(function(){
	var message = $('#messageTextArea').val();
	var isHelpNeeded = $('#isHelpNeeded').prop('checked');

	$.ajax({
		url: location.origin + '/citizen/messages'
		, method: 'POST'
		, contentType: 'application/json'
		, data: JSON.stringify({
			message: message
			, username: user
			, helpNeeded: isHelpNeeded
			, resolved: false
		})
	}).done(function(data, textStatus, jqXHR){
		$('#addMsgModal').modal('hide')
		$('#messageTextArea').val('');
		$('#isHelpNeeded').prop('checked', false);

		// var rowHtml = '<tr class="message-row" id="' + data.messageID + '"><td class="message-field">' + data.message + '</td>' +
		// 			'<td class="message-votes"><div id="voteCount" style="float: left; margin-left: 8px; margin-top: 4px">' + data.votes + '</div>' +
		// 			'<div class="vote-buttons" style="float: left"><button type="button" class="btn btn-info up-btn">' +
		// 			'<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>' +
		// 			'<button type="button" class="btn btn-info down-btn"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></button></div></td></tr>';
	
		// $('#msg-table-body').prepend(rowHtml);
		window.location = window.location;
	});
	console.log(message);
	console.log(isHelpNeeded);
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

	$.ajax({
		url: window.location.href.split('?')[0] + '/' + grouping.closest('tr').attr('id') + '/vote'
		, method: 'PUT'
		, contentType: 'application/json'
		, data: JSON.stringify({
			upvote: true
		})
	}).done(function(data, textStatus, jqXHR){
		downBtn.prop('disabled', false);
		$(this).prop('disabled', true);
		grouping.find('#voteCount').html(voteCount);
	});
	
	
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

	$.ajax({
		url: window.location.href.split('?')[0] + '/' + grouping.closest('tr').attr('id') + '/vote'
		, method: 'PUT'
		, contentType: 'application/json'
		, data: JSON.stringify({
			upvote: true
		})
	}).done(function(data, textStatus, jqXHR){
		upBtn.prop('disabled', false);
		$(this).prop('disabled', true);
		grouping.find('#voteCount').html(voteCount);
	});
	
});