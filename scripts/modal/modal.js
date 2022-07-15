//We import the modalAction function from modalOptions to add the listeners and other functionality to the modalBtns
import modalAction from "./modalOptions.js";

export default class Modal{

  constructor(){
    this.modalBtns = document.querySelectorAll("[data-modalBtn]");
  };

  createModalBtns() {
    this.modalBtns.forEach(btn => {

      btn.addEventListener('click', ()=>{
        modalAction(btn);
      });
    
    });
  }
};