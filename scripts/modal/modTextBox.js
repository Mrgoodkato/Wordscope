//We create a range that will be used to place the caret
const range = document.createRange();
//Also a variable to store the current selection
const sel = window.getSelection();

//Function that goes through all nodes in textbox to determine position of element selected
//In order to make changes
export function focusCaret(textArea){

    let innerLength = textArea.innerHTML.length;
    let finalNode = textArea.childNodes.length;


    innerLength === 13 ? range.setStart(textArea.childNodes[0], 0) : range.setStart(textArea.childNodes[finalNode-1], 1); 

    //So we select the first childNode of the textArea (title of doc) then move at the end of that node, using the 1
    
    range.collapse(true);

    //This resets the ranges in the window.getSelection() element
    sel.removeAllRanges();
    //This adds the range we just created, placing the caret where we want
    sel.addRange(range);

};

//Function that will be triggered if user is about to delete the first <p> element to avoid Chrome's div nigthmare in contenteditable
export function avoidDeletion(textArea, e){

    let innerLength = textArea.innerHTML.length;

    innerLength < 13 ? e.preventDefault() : null;

};

export function selectionToChange(textArea){

    console.log(sel.getRangeAt(0), 0);


};

