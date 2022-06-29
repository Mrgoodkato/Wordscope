//Color chooser for the background
const backgroundColor = document.getElementById('background-color-picker');

//Color chooser for the dots
const colorPicker = document.getElementById('dot-color-picker');

//Theme picker
const themes = document.querySelectorAll("[data-]");

themes.forEach(theme => {
    theme.addEventListener('click', ()=>{
        console.log(theme.getAttribute('data-'));
    })
});

