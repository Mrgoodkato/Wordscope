//Class to construct lines in the canvas
class Lines{
    constructor(vect1, vect2){

        this.vect1 = vect1;
        this.vect2 = vect2;
        
    }

    lineCreate(){
        beginShape();
        this.vect1;
        this.vect2;
        endShape();
    }
}