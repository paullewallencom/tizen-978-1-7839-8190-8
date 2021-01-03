function draw()
{
	var drawer = $('#pic')[0].getContext("2d");
	//write text
	drawer.fillStyle= '#000000';
	var nTextHeight = 20;
	drawer.font= nTextHeight + "px Arial";
	drawer.fillText('Hello Tizen',0 , nTextHeight);	
	//draw a blue square
	drawer.fillStyle= '#3366CC';
	var nSquareSide = 50;
	drawer.fillRect(0, nTextHeight+10, nSquareSide, nSquareSide);
	//draw an orange circle
	drawer.fillStyle='#FF6600';
	drawer.beginPath();
	var nRadius = 25;
	var nCenterX = nSquareSide + nRadius + 10; 
	var nCenterY = nTextHeight + 10 + nRadius;
	drawer.arc(nCenterX, nCenterY, nRadius, 0, 2*Math.PI);
	drawer.fill();
}

function clear()
{
	var canvas = $('#pic')[0];
	var drawer = canvas.getContext("2d");
	drawer.clearRect(0, 0, canvas.width, canvas.height );
}