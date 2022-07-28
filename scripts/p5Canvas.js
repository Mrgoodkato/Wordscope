import { hexToRGB } from "./textBox/wordCount/graphics/colorProcessing.js";
import Input from "./textBox/wordCount/graphics/input.js"; 
import {dots, limit} from "./textBox/wordCount/graphicData.js";

const space = {
    pos:    {x:0, y:0},
    init:   {x:0, y:0},
    end:    {x:0, y:0},
    dif:    {x:0, y:0},
    change: {x:0, y:0},
    move:   {x:0, y:0},
    zoom:   1,
    dontDrag: false
};


export const sketch = (p) =>{

    const input = new Input();

    p.setup = () =>{ 
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.style('z-index', '1');
                            
    };

    p.draw = () =>{
  
        let bgArray = hexToRGB(backgroundColor.value);
        input.mouseX = p.mouseX;
        input.mouseY = p.mouseY;

        p.background(bgArray[0], bgArray[1], bgArray[2]);

        p.translate(p.mouseX*3, p.mouseY*3);
        p.scale(space.zoom);
        p.translate(-p.mouseX*3, -p.mouseY*3);
        if(grid) drawGrid(p, bgArray);
        drawDots(dots, limit, p, space);
    };

    p.windowResized = () =>{

        p.resizeCanvas(p.windowWidth, p.windowHeight);

    };

    p.mouseDragged = () =>{
        input.dragMouse(space);
    };
    
    p.mousePressed = () =>{
        input.pressMouse(space, dots, p);
    };
    
    p.mouseReleased = () =>{
        input.releaseMouse(space);
    };
    
    p.mouseWheel = (e) =>{
        input.mouseWheel(e, space);
    };
};

//Function that draws the dots in the p5Canvas sketch function p.draw()
function drawDots(dots, limit, p, space){
        
    for(let str in dots){
        dots[str].moveDot(p, limit, space);
        dots[str].dotBirth(p, space);
        dots[str].createDot(p, space);
    }
};

//Grid function just in case
function drawGrid(p, originBgArray) {
    let bgArray = originBgArray;
    p.push();
    p.translate(space.move.x, space.move.y);
    p.strokeWeight(1);
	p.stroke(bgArray[0]*3, bgArray[1]*3, bgArray[2]*3);
	for (var x=-p.windowWidth*3; x < p.windowWidth*3; x+=10) {
		p.line(x, -p.windowHeight*3, x, p.windowHeight*3);
	}
	for (var y=-p.windowHeight*3; y < p.windowHeight*3; y+=10) {
		p.line(-p.windowWidth*3, y, p.windowWidth*3, y);
	}
    p.pop();
    
};