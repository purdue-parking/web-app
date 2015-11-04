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
	topMap.src = "/public/images/purdue_campus_map.jpg";
}

function color(obj){
	switch(obj.id){
		case "green":
			drawColor = "green";
			break;
		case "blue":
			drawColor = "blue";
			break;
		case "red":
			drawColor = "red";
			break;
		case "yellow":
			drawColor = "yellow";
			break;
		case "orange":
			drawColor = "orange";
			break;
		case "black":
			drawColor = "black";
			break;
		case "white":
			drawColor = white;
			break;
		case "purple":
			drawColor = "purple";
			break;
		case "brown":
			drawColor = "brown";
			break;
	}
	if (drawColor == "white")
		drawWidth = 14;
	else
		drawWidth = 2;
}

function changeSize(obj){
	switch(obj.id){
		case "small":
			drawWidth = 2;
			break;
		case "normal":
			drawWidth = 5;
			break;
		case "large":
			drawWidth = 8;
			break;
		case "huge":
			drawWidth = 11;
			break;
	}
}

function changeShape(obj){
	switch(obj.id){
		case "line":
			drawShape = "line";
			canvas.style.cursor="default";
			break;
		case "rectangle":
			drawShape = "rect";
			canvas.style.cursor="crosshair";
			break;
	}
}

function draw(){
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = drawColor;
	ctx.lineWidth = drawWidth;
	ctx.stroke();
	ctx.closePath();
}

function clearCanvas(){
	console.log("Clearing the canvas");
	ctx.clearRect(0,0,canvas.width,canvas.height);
		topMap.onload = function(){
		ctx.drawImage(topMap, 0, 0);
	}

	topMap.src = "/public/images/purdue_campus_map.jpg";
}

function save(){
	console.log("Saving the element");
	$('#myModal').modal('show');
}

$('#saveImageButton').click(function(){
	imageName = $('#save-image-name').val();
	console.log(imageName);
	document.getElementById("canvasImg").style.border = "2px solid";
	var dataURL = canvas.toDataURL();
	console.log(dataURL);
	document.getElementById("canvasImg").src = dataURL;
	document.getElementById("canvasImg").style.display = "inline";
});


function findxy(res, e){
	if(res == "down"){
		if(drawShape == "line"){
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
		}
		else if(drawShape == "rect"){
			getCursorPosition(e);
			console.log(currX, currY);
		}
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

			ctx.stroke();
			ctx.closePath();
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
}