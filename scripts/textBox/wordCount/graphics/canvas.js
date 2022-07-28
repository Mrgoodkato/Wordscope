

//Creating a new class for the P5 Canvas, instantiable
export class Canvas{

    constructor(stringData, populator){
        this.data = stringData.data;
        this.limit = stringData.limit;
        this.input;
        this.bgArray;
        this.populator = populator;
    }    
    

};

/* 

var bgArray;


//Draw dots each frame
function draw(){

    if(grid) drawGrid();
    drawDots(dots);    
}





 */