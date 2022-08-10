import { textArea } from "../elements/variablesDOM.js";
import { saveTxt, export2PDF, export2Word } from "./saveText.js";
import { selectionToChange, clearSelection } from "../modal/modTextBox.js";
import { selectWord } from "../modal/writtingMods.js";

export function colorSelect(btn, textArea){
    textArea.focus();
    let sel = window.getSelection().getRangeAt(0).commonAncestorContainer.parentElement;
    sel.style.color = btn.value;
};

export function txtBtnSelector(btn, textArea, filename){

    const btnName = btn.getAttribute('data-txt');

    switch(btnName){
        case 'text-format':
            formatBtns(btn, textArea);
            break;
        case 'text-size':
            dropBtns(textArea, btn, 'size');
            break;
        case 'text-align':
            dropBtns(textArea, btn, 'align');
            break;
        case 'save-txt':
            saveTxt(textArea, filename);
            break;
        case 'save-pdf':
            export2PDF(textArea, filename);
            break;
        case 'save-word':
            export2Word(textArea, filename);
            break;
    };  

};

//Function to set bold-italic-underline to text
function formatBtns(btn, textArea){

    if(!checkSelection()) return;

    let btnFormat = btn.getAttribute('data-format');

    textArea.focus();
    switch (btnFormat){
        case 'bold':
            selectWord('b');
            /* document.execCommand('bold', false); */
            break;
        case 'italic':
            document.execCommand('italic', false);
            break;
        case 'underline':
            document.execCommand('underline', false);
            break;
    }

};

//Function to align-set size of btns
function dropBtns(textArea, btn, type){

    if(!checkSelection()) return;

    switch(type){
        case 'align': {
            let selectNode = selectionToChange();
            selectNode.style.textAlign = btn.name;
            clearSelection();
            break;  
        }
        case 'size': {
            let selectNode = selectionToChange();
            selectNode.style.fontSize = btn.name;
            clearSelection();
            break;
        }
    };
};

function checkSelection(){

    let result;

    if(window.getSelection().anchorNode === null) return false;
    
    //DOCUMENT_POSITION_CONTAINS and DOCUMENT_POSITION_PRECEDING value is 10 - meaning the element is on textBox
    //Check the documentation on compareDocumentPosition()
    let isTextArea = window.getSelection().focusNode.compareDocumentPosition(textArea);
    isTextArea === 10 ? result = true : result = false;

    return result;
};