//We will need to import all graphical classes that use the textarea
import {colorSelect, txtBtnSelector} from './textOptions.js'

export default class TextBox{
    constructor(){
        this.textBtns = document.querySelectorAll('[data-txt]');
        this.textArea = document.querySelector('[data-txt-area]');
        this.colorBtn = document.querySelector('[data-txt-color]');
        this.fileName = document.querySelector('[data-txt-filename]').value;
    };

    createTxtBtns(){
        this.textBtns.forEach(btn =>{
           btn.addEventListener('click', () => {txtBtnSelector(btn, this.textArea, this.fileName)});
        });
        this.colorBtn.addEventListener('input', () => {colorSelect(this.colorBtn, this.textArea)});
    };
    


};

