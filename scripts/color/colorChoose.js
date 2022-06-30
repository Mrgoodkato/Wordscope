//Color chooser for the background
const backgroundColor = document.getElementById('background-color-picker');

//Color chooser for the dots
const colorPicker = document.getElementById('dot-color-picker');

//Theme picker
const themes = document.querySelectorAll("[data-]");

//Elements with colors to be changed in HTML
const themeElements = document.querySelectorAll("[data-color]");

const colors = ['blue', 'purple', 'aquablue', 'green', 'golden', 'red', 'orange'];


themes.forEach(theme => {
    theme.addEventListener('click', ()=>{
        changeTheme(theme.getAttribute('data-'));

    });
});

//Function that will search and replace into the html element the class color
function changeTheme(setColor){

  themeElements.forEach(element => {

    let oldColor = new RegExp('-' + themeGet(element) + '-', 'g');
    let newColor = '-' + setColor + '-';
    let regExp = new RegExp('(?:[\\S]*' + themeGet(element) + '[\\S]*)', 'gm');
    let oldTheme = element.classList.value.match(regExp);
    let newTheme = oldTheme[0].replace(oldColor, newColor);
/*     console.log(oldTheme[0], newTheme);
 */    element.classList.replace(oldTheme[0], newTheme);
    

  });  

};

//Helper function to check an element in the data-color attribute for the color being used at the moment
//Returns that color as string
function themeGet(element){
  for(let i = 0; i < colors.length; i++){
    
    let regExpTmp = new RegExp('-' + colors[i] + '-', 'g');
    let isThere = regExpTmp.test(element.classList.value);

    if(isThere) return colors[i]; 

  };
};