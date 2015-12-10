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
	var ticketLicensePlate = $('#new-ticket-license-plate').val();
	var ticketState = $('#new-ticket-state').val();
	var ticketComments = $('#new-ticket-comments').val();
	var ticketTowAddress = $('#new-ticket-tow-address').val();

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
			towAddress: ticketTowAddress
		})
	});

	$('#ticketTable').append(newRow(ticketNumber, ticketDate, ticketTime, ticketLicensePlate, ticketState, ticketComments, ticketTowAddress));
});

function newRow(ticketNumber, ticketDate, ticketTime, ticketLicensePlate, ticketState, ticketComments, ticketTowAddress){
	var newRow = '<tr>'
					+ '<td>' + ticketNumber + '</td>'
					+ '<td>' + ticketTime + '</td>'
					+ '<td>' + ticketDate + '</td>'
					+ '<td>' + ticketLicensePlate + '</td>'
					+ '<td>' + ticketState + '</td>'
					+ '<td>' + ticketComments + '</td>'
					+ '<td>' + ticketTowAddress + '</td>'
					+ '<td> <button type="button" class="btn btn-primary edit-ticket">Edit</button> </td>' + 
				'</tr>';
	return newRow;
}