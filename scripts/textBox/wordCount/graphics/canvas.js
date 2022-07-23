import Populator from "./populatingFun.js";

//Creating a new class for the P5 Canvas, instantiable
export default class Canvas{

    constructor(data, check){
        this.data = data;
        this.check = check;
        this.populator;
        
        //p is the event for the P5 class that represents something like g in graphics class in JAVA
        this.sketch = (p) =>{
        
            p.setup = () =>{
                
                let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.style('z-index', '1');
                      
            };
    
            p.windowResized = () =>{
    
                p.resizeCanvas(p.windowWidth, p.windowHeight);
    
            };
    
            p.draw = () =>{
    
                this.populator = new Populator(this.data, this.check);
                this.drawDots(this.populator.dots, p);
                

            };
            
        };

        this.myCanvas = new p5(this.sketch);
    };

    drawDots(dots, p){
        for(let str in dots){
            dots[str].moveDot(p);
            dots[str].dotBirth(p);
            dots[str].createPoint(p);
        }
    };

    

}

/* var xPos, yPos;
var initX = 0, endX = 0, difX = 0, changeX = 0, xMove = 0;
var initY = 0, endY = 0, difY = 0, changeY = 0, yMove = 0;
var zoom = 1;

var bgArray;


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

function hexToRGB(color){

    let rgbValues = color.match(/(?:[^#].{1})/g);
    let rgbArray = [
        parseInt(rgbValues[0], 16),
        parseInt(rgbValues[1], 16),
        parseInt(rgbValues[2], 16)
    ];
    return rgbArray;
};

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

 */