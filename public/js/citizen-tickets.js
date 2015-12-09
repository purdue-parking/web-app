$('.pay-btn').click(function(){
	window.location = 'https://purdue.t2hosted.com/cit/index.aspx';
});

$('.appeal-btn').click(function(){
	window.location = 'https://www.purdue.edu/pat/forms/appealform.php';
})

$('.tow-btn').click(function(){
	var address = $(this).data('coords');
	var win = window.open('http://maps.google.com/?q=' + address, '_blank');
 	win.focus();
});