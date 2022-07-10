//Performs main computing on word according to type of word
function wordMath(word, isOneChar){
    coordinate = isOneChar ? {
        x: word.charCodeAt(0),
        y: word.charCodeAt(0)
    } : addChars(word);

    return coordinate;

};

//Function to cicle in the word and add the characters togheter
function addChars(word){
    let coordinate = {x: 0, y: 0};
    for(let i = 0; i < word.length; i++){
        i < floor(word.length/2) ? coordinate.x += wordSignChange(word.charCodeAt(i), i) : coordinate.y += wordSignChange(word.charCodeAt(i), i);
    }
    return coordinate;
};

//Changes the sign of the operation depending on the index of the character
function wordSignChange(number, index){
    
    if(index%2 === 0) return number;
    else number *= -1;

    return number;
};