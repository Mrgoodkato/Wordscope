//Sets up canvas as a variable that can be attached to an HTML element in setup()
var myCanvas;
//Creates dots array var that will be used to create each Dots object from the class constructor
var dots = [];
var lines = [];
var xPos, yPos;
var initX = 0, endX = 0, difX = 0, changeX = 0, xMove = 0;
var initY = 0, endY = 0, difY = 0, changeY = 0, yMove = 0;
var zoom = 1;

var bgArray;

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

    bgArray = hexToRGB(backgroundColor.value);

    background(bgArray[0], bgArray[1], bgArray[2]);
    translate(mouseX*3, mouseY*3);
    scale(zoom);
    translate(-mouseX*3, -mouseY*3);
    if(grid) drawGrid();
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
function drawGrid() {
    push();
    translate(xMove, yMove);
    strokeWeight(1);
	stroke(bgArray[0]*3, bgArray[1]*3, bgArray[2]*3);
	for (var x=-windowWidth*3; x < windowWidth*3; x+=10) {
		line(x, -windowHeight*3, x, windowHeight*3);
	}
	for (var y=-windowHeight*3; y < windowHeight*3; y+=10) {
		line(-windowWidth*3, y, windowWidth*3, y);
	}
    pop();
    
};

