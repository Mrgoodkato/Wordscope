//Variables used through the program
const widthTxtArea = document.getElementById('textarea1').offsetWidth;
const heightTxtArea = document.getElementById('textarea1').offsetHeight;
//Selects all words in the array introduced and separates them
const regex = /[\u00C0-\u00FF\w]*[\w\u00C0-\u00FF\w]/gm;
//Selects digits for object oriented array to be replaced with (-number-) to avoid indexing errors
const regexDigits = /([\d]*[\d])/;
//Formats any text copied, when pasted to plain text;
const regexPaste = /<(?!(\/\s*)?(a|b|i|em|s|strong|u)[>,\s])([^>])*>/g;

//Stores text as an array using the regex var
var stringRaw = [];
//Object to store both size and string in key-value pairs, as well as coordinates in graphic environment
var stringData = [];

//Mutable limits for the position of each point
var limitX = 0;
var limitY = 0;

document.querySelector('#textarea1').addEventListener('paste', (e) =>{
    //Get user pasted data
    let data = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');

    //Filter out everything except simple text and allowable HTML elements
    data = data.replace(regexPaste, '');

    console.log("here");
    //Insert filtered content
    document.execCommand('insertHTML', false, data);

    //Prevent the standard behavior
    e.preventDefault();
});

//This will take all input from keyboard and store it as an array of words, even copied and pasted text
textArea.addEventListener("keyup", (event) =>{
    var textStored = textArea.textContent;

    stringRaw = textStored.match(regex);
    if(stringRaw !== null){
        for(let i = 0; i < stringRaw.length; i++){
            stringRaw[i] = stringRaw[i].replace(regexDigits, '($1)');
        };
    }
    
    switch(event.code){
        case 'Enter': 
        case 'Space': {
            if(stringRaw === null) return;
            countWords(stringRaw, true);
            //From Sketch script populates the graphic box
            populate(true);
            break;
        }
        case 'Backspace': {
            countWords(stringRaw, false);
            populate(false);
            break;
        }       
    }
});

//This populates the stringData array that contains the string coordinates (x,y)
function countWords(stringRaw, adding){

    stringData = [];
    
    if(stringRaw === null && !adding) return;

    stringRaw.forEach((str) => {

        if(stringData[str] === undefined) {
            
            stringData[str] = {size: 1, str: str, repeat: 1};
            stringData[str].pos = processWord(str);

        }else if(checkDictionary(str)) {
            let rep = stringData[str].repeat + 1;
            stringData[str] = {size: 2, 
            str: str, repeat: rep,
            pos:{
                x: floor(random(0, windowWidth)),
                y: floor(random(0, windowHeight))
            }
        }
        }else {
            stringData[str].size += 1;
            stringData[str].repeat += 1;
        }
        
    });
}

//This calculates the coordinate values of each string based on internal algorithm
function processWord(word){

    var xP = 0;
    var yP = 0;
    
    if(word.length === 1){
        xP = word.charCodeAt(0);
        yP = word.charCodeAt(0);
        if(limitX < xP) limitX = xP;
        if(limitY < yP) limitY = yP;
        return {x: xP, y: yP};
    }

    for(let i = 0; i < word.length; i++){
        xP += wordOperations(word.charCodeAt(i), i);
        if(i >= floor(word.length/2)) yP += wordOperations(word.charCodeAt(i), i);
    }

    xP = Math.abs(xP);
    yP = Math.abs(yP);

    if(limitX < xP) limitX = xP;
    if(limitY < yP) limitY = yP;

    return {x: xP, y: yP};
    
}
//Changes the sign of the operation depending on the index of the character
function wordOperations(number, index){
    
    if(index%2 === 0) return number;
    else number *= -1;

    return number;
}
//Method to check the dictionary script for common words used
function checkDictionary(str){

    var result = false;

    for(let i = 0; i < dictionary.length; i++){
        if(dictionary[i] === str.toLowerCase()) {
            result = true;
            break;
        }
    }
    return result;

}