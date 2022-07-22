import {dictionary} from "./dictionary.js";

//Method to check the dictionary script for common words used
export function checkDictionary(str){
    let result = false;
    for(let i = 0; i < dictionary.length; i++){ 

        if(dictionary[i] === str.toLowerCase()) {
            result = true;
            break;
        }
    }
    return result;
};