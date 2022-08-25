/* 

In order to work with selection and range and dinamically add the styles needed, we need to consider
all the possible situations while using the text.

Lets take a textarea with any text introduced, can be 1 paragraph, 2 paragraphs, n paragraphs.
Each paragraph can already have styling done to it, which makes

1) 

*/

//Function to select a word and then surround that element with a tag, be it b, i, u, etc.
export function selectWord(style){
    
    let selection = document.getSelection().getRangeAt(0);
    let startOffset = selection.startOffset;
    let endOffset = selection.endOffset;
    let range = document.createRange();
    
    range.setStart(selection.startContainer, startOffset);
    range.setEnd(selection.endContainer, endOffset);

    console.log(range);

    let parent = {in: range.startContainer.parentElement, out: range.endContainer.parentElement};
    
    console.log(parent);

/*     rangeGrab(range, style); 
 */};

function checkForOuterNodes(parentNodeName){
    if(parentNodeName === 'U') return true;
};

function replaceOuterNodes(){



};

//Helper function to define start and end of range from left to right even in the event of starting at the right, ending in left
function rangeGrab(range, style){

    

    let extract = new DocumentFragment();
    let children;
    let wrapNode = document.createElement(style);

    extract.append(range.extractContents());
    children = extract.childNodes;

    wrapNode = iterateAllSelection(children, wrapNode, parent);

    /* console.log(wrapNode); */

    range.insertNode(wrapNode);
};
//Function to go over all nodes selected in the text to add them to the new tag wrap (b, i, u)
function iterateAllSelection(children, wrapNode, parent, style){

    let arr = Array.from(children);

    for(let i = 0; i < arr.length; i++){

        if(arr[i].hasChildNodes()) {
            console.log("Child nodes: ", arr[i].childNodes, arr[i].nodeName);
            iterateAllSelection(arr[i].childNodes, wrapNode);

            
        };
        wrapNode.append(arr[i]);
    };

    return wrapNode;
};

