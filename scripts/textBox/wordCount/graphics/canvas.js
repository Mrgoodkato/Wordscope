import {hexToRGB} from "./colorProcessing.js";
import Populator from "./populatingFun.js";
import Input from "./input.js";

export const space = {
    pos:    {x:0, y:0},
    init:   {x:0, y:0},
    end:    {x:0, y:0},
    dif:    {x:0, y:0},
    change: {x:0, y:0},
    move:   {x:0, y:0},
    zoom:   1,
    dontDrag: false
};

//Creating a new class for the P5 Canvas, instantiable
export class Canvas{

    constructor(stringData){
        this.data = stringData.data;
        this.limit = stringData.limit;
        this.input;
        this.bgArray;
        this.populator = new Populator(this.data);
        
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
                this.input.dragMouse(space);
            };
            
            p.mousePressed = () =>{
                this.input.pressMouse(space, this.populator.dots, p);
            };
            
            p.mouseReleased = () =>{
                this.input.releaseMouse(space);
            };
            
            p.mouseWheel = (e) =>{
                this.input.mouseWheel(e, space);
            };
    
            p.draw = () =>{
                
                this.bgArray = hexToRGB(backgroundColor.value);

                p.background(this.bgArray[0], this.bgArray[1], this.bgArray[2]);

                p.translate(p.mouseX*3, p.mouseY*3);
                p.scale(space.zoom);
                p.translate(-p.mouseX*3, -p.mouseY*3);
                this.drawDots(this.populator.dots, this.limit, p);

            };

        };

        this.myCanvas = new p5(this.sketch);
    };

    drawDots(dots, limit, p){
        for(let str in dots){
            dots[str].moveDot(p, limit, space);
            dots[str].dotBirth(p, space);
            dots[str].createDot(p, space);
        }
    };

};

/* 

var bgArray;


//Draw dots each frame
function draw(){

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