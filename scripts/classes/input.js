var dontDrag;

//Taken from excercise one JAVA project mouse calculations
function mouseDragged(){
    
    if(isMouseOver() || dontDrag || zoom > 1) return;

    changeX = mouseX;
    xMove = changeX - difX;

    changeY = mouseY;
    yMove = changeY - difY;
    
}


function mousePressed(){    

    if(isMouseOver()) {
        dontDrag = true;
        return;
    }

    //Displays the legend in each dot of their size and word
    for(let str in dots){
        dots[str].display(mouseX, mouseY);
    }
    
    if(zoom > 1) return;

    dontDrag = false;

    initX = mouseX;
    difX = initX - endX + difX;

    initY = mouseY;
    difY = initY - endY + difY;

    
}

function mouseReleased(){
    
    if(isMouseOver() || zoom > 1) return;

    endX = mouseX;
    endY = mouseY;
}

function mouseWheel(e){

    if(isMouseOver()) return;

    zoom -= e.delta/500;

    if(zoom < 1) {
        zoom = 1;
    }
}

//Helperunction used to restrict movement if mouse is in the textbox
function isMouseOver(){
    let isOver;

    if($("#modal:hover").length !== 0){
        isOver = true;
    }else {
        isOver = false;
    }
    
    return isOver;
}