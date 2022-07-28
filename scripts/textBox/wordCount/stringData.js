import wordMath from "./wordMaths.js";
import {checkDictionary} from "./dictionary/dictionaryFun.js";

export default class StringData{

    constructor(stringRaw){
        this.data = [];
        this.stringRaw = stringRaw;
        this.limit = {x: 0, y:0};
    };

    //This populates the stringData array that contains the string coordinates (x,y)
    countWords(adding){
        if(this.stringRaw === null && !adding) return;
        this.stringRaw.forEach((str) => {
            this.typeOfWord(str);
        });
    };

    //This function decides what values to assign to each [str] object in the stringData array
    typeOfWord(str){
        if(this.data[str] === undefined) {
            this.addWord(str, true);
        } else {
            checkDictionary(str) ? (str) =>{
                let rep = data[str].repeat + 1;
                data[str] = {size: 2, str: str, repeat: rep, pos: this.processWord(str)}
            } : this.addWord(str, false);
        }
    };

    //Function to compute str object if checkDictionary is false
    addWord(str, newWord){
        if(newWord){
            this.data[str] = {size: 1, str: str, repeat: 1};
            this.data[str].pos = this.processWord(str);
            return;
        }
        this.data[str].size += 1;
        this.data[str].repeat += 1;
    };    

    //This calculates the coordinate values of each string based on internal algorithm, takes from wordMaths
    processWord(str){

        let coordinate = {x: 0, y: 0};    

        str.length !== 1 ? coordinate = wordMath(str, false) : coordinate = wordMath(str, true); 

        coordinate.x = Math.abs(coordinate.x);
        coordinate.y = Math.abs(coordinate.y);

        this.limit = this.limitAdapt(this.limit, coordinate);
        return coordinate;
        
    };

    //Adapts the limitX, limitY variables according to the coordinates values over time
    limitAdapt(limit, coordinate){

        if(limit.x < coordinate.x) limit.x = coordinate.x;
        if(limit.y < coordinate.y) limit.y = coordinate.y;

        return limit;

    };

};










