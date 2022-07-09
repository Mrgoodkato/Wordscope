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

    let xP = 0;
    let yP = 0;
    
    if(word.length === 1){
        xP = word.charCodeAt(0);
        yP = word.charCodeAt(0);
        if(limitX < xP) limitX = xP;
        if(limitY < yP) limitY = yP;
        console.log(word + ': ', xP, yP);        
        return {x: xP, y: yP};
    }

    for(let i = 0; i < word.length; i++){
        xP += wordSignChange(word.charCodeAt(i), i);
        if(i >= floor(word.length/2)) yP += wordSignChange(word.charCodeAt(i), i);
    }

    xP = Math.abs(xP);
    yP = Math.abs(yP);

    if(limitX < xP) limitX = xP;
    if(limitY < yP) limitY = yP;

    console.log(word + ': ', xP, yP);
    
    return {x: xP, y: yP};
    
};

