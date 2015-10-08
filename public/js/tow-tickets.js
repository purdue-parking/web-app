// 
// var source = $("#entry-template").html();
// var template = Handlebars.compile(source);
// var html = template(testData);
// $('#result').html(html);

$('#createBtn').click(function(){
	$('#myModal').modal('show')
});

$('#newTicketBtn').click(function(){
	var ticketNumber = $('#new-ticket-number').val();
	var ticketDate = $('#new-ticket-date').val();
	var ticketLicensePlate = $('#new-ticket-license-plate').val();
	var ticketState = $('#new-ticket-state').val();
	var ticketComments = $('#new-ticket-comments').val();
	$('#ticketTable').append(newRow(ticketNumber, ticketDate, ticketLicensePlate, ticketState, ticketComments));
});

function newRow(ticketNumber, ticketDate, ticketLicensePlate, ticketState, ticketComments){
	var newRow = '<tr>'
					+ '<td>' + ticketNumber + '</td>'
					+ '<td>' + ticketDate + '</td>'
					+ '<td>' + ticketLicensePlate + '</td>'
					+ '<td>' + ticketState + '</td>'
					+ '<td>' + ticketComments + '</td>'
					+ '<td> <button type="button" class="btn btn-primary edit-ticket">Edit</button> </td>' + 
				'</tr>';
	return newRow;
}