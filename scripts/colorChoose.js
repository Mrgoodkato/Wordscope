//Graphics options buttons grabbed from HTML
const gridBtn = document.getElementById('show-grid');

//Variables to be passed to P5
var grid = true;

//Color chooser for the background
const backgroundColor = document.getElementById('background-color-picker');

//Color chooser for the dots
const colorPicker = document.getElementById('dot-color-picker');

//Theme picker
const themes = document.querySelectorAll("[data-]");

//Elements with colors to be changed in HTML
const themeElements = document.querySelectorAll("[data-color]");

const colorsMap = [
  blue = {
    name: 'blue',
    primary: '#32328F',
    secondary: '#0B0514',
  },
  purple = {
    name: 'purple',
    primary: '#381249',
    secondary: '#120619',
  },
  aquablue = {
    name: 'aquablue',
    primary: '#123C49',
    secondary: '#060F19',
  },
  green = {
    name: 'green',
    primary: '#124920',
    secondary: '#06190F',
  },
  golden = {
    name: 'golden',
    primary: '#494512',
    secondary: '#161906',
  },
  red = {
    name: 'red',
    primary: '#491212',
    secondary: '#190606',
  }
]


themes.forEach((theme, indx) => {
    theme.addEventListener('click', ()=>{
        let themeName = theme.getAttribute('data-');
        changeTheme(themeName);
        let mapObj = colorsMap[indx];
        changeCanvas(mapObj);
    });
});

//Function that will search and replace into the html element the class color
function changeTheme(setColor){

  themeElements.forEach(element => {

    let oldColor = themeGet(element);
    let oldColorClass = new RegExp('-' + oldColor + '-', 'g');
    let newColor = '-' + setColor + '-';
    let regExp = new RegExp('(?:[\\S]*' + oldColor + '[\\S]*)', 'gm');
    let oldTheme = element.classList.value.match(regExp);
    let newTheme = oldTheme[0].replace(oldColorClass, newColor);
    element.classList.replace(oldTheme[0], newTheme);
    

  });  

};

//Helper function to check an element in the data-color attribute for the color being used at the moment
//Returns that color as string
function themeGet(element){
  let finalColor;
  colorsMap.forEach(color => {

    let regExpTmp = new RegExp('-' + color.name + '-', 'g');
    let isThere = regExpTmp.test(element.classList.value);
    if(isThere) {
      finalColor = color.name;
    };
  });
  return finalColor;
};

//Function to change the canvas primary and secondary colors according to the object in the colorsMap array
function changeCanvas(mapObj){
  colorPicker.value = mapObj.primary;
  backgroundColor.value = mapObj.secondary;
};

//Grid option
gridBtn.addEventListener('click', ()=>{

  grid = grid ? false : true;

});