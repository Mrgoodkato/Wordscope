const modalBtn = document.getElementById('show-textarea-btn');
const modalBtnSm = document.getElementById('show-textarea-btn-drop');
const closeBtn = document.getElementById('close-textarea-btn');
const overlay = document.getElementById('overlay');
const navBar = document.getElementById('navbar');
const navBarShow = document.getElementById('navbar-show');
const titleDrop = document.getElementById('title-drop');
const paletteCloseBtn = document.getElementById('hide-palettes');
const paletteShowBtn = document.getElementById('show-palettes');
const footShow = document.getElementById('footer-menu');
const footModal = document.getElementById('footer-menu-modal');

var toggleTxt = false;
var toggleNav = false;
var toggleGrid = true;
var togglePalettes = false;

//Modal for the text editor
modalBtn.addEventListener('click', () =>{
  toggleTxt = toggleTxt ? false : true;
  if(toggleTxt == true) {
    overlay.style.display = "block";
    overlay.style.animation = "displayEditor";
    overlay.style.animationDuration = "1s";
    document.getElementById('textarea1').focus();
  }else {
    overlay.style.display = "none";
  }
  
});

modalBtnSm.addEventListener('click', () =>{
  toggleTxt = toggleTxt ? false : true;
  if(toggleTxt == true) {
    overlay.style.display = "block";
    overlay.style.animation = "displayEditor";
    overlay.style.animationDuration = "1s";
    document.getElementById('textarea1').focus();
  }else {
    overlay.style.display = "none";
  }
  
});

closeBtn.addEventListener('click', () =>{
    overlay.style.display = "none";
});

//Modal for the nav header
navBarShow.addEventListener('click', ()=>{
  toggleNav = toggleNav ? false : true;
  if(toggleNav == true) {
    navBar.style.display = "flex";
    navBar.style.animation = "moveMenu";
    navBar.style.animationDuration = "2s";
    titleDrop.style.display = "none";
  }
  else {
    navBar.style.display = "none";
    titleDrop.style.display = "flex";
  }

});

//Modal for the palettes menu
paletteCloseBtn.addEventListener('click', ()=>{
  togglePalettes = togglePalettes ? false : true;
  if(togglePalettes == true){
    footShow.style.display = "none";
    footModal.style.display = "flex";
  }
  else {
    footShow.style.display = "flex";
    footShow.style.animation = "moveFooter";
    footShow.style.animationDuration = "1s";
    footModal.style.display = "none";
  }
  togglePalettes = !togglePalettes ? true : false;
  console.log(togglePalettes);
});

paletteShowBtn.addEventListener('click', ()=>{

  togglePalettes = togglePalettes ? false : true;
  if(togglePalettes == true){
    footModal.style.display = "none";
    footShow.style.display = "flex";
    footShow.style.animation = "moveFooter";
    footShow.style.animationDuration = "1s";
  }
  else {
    footModal.style.display = "flex";
    footShow.style.display = "none";
  }
  togglePalettes = !togglePalettes ? true : false;
  console.log(togglePalettes);

});

// Make the DIV element draggable:
dragElement(document.getElementById("modal"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
}