//Class that constructs each dot.
class Dots{
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
        this.creationAcc = random(1.1, 1.5);

        //Used to set the offset of the noise function in moveDot(), random value to provide more rich movement
        this.xOffset = floor(random(0, 10000));
        this.yOffset = floor(random(0, 10000));

        //Acceleration speed of each particle
        this.accelerator = 0.001;
    }

    //Moves each dot according to a mapped value that changes the offset of noise each frame plkus the acceleration
    moveDot(){

        //Location on screen of each dot when created, limited to the limitX, limitY mutable values
        this.xLoc = map(this.pos.x, 0, limitX, 0, windowWidth);
        this.yLoc = map(this.pos.y, 0, limitY, 0, windowHeight);

        noiseDetail(4,0.25);
        this.x = map(noise(this.xOffset), 0, 1, this.xLoc*zoom, (this.xLoc+100+(xMove*this.size)/10)*zoom);
        this.y = map(noise(this.yOffset), 0, 1, this.yLoc*zoom, (this.yLoc+100+(yMove*this.size)/100)*zoom);

        this.xOffset += this.accelerator;
        this.yOffset += this.accelerator;

    }

    //Creates each ellipse object in screen based on the x and y values already calculated each frame
    createPoint(){
        fill(this.setDotColor());
        noStroke();
        push();
        translate(xMove, yMove);
        ellipse(this.x, this.y, this.size);
        if(this.showDisplay == true) {
            let information = this.str + '| Repeated -- ' + this.repeat + ' times';
            fill(25);
            rect(this.x - 5/zoom, this.y - 8/zoom, floor(information.length*5.5)/zoom, 10/zoom, 2);
            fill(255);
            textSize(10/zoom);
            text(information, this.x, this.y);
        }
        pop();
    }

    //Method for displaying the information on each dot object when mouse is over it
    display(xM, yM){
        let distance = dist(xM-xMove, yM-yMove, (this.x), (this.y));
        if(distance <= this.size){
            this.showDisplay = this.showDisplay ? false : true;
            console.log(this.str);
        }
    }

    //Method for animating the inital creation of a dot
    dotBirth(){

        push();
        translate(xMove, yMove);
        noStroke();
        fill(this.setDotColor(this.creationValue));
        ellipse(this.x, this.y, this.creationValue);
        pop();
        this.creationValue /= this.creationAcc;
        
    }

    //Method that returns the color for the dot according repeat value and rgb taken from hex
    setDotColor(alphaVal){
        let colorArray = hexToRGB(colorPicker.value);
        let red = colorArray[0];
        let green = colorArray[1];
        let blue = colorArray[2];
        let colorExport = color(red*this.repeat, green*this.repeat, blue*this.repeat, alphaVal);

        return colorExport;
    }
    

}