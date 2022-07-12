window.jsPDF = window.jspdf.jsPDF;

const textArea = document.getElementById('textarea1');
const fileName = document.getElementById('file');

const boldBtn = document.getElementById('bold-btn');
const italicBtn = document.getElementById('italic-btn');
const underlineBtn = document.getElementById('underline-btn');
const colorBtn = document.getElementById('color-btn');

const sizeBtn = document.querySelectorAll('.btn-size');
const alignBtn = document.querySelectorAll('.btn-align');

const saveTxt = document.getElementById('save-txt');
const savePdf = document.getElementById('save-pdf');
const saveWord = document.getElementById('save-word')

dropBtns(alignBtn, 'align');
dropBtns(sizeBtn, 'size');

//Style buttons - bold, italic, underline, color of text
boldBtn.addEventListener('click', () =>{
    textArea.focus();
    document.execCommand('bold');
});

italicBtn.addEventListener('click', () =>{
    textArea.focus();
    document.execCommand('italic');
});

underlineBtn.addEventListener('click', () =>{
    textArea.focus();
    document.execCommand('underline');
});

colorBtn.addEventListener('input', () =>{

    textArea.focus();

    let sel = document.getSelection().getRangeAt(0).commonAncestorContainer.parentElement;

    sel.style.color = colorBtn.value;

});

//Drop menu for formatting (align, fontsize)
function dropBtns(btns, type){
    for(let i = 0; i < btns.length; i++){
        btns[i].addEventListener('click', ()=>{
            
            let sel = document.getSelection().getRangeAt(0).commonAncestorContainer.parentElement;
            
            switch(type){
                case 'align': {
                    sel.style.textAlign = btns[i].name;
                    break;
                }
                case 'size': {
                    sel.style.fontSize = btns[i].name;
                    break;
                }
            }
        })
    }
}

//Function to save the text TXT
saveTxt.addEventListener('click', ()=>{

    const a = document.createElement('a');
    const blob = new Blob([textArea.innerText]);
    const dataUrl = URL.createObjectURL(blob);
    a.href = dataUrl;
    a.download = fileName.value + '.txt';
    a.click();

});

//Function to save text in PDF
savePdf.addEventListener('click', ()=>{

    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter'
    });

    const options = {
        align: 'justify'
    };

    const splitTxt = doc.splitTextToSize(textArea.innerText, 250);

    let y = 20;
    let p = 0;

    for(let i = 0; i < splitTxt.length; i++){
        
        if(y > doc.getPageHeight() - 40){
            doc.setFontSize(8);
            p++;
            let page = "Page: " + p;
            doc.text(page, doc.getPageWidth() - 30, doc.getPageHeight() - 10)
            y = 15;
            doc.addPage();
            p++;
            page = "Page: " + p;
            doc.text(page, doc.getPageWidth() - 30, doc.getPageHeight() - 10)
        }
        doc.setFontSize(12);
        doc.text(splitTxt[i], 10, y, options);
        y += 5;
    }



    
    console.log(doc.getLineWidth());


    doc.save(fileName.value + ".pdf");
});

//Function to save document in .DOC
saveWord.addEventListener('click', () => {export2Word(textArea, fileName.value)});

function export2Word(element, filename){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+element.innerHTML+postHtml;

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
}