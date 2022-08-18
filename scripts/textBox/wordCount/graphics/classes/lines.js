//Class to construct lines in the canvas
class Lines{
    constructor(x1, y1, x2, y2, color, opacity){

        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.color = color;
        this.opacity = opacity;
        
    }

    lineCreate(){
        push();
        noFill();
        stroke(this.color[0], this.color[1], this.color[2], this.opacity*50);
        translate(xMove, yMove);
        beginShape();
        vertex(this.x1, this.y1);
        vertex(this.x2, this.y2);
        endShape();
        pop();
    }
}