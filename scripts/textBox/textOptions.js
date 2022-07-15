export function colorSelect(btn, textArea){
    textArea.focus();
    let sel = window.getSelection().getRangeAt(0).commonAncestorContainer.parentElement;
    sel.style.color = btn.value;
};

export function txtBtnSelector(btn, textArea, filename){

    const btnName = btn.getAttribute('data-txt');

    switch(btnName){
        case 'text-bold':
            textArea.focus();
            document.execCommand('bold');
            break;
        case 'text-italic':
            textArea.focus();
            document.execCommand('italic');
            break;
        case 'text-underline':
            textArea.focus();
            document.execCommand('underline');
            break;
        case 'text-size':
            dropBtns(btn, 'size');
            break;
        case 'text-align':
            dropBtns(btn, 'align');
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

//Function to align-set size of btns
function dropBtns(btn, type){

    if(window.getSelection().anchorNode === null) return;

    let sel = window.getSelection().getRangeAt(0).commonAncestorContainer.parentElement;
    
    if(sel.getAttribute('data-txt-area') === null) return;

    switch(type){
        case 'align': {
            sel.style.textAlign = btn.name;
            break;
        }
        case 'size': {
            sel.style.fontSize = btn.name;
            break;
        }
    };
};

//Function to save the text TXT
function saveTxt(textArea, fileName){

    const a = document.createElement('a');
    const blob = new Blob([textArea.innerText]);
    const dataUrl = URL.createObjectURL(blob);
    a.href = dataUrl;
    a.download = fileName + '.txt';
    a.click();

};

function export2Word(textArea, filename){
    const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = "</body></html>";
    const html = preHtml+textArea.innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
};

function export2PDF(textArea, fileName){
    //Little tweak for the JSPDF to work:
    window.jsPDF = window.jspdf.jsPDF;

    //Creating the jsPDF object with some properties:
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter'
    });

    //Created a splitTextToSize array, it takes the whole textarea.inner text string and divides it
    //into an array of strings according to the size put in the second arg.
    const splitTxt = doc.splitTextToSize(textArea.innerText, 250);

    const pageRender = (i) =>{
        doc.setFontSize(8);
        let page = "Page: " + (i+1);
        doc.setPage(i+1);
        doc.text(page, doc.getPageWidth() - 30, doc.getPageHeight() - 10);
    };

    let y = 20;
    let p = 0;
    doc.setFontSize(8);
    doc.text("Created using Wordscope", 5, 5);
    for(let i = 0; i < splitTxt.length; i++){
        pageRender(i);
        if(y > doc.getPageHeight() - 40){
            y = 15;
            doc.addPage();
        }
        doc.setFontSize(12);
        doc.text(splitTxt[i], 10, y);
        y += 5;
    }

    doc.save(fileName + ".pdf");
};