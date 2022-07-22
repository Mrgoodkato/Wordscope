//Performs main computing on word according to type of word
export default function wordMath(str, isOneChar){
    let coordinate = isOneChar ? {
        x: str.charCodeAt(0),
        y: str.charCodeAt(0)
    } : addChars(str);

    return coordinate;

};

//Function to cicle in the word and add the characters togheter
function addChars(str){
    let coordinate = {x: 0, y: 0};
    for(let i = 0; i < str.length; i++){
        i < Math.floor(str.length/2) ? coordinate.x += wordSignChange(str.charCodeAt(i), i) : coordinate.y += wordSignChange(str.charCodeAt(i), i);
    }
    return coordinate;
};

//Changes the sign of the operation depending on the index of the character
function wordSignChange(number, index){
    
    if(index%2 === 0) return number;
    else number *= -1;

    return number;
};