import Populator from "./populatingFun.js";
import Input from "./input.js";


//Creating a new class for the P5 Canvas, instantiable
export default class Canvas{

    constructor(data, check){
        this.data = data;
        this.check = check;
        this.space = {
            pos:    {x:0, y:0},
            init:   {x:0, y:0},
            end:    {x:0, y:0},
            dif:    {x:0, y:0},
            change: {x:0, y:0},
            move:   {x:0, y:0},
            zoom:   1,
            dontDrag: false
        };

        this.populator;
        this.input;
        
        //p is the event for the P5 class that represents something like g in graphics class in JAVA
        this.sketch = (p) =>{
        
            p.setup = () =>{
                
                let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.style('z-index', '1');
                      
            };
    
            p.windowResized = () =>{
    
                p.resizeCanvas(p.windowWidth, p.windowHeight);
    
            };

            this.input = new Input(p.mouseX, p.mouseY);

            p.mouseDragged = () =>{
                this.input.dragMouse(this.space);
            };
            
            p.mousePressed = () =>{
                this.input.pressMouse(this.space, this.populator.dots)
            };
            
            p.mouseReleased = () =>{
                this.input.releaseMouse(this.space);
            };
            
            p.mouseWheel = (e) =>{
                this.input.mouseWheel(e, this.space);
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
            dots[str].createDot(p);
        }
    };

};

/* 

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