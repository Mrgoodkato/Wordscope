/* 

How to work with this function to add style and insert style tags into the selection:

HTML Possibility using <b>:

<p>Hola yo soy el frailejón 
    <b> Ernesto 
        <u> Perez </u> 
    <'b> 
    <u> y te vengo <'u> 
a traer 
    <i> una cancioncita <'i> 
<'p>

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
    range.setStart(selection.startContainer, startOffset);
    range.setEnd(selection.endContainer, endOffset);

    rangeGrab(range, style);
    
};
//Helper function to define start and end of range from left to right even in the event of starting at the right, ending in left
function rangeGrab(range, style){

    let extract = new DocumentFragment();
    let children;
    let wrapNode = document.createElement(style);

    extract.append(range.extractContents());
    children = extract.childNodes;

    let childrenLngth = children.length;

    wrapNode = iterateAllSelection(children, wrapNode);

    console.log(wrapNode);

    range.insertNode(wrapNode);



};
//Function to go over all nodes selected in the text to add them to the new tag wrap (b, i, u)
function iterateAllSelection(children, wrapNode){

    let arr = Array.from(children);

    for(let i = 0; i < arr.length; i++){

        if(arr[i].parentNode.nodeName === 'B'){
            console.log('Its already bold');
        };

        if(arr[i].nodeName === 'B'){
            let content = document.createTextNode(arr[i].innerHTML);
            wrapNode.append(content);
        } else wrapNode.append(arr[i]); 
        
    };

    return wrapNode;
};