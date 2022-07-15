import Modal from "./modal/modal.js";
import dragModal from "./modal/dragModal.js";
import TextBox from "./textBox/textBox.js";

//Creating an instance of the Modal class from modal.js
const modal = new Modal();
const textBox = new TextBox();
//Function declaration
modal.createModalBtns();
textBox.createTxtBtns();
dragModal();
