/*
This function populates the dots array with new Dots objects from the Dots class - providing position x and y
as well as size information gathered from the stringData from wordCounter.
*/
function populateDots(dots, data){

    if(data === undefined) return;

    var sizes = getSizes(data);

    for(let i = 0; i < sizes.length; i++) populateBySize(dots, data, sizes[i]);

    
}

//Get all sizes on the stringData array, returns the array of unique sizes - Helper method of populateDots()
function getSizes(data){

    var sizeSet = new Set();
    var arrayFinal = [];

    for (let str in data) {
    
        sizeSet.add(data[str].size); 

    }

    arrayFinal = Array.from([...sizeSet]).sort((a,b) => a-b);    

    return arrayFinal;

}

//Method to go over the data array and check in order the sizes and then populate the order of the dots array by size instead of by entry
function populateBySize(dots, data, size){
    for(let str in data){
        if(data[str].size != size) continue;
        
        if(dots[str] === undefined) dots[str] = new Dots(data[str].pos.x, data[str].pos.y, data[str].size, data[str].str, data[str].repeat);
        else {

            if(dots[str].repeat < data[str].repeat) dots[str].creationValue = data[str].repeat + 255;

            dots[str].size = data[str].size;
            dots[str].repeat = data[str].repeat;
        }
    }
}


//Draws each dot, first setting up positions and then creating each ellipse and creating lines connecting said dots
function drawDots(dots){
    


    for(let str in dots){
        dots[str].moveDot();
        dots[str].dotBirth();
        dots[str].createPoint();
    }
    

}

//Method that is called if backspace is pressed, it looks in the stringData array for words missing and removes or
//decreases the size of the dot object
function refreshDots(dots, data){

    if(data === undefined) {
        dots =[];
        return;
    }

    for(let str in dots){
        
        if(data[str] === undefined) {
            delete dots[str];
        }else if(data[str].size != dots[str].size) {
            dots[str].size = data[str].size;
            dots[str].repeat = data[str].repeat;
        }

    }

}

