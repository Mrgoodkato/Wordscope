import StringData from "../wordOps.js";
import Canvas from "../graphics/canvas.js";

export default class KeyEvents{

    constructor(textArea){
        this.textArea = textArea;
        this.regex = /[\u00C0-\u00FF\w]*[\w\u00C0-\u00FF\w]/gm;
        this.regexDigits = /([\d]*[\d])/;
        this.stringRaw = [];
        this.stringData;

        //This will take all input from keyboard and store it as an array of words, even copied and pasted text
        this.textArea.addEventListener("keyup", (event) =>{
            
            this.stringRaw = this.stringRawCreate(this.textArea.textContent);
            this.keyInput(event);
        });

    };

    //Handles the functions called when pressing ENTER, SPACE and BACKSPACE that link to the P5 canvas and creates the graphics
    keyInput(event){
        switch(event.code){
            case 'Enter':
            case 'Space': {
                if(this.stringRaw === null) return;
                this.stringData = new StringData(this.stringRaw, true);
                new Canvas(this.stringData.data, true);
                break;
            };
            case 'Backspace': {
                new StringData(this.stringRaw, false);
                new Canvas(this.stringData.data, false);
                break;
            };       
        };
    };

    //Creates the array of words from the textContent of the textBox
    stringRawCreate(textContent){
        let initStringRaw = textContent.match(this.regex);
        if(initStringRaw !== null){
            for(let i = 0; i < initStringRaw.length; i++){
                initStringRaw[i] = initStringRaw[i].replace(this.regexDigits, '($1)');
            };
        };
        return initStringRaw;
    };

};