$('.edit-car').click(function(){
	$(this).closest('tr').find('.table-input').prop('disabled', false);
});

$('.delete-car').click(function(){
	var row = $(this).closest('tr');
	var carId = row.data('carid');
	$.ajax({
		url: window.location
		, type: 'DELETE'
		, data: {
			carID: carId
		}
	}).done(function(){
		row.remove();
	});
});

$('.save-car').click(function(){
	$(this).closest('tr').find('.table-input').prop('disabled', true);
	// $.ajax({
	// 	url: window.location,
	// 	method: 'POST',
	// 	dataType: 'json',
	// 	data: {
			
	// 	}
	// }).done(function(){
		
	// });
});

$('#add-car').click(function(){
	$('#car-table-body').append(newRow());
});


function newRow(){
	var rowHtml = '<tr id>'
					+'<td><input type="text" class="table-input make-field"></input></td>'
					+ '<td><input type="text" class="table-input model-field"></input></td>'
					+ '<td><input type="text" class="table-input year-field"></input></td>'
					+ '<td><input type="text" class="table-input color-field"></input></td>'
					+ '<td><input type="text" class="table-input plate-field"></input></td>'
					+ '<td><input type="text" class="table-input state-field"></input></td>'
					+ '<td><button type="button" class="btn btn-primary edit-car">Edit</button>'
						+ '<button type="button" class="btn btn-success save-car">Save</button>'
						+ '<button type="button" class="btn btn-danger delete-car">Delete</button></td>'
				+ '</tr>';
	return rowHtml;
}