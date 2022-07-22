//Function that goes through all nodes in textbox to determine position of element selected
//In order to make changes
export function firstInteraction(textArea){

    //We create a range that will be used to place the caret
    var range = document.createRange();
    //Also a variable to store the current selection
    var sel = window.getSelection();

    //So we select the first childNode of the textArea (title of doc) then move at the end of that node, using the 1
    range.setStart(textArea.childNodes[0], 1);
    range.collapse(true);

    //This resets the ranges in the window.getSelection() element
    sel.removeAllRanges();
    //This adds the range we just created, placing the caret where we want
    sel.addRange(range);

    

};

export function furtherInteraction(textArea){

    //Defines what happens after second interaction onwards (meaning that textArea has childNodes < 1)
    console.log("Second interaction");
};