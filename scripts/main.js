//Variable imports
import {textArea} from "./elements/variablesDOM.js";

//Function imports
import dragModal from "./modal/dragModal.js";

//Class imports
import Modal from "./modal/modal.js";
import TextBox from "./textBox/textBox.js";

//Declaring and initializing each class
const modal = new Modal(textArea);
const textBox = new TextBox(textArea);

//Function declaration
dragModal();
modal.createModalBtns();
textBox.createTxtBtns();
textBox.updateNameOfText();

