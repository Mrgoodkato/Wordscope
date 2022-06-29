//Sets up canvas as a variable that can be attached to an HTML element in setup()
var myCanvas;
//Creates dots array var that will be used to create each Dots object from the class constructor
var dots = [];
var xPos, yPos;
var initX = 0, endX = 0, difX = 0, changeX = 0, xMove = 0;
var initY = 0, endY = 0, difY = 0, changeY = 0, yMove = 0;
var zoom = 1;

function setup(){
    myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.style('z-index', '-1');
}

//Called each time the "space" key is pressed to populate with new dots according to the
//textarea content at the time
function populate(check){
    
    check ? populateDots(dots, stringData) : refreshDots(dots, stringData);

}

//Draw dots each frame
function draw(){

    let bgArray = hexToRGB(backgroundColor.value);

    background(bgArray[0], bgArray[1], bgArray[2]);
    translate(mouseX, mouseY);
    scale(zoom);
    translate(-mouseX, -mouseY);
    drawDots(dots);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function hexToRGB(color){

    let rgbValues = color.match(/(?:[^#].{1})/g);
    let rgbArray = [
        parseInt(rgbValues[0], 16),
        parseInt(rgbValues[1], 16),
        parseInt(rgbValues[2], 16)
    ];
    return rgbArray;
}

//Grid function just in case
/* function drawGrid() {
	stroke(25);
	fill(120);
	for (var x=-width; x < width; x+=40) {
		line(x, -height, x, height);
		text(x, x+1, 12);
	}
	for (var y=-height; y < height; y+=40) {
		line(-width, y, width, y);
		text(y, 1, y+12);
	}
}
 */

