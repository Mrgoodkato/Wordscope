export default class Input{

    //Taken from excercise one JAVA project mouse calculations
    constructor(mouseX, mouseY){

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.dragMouse = (space) =>{

            if(isMouseOver() || space.dontDrag || space.zoom > 1) return;
    
            space.change.x = this.mouseX;
            space.move.x = space.change.x - space.dif.x;
        
            space.change.y = this.mouseY;
            space.move.y = space.change.y - space.dif.y;
        };

        this.pressMouse = (space, dots) =>{
            if(this.isMouseOver()){
                space.dontDrag = true;
                return;
            };

            //Displays the legend in each dot of their size and word
            for(let str in dots){
                dots[str].display(this.mouseX, this.mouseY);
            };

            if(space.zoom > 1) return;
        
            space.dontDrag = false;
        
            space.init.x = this.mouseX;
            space.dif.x = space.init.x - space.end.x + space.dif.x;
        
            space.init.y = this.mouseY;
            space.dif.y = space.init.y - space.end.y + space.dif.y;

        };

        this.releaseMouse = (space) =>{
            if(this.isMouseOver() || space.zoom > 1) return;
            space.end.x = this.mouseX;
            space.end.y = this.mouseY;
        };

        this.mouseWheel = (e, space) =>{

            if(this.isMouseOver()) return;
            
            space.zoom < 1 ? space.zoom = 1 : space.zoom -= e.delta/500;
        
        };


    };

    //Helperunction used to restrict movement if mouse is in the textbox
    mouseOver(){
        let isOver;

        $("#modal:hover").length !== 0 ? isOver = true : isOver = false;
        
        return isOver;
    };

};