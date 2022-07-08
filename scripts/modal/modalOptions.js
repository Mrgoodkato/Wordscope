//Big ass function switching between changes done in different DOM elements
function modalAction(btn){
    
    const btnName = btn.getAttribute('data-modalBtn');

    switch (btnName){
        case 'footer-btn':
            const footerMenu = document.querySelector('[data-modal=footer-menu]');
            const footerSm = document.querySelector('[data-modal=footer-sm]');
            elementsAction(footerMenu, footerSm, btnName);
            break;
        
        case 'nav-btn':
            const navMenu = document.querySelector('[data-modal=nav-menu]');
            const navSm = document.querySelector('[data-modal=nav-sm]');
            elementsAction(navMenu, navSm, btnName);
            break;
        
        case 'txt-btn':
            const txtMenu = document.querySelector('[data-modal=txt-menu]');
            txtBoxAction(txtMenu);
            break;
    }
};

//Helper function for Footer element animation and hiding
function elementsAction(elementMenu, elementSm, name){
    
    let stateMenu = elementMenu.getAttribute('data-state');
    let stateSm = elementSm.getAttribute('data-state');

    if(stateMenu == 'closed' && stateSm == 'open'){
        elementSm.style.display = 'none';
        elementMenu.style.display = 'flex';
        elementMenu.style.animation = animationStyle(name);
        elementMenu.style.animationDuration = '1s';
        elementMenu.dataset.state = 'open';
        elementSm.dataset.state = 'closed';
    }else {
        elementSm.style.display = 'flex';
        elementMenu.style.display = 'none';
        elementMenu.dataset.state = 'closed';
        elementSm.dataset.state = 'open';
    }
};
//Helper function for ElementsAction in order to get the correct animation name from the data- attributes entered
function animationStyle(name){

    return 'move' + name.replace('-btn', '');;

};

//Stand alone function for the textbox display and hidden states
function txtBoxAction(txtMenu){

    let stateMenu = txtMenu.getAttribute('data-state');

    if(stateMenu == 'closed'){
        txtMenu.style.display = "block";
        txtMenu.style.animation = "displayEditor";
        txtMenu.style.animationDuration = "1s";
        document.getElementById('textarea1').focus();
        txtMenu.dataset.state = 'open';
    }else{
        txtMenu.style.display = "none";
        txtMenu.dataset.state = 'closed';
    }
};