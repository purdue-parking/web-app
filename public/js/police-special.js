$('#createBtn').click(function(){
	$('#myModal').modal('show')
});

$('#newEventButton').click(function(){
	var eventDate = $('#new-event-date').val();
	var eventName = $('#new-event-name').val();
	var eventDescription = $('#new-event-description').val();

	$('#eventTable').append(newRow(eventDate, eventName, eventDescription));
});

function newRow(eventDate, eventName, eventDescription){
	var newRow = '<tr>'
					+ '<td>' + eventDate + '</td>'
					+ '<td>' + eventName + '</td>'
					+ '<td>' + eventDescription + '</td>'
					+ '<td> <button type="button" class="btn btn-primary edit-ticket">Edit</button> </td>' + 
				'</tr>';
	return newRow;
}