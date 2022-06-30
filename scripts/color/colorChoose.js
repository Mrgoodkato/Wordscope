//Color chooser for the background
const backgroundColor = document.getElementById('background-color-picker');

//Color chooser for the dots
const colorPicker = document.getElementById('dot-color-picker');

//Theme picker
const themes = document.querySelectorAll("[data-]");

//Elements with colors to be changed in HTML
const themeElements = document.querySelectorAll("[data-color]");

themes.forEach(theme => {
    theme.addEventListener('click', ()=>{
        console.log(theme.getAttribute('data-'));

    })
});

//Function that will search and replace into the html element the class color
/* function changeTheme(setColor){

  themeElements.forEach(element => {
        let oldTheme = element.classList.value;
        console.log(element.classList.value.replace(/blue/gm, 'red'));
        let newTheme = element.classList.value.replace(/blue/gm, 'red');
        element.classList.replace(oldTheme, newTheme);

  });  

}; */