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

    keyInput(event){
        switch(event.code){
            case 'Enter':
            case 'Space': {
                if(this.stringRaw === null) return;
                this.stringData = new StringData(this.stringRaw, true);
                new Canvas(this.stringData.data);
                break;
            };
            case 'Backspace': {
                new StringData(this.stringRaw, false);
                /* populate(false); */
                break;
            };       
        };
    };

    stringRawCreate(textContent){
        let initStringRaw = textContent.match(this.regex);
        if(initStringRaw !== null){
            for(let i = 0; i < initStringRaw.length; i++){
                initStringRaw[i] = initStringRaw[i].replace(this.regexDigits, '($1)');
            };
        };
        console.log(initStringRaw);
        return initStringRaw;
    };

};