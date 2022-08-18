import StringData from "../stringData.js";
import Populator from "../graphics/populatingFun.js";
import {allocateDots} from "../graphicData.js"
import { avoidDeletion } from "./keyLimits.js";


export default class KeyEvents{

    constructor(textArea, fileNameInstance){
        this.textArea = textArea;
        this.regex = /[\u00C0-\u00FF\w]*[\w\u00C0-\u00FF\w]/gm;
        this.regexDigits = /([\d]*[\d])/;
        this.stringRaw = this.stringRawCreate(this.textArea.textContent);
        this.stringData = new StringData(this.stringRaw);
        this.populator = new Populator();

        //This will take all input from keyboard and store it as an array of words, even copied and pasted text
        this.textArea.addEventListener("keyup", (event) =>{
            
            avoidDeletion(this.textArea, event);
            this.stringData.data = [];
            this.stringRaw = this.stringRawCreate(this.textArea.textContent);
            this.stringData.stringRaw = this.stringRaw;
            this.keyInput(event);
        });

    };

    //Handles the functions called when pressing ENTER, SPACE and BACKSPACE that link to the P5 canvas and creates the graphics
    keyInput(event){
        switch(event.code){
            case 'AltLeft': {
                console.log(this.textArea.innerHTML);
                break;
            }

            case 'Enter':
            case 'Space': {
                if(this.stringRaw === null) return;
                this.populateAll(true);
                break;
            };
            case 'Backspace': {
                this.populateAll(false);
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

    //Handles the String Data object and then populates the dots through the Populator class
    populateAll(isEnter){
        this.stringData.countWords(isEnter);
        this.populator.data = this.stringData.data;
        this.populator.populateCheck(isEnter);
        allocateDots(this.populator.dots, this.stringData.limit);
    };

};