//Method to check the dictionary script for common words used
function checkDictionary(str){
    let result = false;
    for(let i = 0; i < dictionary.length; i++){ 

        if(dictionary[i] === str.toLowerCase()) {
            result = true;
            break;
        }
    }
    return result;
};

//Function to compute str object if checkDictionary is true
function dictionaryOps(str){
    let rep = stringData[str].repeat + 1;
    stringData[str] = {size: 2, str: str, repeat: rep, pos: processWord(str)}
};