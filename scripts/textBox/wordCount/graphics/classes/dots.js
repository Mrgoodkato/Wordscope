import setDotColor from "../colorProcessing.js";
import {randomRange} from "../mathOps.js";

//Class that constructs each dot.
export default class Dots{
    constructor(x, y, size, str, repeat){
        //From the points array coordinates gathered from the textarea string array and also the size on repeated words
        this.pos = {x: x, y: y};
        this.size = size;
        this.repeat = repeat;
        this.str = str;
        this.x;
        this.y;
        this.showDisplay = false;
        this.creationValue = 255;
        this.creationAcc = randomRange(1.1, 1.5, false);
        
        //Used to set the offset of the noise function in moveDot(), random value to provide more rich movement
        this.xOffset = randomRange(0 , 10000, true);
        this.yOffset = randomRange(0 , 10000, true);;

        //Acceleration speed of each particle
        this.accelerator = 0.001;
    };

    //Creates each ellipse object in screen based on the x and y values already calculated each frame
    createDot(p, space){
        p.fill(setDotColor(255, false, p, this.repeat));
        p.noStroke();
        p.push();
        p.translate(space.move.x, space.move.y);
        p.ellipse(this.x, this.y, this.size+p.random(1,2));
        this.display(space, p);
        p.pop();
    };

    //Moves each dot according to a mapped value that changes the offset of noise each frame plkus the acceleration
    moveDot(p, limit, space){

        //Location on screen of each dot when created, limited to the limitX, limitY mutable values
        this.xLoc = p.map(this.pos.x, 0, limit.x, 0, p.windowWidth);
        this.yLoc = p.map(this.pos.y, 0, limit.y, 0, p.windowHeight);

        p.noiseDetail(4,0.25);
        this.x = p.map(p.noise(this.xOffset), 0, 1, this.xLoc*space.zoom, (this.xLoc+100+(space.move.x*this.size)/10)*space.zoom);
        this.y = p.map(p.noise(this.yOffset), 0, 1, this.yLoc*space.zoom, (this.yLoc+100+(space.move.y*this.size)/100)*space.zoom);

        this.xOffset += this.accelerator;
        this.yOffset += this.accelerator;

    };

    //Method for animating the inital creation of a dot
    dotBirth(p, space){

        p.push();
        p.translate(space.move.x, space.move.y);
        p.noStroke();
        p.fill(setDotColor(this.creationValue, false, p, this.repeat));
        p.ellipse(this.x, this.y, this.creationValue);
        p.pop();
        this.creationValue /= this.creationAcc;
        
    };

    //Method for displaying the information on each dot object when mouse is over it
    display(space, p){
        if(!this.showDisplay) return;
        let information = this.str + '| Repeated -- ' + this.repeat + ' times';
        p.fill(25);
        p.rect(this.x - 5/space.zoom, this.y - 8/space.zoom, Math.floor(information.length*5.5)/space.zoom, 10/space.zoom, 2);
        p.fill(setDotColor(255, true, p, this.repeat));
        p.textSize(10/space.zoom);
        p.text(information, this.x, this.y);
    };

    //Binary function to define if display is to be executed.
    isDisplay(mouseX, mouseY, move, p){
        let distance = p.dist(mouseX-move.x, mouseY-move.y, (this.x), (this.y));
        if(distance <= this.size+5){
            this.showDisplay = this.showDisplay ? false : true;
        };
    };
};



