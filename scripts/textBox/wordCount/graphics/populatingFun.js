import Dots from "./classes/dots.js";

export default class Populator{

    constructor(data){
        this.dots = [];
        this.data = data;
    };

    populateCheck(check){
        check ? this.populateDots() : this.refreshDots();
    };
    
    //Main populator method to call other population methods from here
    populateDots(){

        if(this.data === undefined) return;
    
        let sizes = this.getSizes(this.data);
    
        for(let i = 0; i < sizes.length; i++) this.populateBySize(sizes[i]);
        console.log(this.dots);
        
    };

    //Get all sizes on the stringData array, returns the array of unique sizes - Helper method of populateDots()
    getSizes(data){
        var sizeSet = new Set();
        var arrayFinal = [];
    
        for (let str in data) {
        
            sizeSet.add(data[str].size); 
    
        }
    
        arrayFinal = Array.from([...sizeSet]).sort((a,b) => a-b);    
    
        return arrayFinal;
    }

    //Method to go over the data array and check in order the sizes and then populate the order of the dots array by size instead of by entry
    populateBySize(size){

        for(let str in this.data){
            if(this.data[str].size != size) continue;
            
            if(this.dots[str] === undefined){ 
            this.dots[str] = new Dots(this.data[str].pos.x, this.data[str].pos.y, this.data[str].size, this.data[str].str, this.data[str].repeat);
            }
            else {
    
                if(this.dots[str].repeat < data[str].repeat) this.dots[str].creationValue = this.data[str].repeat + 255;
    
                this.dots[str].size = this.data[str].size;
                this.dots[str].repeat = this.data[str].repeat;
            }
        };

    };

    //Method that is called if backspace is pressed, it looks in the stringData array for words missing and removes or
    //decreases the size of the dot object
    refreshDots(){

        let dots = []

        if(this.data === undefined) {
            this.dots = dots;
            return;
        };

        for(let str in this.dots){
            
            if(this.data[str] === undefined) {
                delete this.dots[str];
            }else if(this.data[str].size != this.dots[str].size) {
                this.dots[str].size = this.data[str].size;
                this.dots[str].repeat = this.data[str].repeat;
            }

        };

    };

};

