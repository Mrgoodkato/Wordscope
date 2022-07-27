export default class Input{

    //Taken from excercise one JAVA project mouse calculations
    constructor(mouseX, mouseY){

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.dragMouse = (space) =>{

            if(this.isMouseOver() || space.dontDrag || space.zoom > 1) return;
    
            space.change.x = this.mouseX;
            space.move.x = space.change.x - space.dif.x;
        
            space.change.y = this.mouseY;
            space.move.y = space.change.y - space.dif.y;

            return space;
        };

        this.pressMouse = (space, dots, p) =>{
            if(this.isMouseOver()){
                space.dontDrag = true;
                return;
            };

            //Displays the legend in each dot of their size and word
            for(let str in dots){
                dots[str].display(this.mouseX, this.mouseY, space, p);
            };

            if(space.zoom > 1) return;
        
            space.dontDrag = false;
        
            space.init.x = this.mouseX;
            space.dif.x = space.init.x - space.end.x + space.dif.x;
        
            space.init.y = this.mouseY;
            space.dif.y = space.init.y - space.end.y + space.dif.y;

            return space;
        };

        this.releaseMouse = (space) =>{
            if(this.isMouseOver() || space.zoom > 1) return;
            space.end.x = this.mouseX;
            space.end.y = this.mouseY;
        };

        this.mouseWheel = (e, space) =>{

            if(this.isMouseOver()) return;
            
            space.zoom < 1 ? space.zoom = 1 : space.zoom -= e.delta/500;
            
            return space;
        };


    };

    //Helperunction used to restrict movement if mouse is in the textbox
    isMouseOver(){
        let isOver;

        $("#modal:hover").length !== 0 ? isOver = true : isOver = false;
        
        return isOver;
    };

};