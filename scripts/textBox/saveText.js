//Function to save the text TXT
export function saveTxt(textArea, fileName){

    const a = document.createElement('a');
    const blob = new Blob([textArea.innerText]);
    const dataUrl = URL.createObjectURL(blob);
    a.href = dataUrl;
    a.download = fileName + '.txt';
    a.click();

};

//Function to export to WORD
export function export2Word(textArea, filename){
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

//Function to export to PDF using JSPDF dependency
export function export2PDF(textArea, fileName){
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

    //Creates the title of the PDF, only at the beginning of the PDF
    const createTitle = () =>{
        doc.setFontSize(8);
        doc.text("Created using Wordscope", 5, 5);
    };

    //Renders all the text in the PDF, accepts a y value for the line height between lines
    //Also accepts the p value, index of current page being rendered
    const createText = (y, p) =>{

        //Renders the PAGE NUMBER based on the p index
        const pageRender = (p) =>{
            doc.setFontSize(8);
            let page = "Page: " + (p+1);
            doc.setPage(p+1);
            doc.text(page, doc.getPageWidth() - 30, doc.getPageHeight() - 10);
        };
    
        //Restricts the PAGE NUMBER function to execute only in 3 situations:
        //1) When its the beginning of all the text
        //2) Right after a new page is created
        //3) When we render the final line of text in the whole file
        const pageLimit = (i, p, y) =>{
            if(i === 0) pageRender(p);
            else if(y > doc.getPageHeight() - 40) pageRender(p);
            else if(i === splitTxt.length-1) pageRender(p);
        };

        for(let i = 0; i < splitTxt.length; i++){
            pageLimit(i, p, y);
            if(y > doc.getPageHeight() - 40){
                y = 15;
                p++;
                doc.addPage();
            }
            doc.setFontSize(12);
            doc.text(splitTxt[i], 10, y);
            y += 5;
        };
    };

    let y = 20;
    let p = 0;

    createTitle();
    createText(y, p);

    doc.save(fileName + ".pdf");
};
