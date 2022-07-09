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

textArea.addEventListener('paste', (event) =>{
    //Get user pasted data
    let data = event.clipboardData.getData('text/html') || event.clipboardData.getData('text/plain');

    //Filter out everything except simple text and allowable HTML elements
    data = data.replace(regexPaste, '');
    
    //Insert filtered content
    document.execCommand('insertHTML', false, data);

    event.preventDefault();

    //Checks text is less than 7500 words long to avoid performance issues
    if(!pasteCheckLenght(stringRawCreate(textArea.textContent))){
        window.alert("Please introduce less than 7500 words");
        textArea.textContent = '';
    };
    
});

//This will take all input from keyboard and store it as an array of words, even copied and pasted text
textArea.addEventListener("keyup", (event) =>{
    stringRaw = stringRawCreate(textArea.textContent);
    keyEvents(event);
});

function stringRawCreate(textStored){
    let stringRaw = textStored.match(regex);
    if(stringRaw !== null){
        for(let i = 0; i < stringRaw.length; i++){
            stringRaw[i] = stringRaw[i].replace(regexDigits, '($1)');
        };
    }
    return stringRaw;
};

//Checks if pasted text is less than 7500 words long
function pasteCheckLenght(stringRaw){
    let check;
    stringRaw.length >= 7500 ? check = false : check = true;
    return check;
};

//Executes a different function in graphics depending on the key stroke (ENTER, SPACE or BACKSPACE)
function keyEvents(event){
    switch(event.code){
        case 'Enter': 
        case 'Space': {
            if(stringRaw === null) return;
            countWords(stringRaw, true);
            populate(true);
            break;
        }
        case 'Backspace': {
            countWords(stringRaw, false);
            populate(false);
            break;
        }       
    }
};