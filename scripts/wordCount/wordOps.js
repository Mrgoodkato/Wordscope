//This populates the stringData array that contains the string coordinates (x,y)
function countWords(stringRaw, adding){
    stringData = [];
    if(stringRaw === null && !adding) return;
    stringRaw.forEach((str) => {
        typeOfWord(str);
    });
};

//This function decides what values to assign to each [str] object in the stringData array
function typeOfWord(str){
    if(stringData[str] === undefined) {
        addWord(str, true);
    } else {
        checkDictionary(str) ? dictionaryOps(str) : addWord(str, false);
    }
};

//Function to compute str object if checkDictionary is false
function addWord(str, newWord){
    if(newWord){
        stringData[str] = {size: 1, str: str, repeat: 1};
        stringData[str].pos = processWord(str);
        return;
    }
    stringData[str].size += 1;
    stringData[str].repeat += 1;
};

//This calculates the coordinate values of each string based on internal algorithm, takes from wordMaths
function processWord(word){

    let coordinate = {x: 0, y: 0};    

    word.length !== 1 ? coordinate = wordMath(word, false) : coordinate = wordMath(word, true); 

    coordinate.x = Math.abs(coordinate.x);
    coordinate.y = Math.abs(coordinate.y);

    limitAdapt(coordinate);
    
    return coordinate;
    
};

//Adapts the limitX, limitY variables according to the coordinates values over time
function limitAdapt(coordinate){

    if(limitX < coordinate.x) limitX = coordinate.x;
    if(limitY < coordinate.y) limitY = coordinate.y;

};

