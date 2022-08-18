//Method that returns the color for the dot according repeat value and rgb taken from hex
export default function setDotColor(alphaVal, stdValue, p, repeat){
    let colorExport;
    let colorArray = hexToRGB(colorPicker.value);
    let red = colorArray[0];
    let green = colorArray[1];
    let blue = colorArray[2];
    if(stdValue) colorExport = p.color(red*5, green*5, blue*5, alphaVal);
    else colorExport = p.color(red*repeat, green*repeat, blue*repeat, alphaVal);

    return colorExport;
};

//Function to transform Hex values to RGB array of 3 numeric elements base 16
export function hexToRGB(color){

    let rgbValues = color.match(/(?:[^#].{1})/g);
    let rgbArray = [
        parseInt(rgbValues[0], 16),
        parseInt(rgbValues[1], 16),
        parseInt(rgbValues[2], 16)
    ];
    return rgbArray;
};