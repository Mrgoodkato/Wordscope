import KeyEvents from "./input/keyboardInput.js";

export default class WordCounter{
    constructor(textArea, fileNameInstance){
        this.textArea = textArea;
        this.keyEvents = new KeyEvents(this.textArea, fileNameInstance);
        this.regexPaste = /<(?!(\/\s*)?(a|b|i|em|s|strong|u)[>,\s])([^>])*>/g;
        this.pasteRestrictor();
    }

    pasteRestrictor(){
        this.textArea.addEventListener('paste', (event) =>{
            //Get user pasted data
            let data = event.clipboardData.getData('text/html') || event.clipboardData.getData('text/plain');
        
            //Filter out everything except simple text and allowable HTML elements
            data = data.replace(this.regexPaste, '');
            
            //Insert filtered content
            document.execCommand('insertHTML', false, data);
        
            event.preventDefault();
        
            //Checks text is less than 7500 words long to avoid performance issues
            if(!pasteCheckLenght(this.keyEvents.stringRawCreate(this.textArea.textContent))){
                window.alert("Please introduce less than 7500 words");
                this.textArea.textContent = '';
            };
            
        });

    };
    
};

//Checks if pasted text is less than 7500 words long
function pasteCheckLenght(pasteText){
    let check;
    pasteText.length >= 7500 ? check = false : check = true;
    return check;
};

