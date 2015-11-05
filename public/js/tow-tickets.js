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
	var ticketTime = $('#new-ticket-time').val();
	var ticketDate = $('#new-ticket-date').val();
	var ticketParkingPass = $('#new-ticket-parking-pass').val();
	var ticketLicensePlate = $('#new-ticket-license-plate').val();
	var ticketState = $('#new-ticket-state').val();
	var ticketComments = $('#new-ticket-comments').val();

	$.ajax({
		url: window.location
		, method: 'POST'
		, contentType: 'application/json'
		, data: JSON.stringify({
			ticketNumber: ticketNumber,
			plateNumber: ticketLicensePlate,
			plateState: ticketState,
			time: ticketTime,
			date: ticketDate,
			reason: ticketComments,
			towAddress: 'Other Side of Town'
		})
	});

	$('#ticketTable').append(newRow(ticketNumber, ticketDate, ticketTime, ticketParkingPass, ticketLicensePlate, ticketState, ticketComments));
});

function newRow(ticketNumber, ticketDate, ticketTime, ticketParkingPass, ticketLicensePlate, ticketState, ticketComments){
	var newRow = '<tr>'
					+ '<td>' + ticketNumber + '</td>'
					+ '<td>' + ticketTime + '</td>'
					+ '<td>' + ticketDate + '</td>'
					+ '<td>' + ticketParkingPass + '</td>'
					+ '<td>' + ticketLicensePlate + '</td>'
					+ '<td>' + ticketState + '</td>'
					+ '<td>' + ticketComments + '</td>'
					+ '<td> <button type="button" class="btn btn-primary edit-ticket">Edit</button> </td>' + 
				'</tr>';
	return newRow;
}