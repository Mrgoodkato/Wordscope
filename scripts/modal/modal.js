//We import the modalAction function from modalOptions to add the listeners and other functionality to the modalBtns
import modalAction from "./modalOptions.js";


export default class Modal{

  constructor(textArea){
    this.modalBtns = document.querySelectorAll("[data-modalBtn]");
    this.textArea = textArea;
  };

  createModalBtns() {
    this.modalBtns.forEach(btn => {

      btn.addEventListener('click', ()=>{
        modalAction(btn, this.textArea);
      });
    
    });
  }
};