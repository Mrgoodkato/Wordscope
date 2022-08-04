//Function that goes through all nodes in textbox to determine position of element selected
//In order to make changes
export function focusCaret(textArea){

    //We create a range that will be used to place the caret
    let range = document.createRange();
    //Also a variable to store the current selection
    let sel = window.getSelection();

    let innerLength = textArea.innerHTML.length;
    let finalNode = textArea.childNodes.length;


    innerLength <= 13 ? range.setStart(textArea.childNodes[0], 0) : range.setStart(textArea.childNodes[finalNode-1], 1); 

    //So we select the first childNode of the textArea (title of doc) then move at the end of that node, using the 1
    
    range.collapse(true);

    //This resets the ranges in the window.getSelection() element
    sel.removeAllRanges();
    //This adds the range we just created, placing the caret where we want
    sel.addRange(range);

};

//This function selects only one <p> node of the text, this to be able to change the alignment of the text successfully.
export function selectionToChange(){

    let selection = document.getSelection();
    let range = document.createRange();
    let selectNode = selection.getRangeAt(0).startContainer.parentNode;
    selectNode = recursiveParentSearch(selectNode);

    range.setStart(selectNode, 0);
    range.setEnd(selectNode, selectNode.childNodes.length);
    selection.removeAllRanges();
    selection.addRange(range);

    return selectNode;

};
//Helper function to grab the main paragraph information by going into all the parent nodes possible until reaching <p>
function recursiveParentSearch(selectNode){
    if(selectNode.nodeName !== 'P' && selectNode.nodeName !== 'DIV'){
        console.log(selectNode);
        selectNode = selectNode.parentNode;
        recursiveParentSearch(selectNode);
        return selectNode;
    }else return selectNode;
};

//Function that removes the current range, replacing it with current <p> node final offset position 
export function clearSelection(){
    let selection = document.getSelection();
    let selectFinalNode = selection.getRangeAt(0).startContainer;
    let range = document.createRange();

    range.setStart(selectFinalNode.lastChild, selectFinalNode.lastChild.length);
    range.setEnd(selectFinalNode.lastChild, selectFinalNode.lastChild.length);

    selection.removeAllRanges();
    selection.addRange(range);
};

export function selectWord(){
    let selection = document.getSelection();
    let offset = selection.getRangeAt(0).startOffset-1;
    let range = document.createRange();

    
    range.selectNode(selection.anchorNode);
    range.surroundContents(document.createElement('b'));

};

