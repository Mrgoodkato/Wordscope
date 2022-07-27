export function randomRange(min, max, isInteger){

    if(isInteger){

        let intMin = Math.ceil(min);
        let intMax = Math.floor(max);

        return Math.floor(Math.random() * (max-min) + min);

    }else return Math.random() * (max-min) + min;
 
};