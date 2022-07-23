import setDotColor from "../colorProcessing.js";

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
        this.creationAcc = Math.random(1.1, 1.5);
        
        //Used to set the offset of the noise function in moveDot(), random value to provide more rich movement
        this.xOffset = Math.floor(Math.random(0, 10000));
        this.yOffset = Math.floor(Math.random(0, 10000));

        //Acceleration speed of each particle
        this.accelerator = 0.001;
    };

    //Creates each ellipse object in screen based on the x and y values already calculated each frame
    createDot(p){
        p.fill(setDotColor(255, false, p));
        p.noStroke();
        p.push();
        p.translate(xMove, yMove);
        p.fill(255);
        p.ellipse(this.x, this.y, this.size+Math.random(1,2));
        this.display(xM, yM, p);
        p.pop();
    };

    //Moves each dot according to a mapped value that changes the offset of noise each frame plkus the acceleration
    moveDot(p){

        //Location on screen of each dot when created, limited to the limitX, limitY mutable values
        this.xLoc = p.map(this.pos.x, 0, limitX, 0, windowWidth);
        this.yLoc = p.map(this.pos.y, 0, limitY, 0, windowHeight);

        p.noiseDetail(4,0.25);
        this.x = p.map(p.noise(this.xOffset), 0, 1, this.xLoc*zoom, (this.xLoc+100+(xMove*this.size)/10)*zoom);
        this.y = p.map(p.noise(this.yOffset), 0, 1, this.yLoc*zoom, (this.yLoc+100+(yMove*this.size)/100)*zoom);

        this.xOffset += this.accelerator;
        this.yOffset += this.accelerator;

    };

    //Method for animating the inital creation of a dot
    dotBirth(p){

        p.push();
        p.translate(xMove, yMove);
        p.noStroke();
        p.fill(this.setDotColor(this.creationValue, false));
        p.ellipse(this.x, this.y, this.creationValue);
        p.pop();
        this.creationValue /= this.creationAcc;
        
    };

    //Method for displaying the information on each dot object when mouse is over it
    display(xM, yM, p){
        if(!this.isDisplay(xM, yM)) return;
        let information = this.str + '| Repeated -- ' + this.repeat + ' times';
        p.fill(25);
        p.rect(this.x - 5/zoom, this.y - 8/zoom, Math.floor(information.length*5.5)/zoom, 10/zoom, 2);
        p.fill(this.setDotColor(255, true));
        p.textSize(10/zoom);
        p.text(information, this.x, this.y);
    };

    //Binary function to define if display is to be executed.
    isDisplay(xM, yM, p){
        let distance = p.dist(xM-xMove, yM-yMove, (this.x), (this.y));
        if(distance <= this.size+5){
            this.showDisplay = this.showDisplay ? false : true;
        };
    }
};



