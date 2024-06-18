export function createNewH2Element() {

    let newElement = document.createElement('h2');
    newElement.classList.add('johannes-content-element');

    newElement.contentEditable = true;

    newElement.setAttribute('data-placeholder', 'Heading 2');

    return newElement;
}

export function createNewHeadingElement(number = 2) {

    if (number < 1 || number > 6) {
        throw new Error("Invalid heading number");
    }

    let newElement = document.createElement(`h${number}`);
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('focusable');

    newElement.contentEditable = true;

    newElement.setAttribute('data-placeholder', `Heading ${number}`);

    return newElement;
}


export function createNewParagraphElement() {

    let newElement = document.createElement('p');
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('focusable');

    newElement.contentEditable = true;

    newElement.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');

    return newElement;
}

export function createNewDraggableParagraphElement() {

    let newDiv = document.createElement('div');
    let newElement = createNewParagraphElement();

    let newButton = document.createElement('button');
    newButton.innerHTML = '<svg width="20" height="20" fill="currentColor"><use href="#icon-material-drag"></use></svg>';

    newDiv.appendChild(newButton);
    newDiv.appendChild(newElement);

    newDiv.classList.add('draggable-block');
    newButton.classList.add('drag-handler');
    newButton.classList.add('button-reset');
    newButton.draggable = true;

    return newDiv;
}

export function createNewListElement(text) {
    const newList = document.createElement('ul');
    newList.classList.add('johannes-content-element');

    const initialItem = createNewLiElement(text);

    newList.appendChild(initialItem);

    return newList;
}


export function createNewLiElement(text = '') {

    // let newButton = document.createElement('button');
    // let p = document.createElement('p');


    // newButton.classList.add('button-reset');
    // newButton.classList.add('drag-handler');

    // newButton.innerHTML = '<svg width="20" height="20" fill="currentColor"><use href="#icon-material-drag"></use></svg>';

    let initialItem = document.createElement('li');
    initialItem.classList.add('focusable');

    // initialItem.classList.add('draggable-block');
    


    // p.innerText = text;
    initialItem.innerText = text;

    // initialItem.appendChild(p);
    // initialItem.appendChild(newButton);

    // initialItem.innerHTML = initialItem.innerText + newButton.innerHTML;

    initialItem.contentEditable = true;
    initialItem.setAttribute('data-placeholder', 'Item');

    // initialItem.innerHTML = initialItem.innerHTML + '';

    return initialItem;

}


