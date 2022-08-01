//We will need to import all graphical classes that use the textarea
import {colorSelect, txtBtnSelector} from './textOptions.js'

//Import the WordCounter class to start the P5 operations with string data
import WordCounter from './wordCount/wordCounter.js';

export default class TextBox{
    constructor(textArea){
        this.textBtns = document.querySelectorAll('[data-txt]');
        this.colorBtn = document.querySelector('[data-txt-color]');
        this.fileName = document.querySelector('[data-txt-filename]');
        this.fileNameInstance = document.querySelector('[data-txt-name]');
        this.textArea = textArea;    

        //Start the WordCounter class and its functions, dependant on this class
        this.wordCount = new WordCounter(this.textArea, this.fileNameInstance);
    };

    createTxtBtns(){
        this.textBtns.forEach(btn =>{
           btn.addEventListener('click', () => {txtBtnSelector(btn, this.textArea, this.fileName.value)});
        });
        this.colorBtn.addEventListener('input', () => {colorSelect(this.colorBtn, this.textArea)});
    };

    updateNameOfText(){
        
        this.fileNameInstance.innerText = "Start writting here";
        
        this.fileName.addEventListener('keyup', ()=>{

            this.fileNameInstance.innerHTML = this.fileName.value;

        });
             
    };
};