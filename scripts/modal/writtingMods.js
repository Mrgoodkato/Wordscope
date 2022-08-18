/* 

How to work with this function to add style and insert style tags into the selection:

HTML Possibility using <b>:

<p>Hola yo soy el frailejón<b>Ernesto<u>Perez</u><'b><u>y te vengo<'u>a traer<i>una cancioncita<'i><'p>

Also:

<p><b>Hola que tal como vas<'b><'p>
<p><b>Como va la cosa<'b>Bien o no?<'p>

We are using the DocumentFragment() class so we create a new extract of all the nodes selected in a documentFragment object
Then the documentFragment is broken into its child nodes so it creates an object indexed array of nodes that we can iterate.

This will give us the possibility of checking if the node we want to add (b, i, u) is already there or not.

Also will give us a way to map out the content in order to mmore accurately add the nodes we need or remove them.

The browser automatically closes tags if the content is extracted with the range.extractContents().

So the only thing left to do is to insert the contents back with or without the selected tag (depending on the case)
where the selection is collapsed.

*/

//Function to select a word and then surround that element with a tag, be it b, i, u, etc.
export function selectWord(style){
    
    let selection = document.getSelection().getRangeAt(0);
    let startOffset = selection.startOffset;
    let endOffset = selection.endOffset;
    let range = document.createRange();
    
/*     checkForTags(selection.startContainer, selection.endContainer, range, style);
 */
    range.setStart(selection.startContainer, startOffset);
    range.setEnd(selection.endContainer, endOffset);

    rangeGrab(range, style);
    
};
//Function that checks for previous styling in the selection, if the selection was coming from a b, i or u tag
function checkForTags(selectionStart, selectionEnd, range, style){

    selectionStart = selectionStart.parentElement;
    selectionEnd = selectionEnd.parentElement; 

    console.log(selectionStart, selectionEnd);

    if(selectionStart.nodeName === style.toUpperCase() || selectionEnd.nodeName === style.toUpperCase()) {
        range.setStart(selectionStart, selectionStart.startOffset);
        range.setEnd(selectionEnd, selectionEnd.endOffset);
        console.log(range);
        rangeGrab(range, style);
    };

    if(selectionStart.parentElement.nodeName === 'P' || selectionEnd.parentElement.nodeName === 'P'
        || selectionStart.parentElement.nodeName === 'DIV' || selectionEnd.parentElement.nodeName === 'DIV') {
        console.log('returned');    
        return;
    }

    checkForTags(selectionStart, selectionEnd, range, style);

};


//Helper function to define start and end of range from left to right even in the event of starting at the right, ending in left
function rangeGrab(range, style){

    let extract = new DocumentFragment();
    let children;
    let wrapNode = document.createElement(style);

    extract.append(range.extractContents());
    children = extract.childNodes;

    wrapNode = iterateAllSelection(children, wrapNode, style);

    console.log(wrapNode);

    range.insertNode(wrapNode);



};
//Function to go over all nodes selected in the text to add them to the new tag wrap (b, i, u)
function iterateAllSelection(children, wrapNode, style){

    let arr = Array.from(children);

    for(let i = 0; i < arr.length; i++){

        if(arr[i].hasChildNodes()) {
            console.log('Has child nodes');
            console.log(arr[i].innerHTML);

            if(arr[i].nodeName === style.toUpperCase()){
                let content = document.createTextNode(arr[i].innerHTML);
                console.log(content);
                wrapNode.append(content);
            } else wrapNode.append(arr[i]);
            
            iterateAllSelection(arr[i], wrapNode, style);
        } else wrapNode.append(arr[i]); 
        
    };

    return wrapNode;
};