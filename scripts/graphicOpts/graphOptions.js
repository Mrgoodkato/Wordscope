//Graphics options buttons grabbed from HTML
const gridBtn = document.getElementById('show-grid');

//Variables to be passed to P5
var grid = true;

//Grid option
gridBtn.addEventListener('click', ()=>{

    grid = grid ? false : true;
    console.log(grid);

});
