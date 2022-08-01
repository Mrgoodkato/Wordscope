//Function to save the text TXT
export function saveTxt(textArea, fileName){

    const a = document.createElement('a');
    let finalText = fileName + '\n\n' + textArea.innerText;

    const blob = new Blob([finalText]);
    const dataUrl = URL.createObjectURL(blob);
    a.href = dataUrl;
    a.download = fileName + '.txt';
    a.click();

};

//Function to export to WORD
export function export2Word(textArea, filename){
    const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = "</body></html>";
    const html = preHtml+'<h1>'+filename+'</h1><br><br>'+textArea.innerHTML+postHtml;

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

    let testNum = 0;
    let y = 20;
    let p = 0;

    //Created a splitTextToSize array, it takes the whole textarea.inner text string and divides it
    //into an array of strings according to the size put in the second arg.
    const splitTxt = doc.splitTextToSize(textArea.innerText, 250);

    //Renders all the text in the PDF, accepts a y value for the line height between lines
    //Also accepts the p value, index of current page being rendered
    const createText = (y, p) =>{

        //Creates the title of the PDF, both at beginning and in each page as a header
        const createTitle = (isSmall) =>{

            if(isSmall === false) {
                doc.setFontSize(16);
                doc.text(fileName, 15, 15);

            }else if (isSmall === true){
                doc.setFontSize(8);
                doc.text(fileName, 5, 5);
            };
        };

        //Renders the PAGE NUMBER based on the p index
        const pageRender = (i, isSmTitle) =>{
            let page = "Page: " + (i+1);
            doc.setPage(i+1);
            createTitle(isSmTitle);
            doc.setFontSize(8);
            doc.text(page, doc.getPageWidth() - 30, doc.getPageHeight() - 10);
        };

        const populatePage = () =>{
            doc.setFont('helvetica','normal');
            for(let i = 0; i < splitTxt.length; i++){
                if(y > doc.getPageHeight() - 40){
                    y = 15;
                    p++;
                    doc.addPage();
                }
                doc.setFontSize(12);
                doc.text(splitTxt[i], 15, y);
                y += 5;
            };
        };

        const populateTitles = () =>{
            doc.setFont('helvetica','bold');
            for(let i = 0; i <= p; i++){
                
                i === 0 ? pageRender(i, false) : pageRender(i, true);
            
            };
        };

        populatePage();
        populateTitles();    
    };

    

    createText(y, p);

    doc.save(fileName + ".pdf");
};
