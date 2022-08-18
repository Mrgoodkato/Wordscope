//Variable imports
import {textArea} from "./elements/variablesDOM.js";

//Function imports
import dragModalElement from "./modal/dragModal.js";
import { sketch } from "./p5Canvas.js";

//Class imports
import Modal from "./modal/modal.js";
import TextBox from "./textBox/textBox.js";

//Declaring and initializing each class
const modal = new Modal(textArea);
const textBox = new TextBox(textArea);
const myCanvas = new p5(sketch);

//Function declaration
dragModalElement();
modal.createModalBtns();
textBox.createTxtBtns();
textBox.updateNameOfText();