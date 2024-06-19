

export function createNewHeadingElement(number = 2) {

    if (number < 1 || number > 6) {
        throw new Error("Invalid heading number");
    }

    let newElement = document.createElement(`h${number}`);
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('swittable');
    newElement.classList.add('focusable');

    newElement.contentEditable = true;

    newElement.setAttribute('data-placeholder', `Heading ${number}`);

    return newElement;
}


export function createNewParagraphElement(text) {

    let newElement = document.createElement('p');
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('swittable');
    newElement.classList.add('focusable');

    newElement.contentEditable = true;

    newElement.innerText = text || "";

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

export function createNewListElement(text, type = 'ul') {
    const newList = document.createElement(type);
    newList.classList.add('johannes-content-element');
    newList.classList.add('swittable');

    const initialItem = createNewLiElement(text);

    newList.appendChild(initialItem);

    return newList;
}

export function createNewTodoListElement(text, type = 'ul') {
    const newList = document.createElement(type);
    newList.classList.add('johannes-content-element');
    newList.classList.add('swittable');
    newList.classList.add('todo-list');

    const initialItem = createNewCheckboxLiElement(text);

    newList.appendChild(initialItem);

    return newList;
}


export function createNewLiElement(text = '') {

    let initialItem = document.createElement('li');
    initialItem.classList.add('focusable');

    initialItem.innerText = text;

    initialItem.contentEditable = true;
    initialItem.setAttribute('data-placeholder', 'Item');

    return initialItem;

}

export function createNewCheckboxLiElement(text = '') {

    let li = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    let span = document.createElement('span');
    span.textContent = text || "";
    span.classList.add('focusable');
    span.setAttribute('data-placeholder', 'To-do');
    span.contentEditable = true;
    

    li.appendChild(checkbox);
    li.appendChild(span);

    return li;
}

export function createNewSeparatorElement() {

    let newElement = document.createElement('hr');

    return newElement;
}


export function createNewQuoteElement(text) {
    const quote = document.createElement('blockquote');
    quote.classList.add('swittable');

    const p = createNewNoSwittableParagraphElement(text);

    quote.appendChild(p);

    return quote;
}

function createNewNoSwittableParagraphElement(text) {

    let newElement = document.createElement('p');
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('focusable');

    newElement.contentEditable = true;

    newElement.innerText = text || "";

    newElement.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');

    return newElement;
}