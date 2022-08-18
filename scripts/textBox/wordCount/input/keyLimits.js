//Function that will be triggered if user is about to delete the first <p> element to avoid Chrome's div nigthmare in contenteditable
export function avoidDeletion(textArea, e){

    let innerLength = textArea.innerHTML.length;
    let sel = document.getSelection();
    let beginNode = textArea.childNodes;

    if(innerLength === 0){
        e.preventDefault();
        textArea.innerHTML = '<p>&nbsp</p>';
        sel.setBaseAndExtent(beginNode[0].firstChild, 0, beginNode[0].firstChild, 0);
    }
};