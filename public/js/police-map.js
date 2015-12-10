var canvas;
var ctx;
var isDrawing = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var dot_flag = false;
var w;
var h;

var drawColor = "black";
var drawWidth = 2;
var drawShape = "line";

var topMap = new Image();
var imageName;

var restricted_points = [];
var restricted_passes = [];
var restricted_times = [];
var restricted_color = [];
var rp_inc = 0;

function prepareCanvas(){
	canvas = document.getElementById('mapCanvas');
	ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;
	
	canvas.addEventListener("mousemove", function(e){
		findxy('move', e)
	}, false);
	canvas.addEventListener("mousedown", function(e){
		findxy('down', e)
	}, false);
	canvas.addEventListener("mouseup", function(e){
		findxy('up', e)
	}, false);
	canvas.addEventListener("mouseout", function(e){
		findxy('out', e);
	}, false);
	
	topMap.onload = function(){
		ctx.drawImage(topMap, 0, 0);
	}

	drawShape = "rect";
	canvas.style.cursor="crosshair";
	topMap.src = "/public/images/purdue_campus_map.jpg";
}

function color(obj){
	switch(obj.id){
		case "green":
			drawColor = "green";
			break;
		case "red":
			drawColor = "red";
			break;
		case "purple":
			drawColor = "purple";
			break;
	}
	drawWidth = 2;
}

/*function draw(){
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = drawColor;
	ctx.lineWidth = drawWidth;
	ctx.stroke();
	ctx.closePath();
}*/

function clearCanvas(){
	console.log("Clearing the canvas");
	ctx.clearRect(0,0,canvas.width,canvas.height);
		topMap.onload = function(){
		ctx.drawImage(topMap, 0, 0);
	}

	topMap.src = "/public/images/purdue_campus_map.jpg";
}

function save(){
	imageName = $('#save-image-name').val();
	console.log(imageName);
	document.getElementById("canvasImg").style.border = "2px solid";
	var dataURL = canvas.toDataURL();
	console.log(dataURL);
	document.getElementById("canvasImg").src = dataURL;
	document.getElementById("canvasImg").style.display = "inline";

	$.ajax({
		url: window.location,
		method: 'DELETE'
	});

	var x = 0;
	for(x; x < rp_inc; x++){
		console.log("New ajax");
		console.log("Points: (" + restricted_points[x][0] + "," + restricted_points[x][1] + ") -> (" + restricted_points[x][2] + "," + restricted_points[x][3] + ")");
		console.log("Times: " + restricted_times[x][0] + "->" + restricted_times[x][1]);
		console.log("Passes: " + restricted_passes[x]);
		$.ajax({
			url: window.location,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				x1: restricted_points[x][0],
				y1: restricted_points[x][1],
				x2: restricted_points[x][2],
				y2: restricted_points[x][3],
				parkingPasses: restricted_passes[x],
				timeRestrictions: restricted_times[x][0] + "-" + restricted_times[x][1],
				color: restricted_color[x]
			})
		})
	}
}

function findxy(res, e){
	if(res == "down"){
		/*if(drawShape == "line"){
			prevX = currX;
			prevY = currY;
			getCursorPosition(e);
			console.log(currX, currY);
			isDrawing = true;
			dot_flag = true;
			
			if(dot_flag){
				ctx.beginPath();
				ctx.fillStyle = drawColor;
				ctx.fillRect(currX, currY, 2, 2);
				ctx.closePath()
				dot_flag = false;
			}
		}*/
		//else if(drawShape == "rect"){
		getCursorPosition(e);
		console.log(currX, currY);
		//}
	}
	if(res == 'up'){
		isDrawing = false;
		if(drawShape == "rect"){
			prevX = currX;
			prevY = currY;
			getCursorPosition(e);
			
			ctx.beginPath();
			ctx.strokeStyle = drawColor;
			ctx.lineWidth = drawWidth;
			drawRect();
		}
	}
	if(res == 'out'){
		isDrawing = false;
	}
	if(res == 'move'){
		if (isDrawing){
			prevX = currX;
			prevY = currY;
			getCursorPosition(e)
			draw();
		}
	}
}

function getCursorPosition(e){
	currX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	currY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	currX -= canvas.offsetLeft;
	currY -= canvas.offsetTop;
	currX = Math.floor(currX);
	currY = Math.floor(currY);
}

function drawRect(){
	// Get the rest of the restriction points
	$('#myModal').modal('show');
}

$('#topCloseButton').click(function(){
	ctx.stroke();
	ctx.closePath();
})

$('#closeButton').click(function(){
	ctx.stroke();
	ctx.closePath();
})

$('#updateRestButton').click(function(){
	console.log("Draw the rectangle");
	var allowed_parking = $('#parking-pass-restrictions').val();
	var first_time = $('#earlier-time-restrictions').val();
	var second_time = $('#later-time-restrictions').val();

	if(first_time > second_time){
		window.alert("The first time entered is greater than the second time");
	}
	else if(first_time == "" || second_time == ""){
		window.alert("Please set all values");
	}
	else{ // Draw the Rectanggle
		ctx.moveTo(prevX, prevY); //Move to the top left
		ctx.lineTo(currX, prevY); //Draw to the top right
		ctx.lineTo(currX, currY); //Draw to the bottom right
		ctx.lineTo(prevX, currY); //Draw to the bottom left
		ctx.lineTo(prevX, prevY); //Draw to the top left

		var rectangle_width = Math.abs(currX - prevX);
		var number_of_lines = 5;
		var move_by = rectangle_width / number_of_lines;

		var x = 0;
		for(x; x < number_of_lines; x++){
			if(currX > prevX && currY < prevY)
			{
				ctx.moveTo(currX - (x*move_by), prevY);
				ctx.lineTo(currX - ((x+1)*move_by), currY);
			}
			else if(currX > prevX && currY > prevY){
				ctx.moveTo(currX - (x*move_by), currY);
				ctx.lineTo(currX -((x+1)*move_by), prevY);
			}
			else if(currX < prevX && currY < prevY){
				ctx.moveTo(prevX - (x*move_by), prevY);
				ctx.lineTo(prevX - ((x+1)*move_by), currY);
			}
			else{
				ctx.moveTo(prevX - (x*move_by), currY);
				ctx.lineTo(prevX - ((x+1)*move_by), prevY);
			}
		}
		console.log("finished drawing rectangle");
		ctx.stroke();
		ctx.closePath();

		// Find the top left and bottom right points
		var top_leftx, top_lefty, bot_rightx, bot_righty;
		if(prevX < currX){
			top_leftx = prevX;
			bot_rightx = currX;
		}
		else{
			top_leftx = currX;
			bot_rightx = prevX
		}
		if(prevY < currY){
			top_lefty = prevY;
			bot_righty = currY;
		}
		else{
			top_lefty = currY;
			bot_righty = prevY;
		}

		// Input the restricted points into the array
		restricted_points[rp_inc] = [top_leftx, top_lefty, bot_rightx, bot_righty];

		// Change the first time to the correct format
		var hours = first_time.substring(0,2);
		var rest = first_time.substring(2);
		var ampm = "a.m.";

		if(hours > 12){
			hours -= 12;
			ampm = "p.m.";
		}
		else if(hours == 12){
			ampm = "p.m.";
		}

		first_time = hours + rest + ampm;
		
		// Change the second time to the correct format
		hours = second_time.substring(0,2);
		rest = second_time.substring(2);
		ampm = "a.m.";

		if(hours > 12){
			hours -= 12;
			ampm = "p.m.";
		}
		else if(hours == 12){
			ampm = "p.m.";
		}

		second_time = hours + rest + ampm;

		// Input the times into the array
		restricted_times[rp_inc] = [first_time, second_time];

		// Input the passes into the array
		restricted_passes[rp_inc] = allowed_parking;

		// Input the color into the array
		restricted_color[rp_inc] = drawColor;

		// Increment all of the arrays
		rp_inc++;
		$('#myModal').modal('hide');		// Hide the modal
	}
});