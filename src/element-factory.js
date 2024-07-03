export function createNewHeadingElement(number = 2) {

    let newElement = document.createElement(`h${number}`);
    newElement.setAttribute('data-type', `h${number}`);
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('swittable');
    newElement.classList.add('focusable');
    newElement.classList.add('focus');
    newElement.classList.add('key-trigger');

    newElement.contentEditable = true;

    newElement.setAttribute('data-placeholder', `Heading ${number}`);

    return newElement;
}

export function createNewParagraphElement(text) {

    let newElement = document.createElement('p');
    newElement.setAttribute('data-type', 'p');
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('swittable');
    newElement.classList.add('focusable');
    newElement.classList.add('key-trigger');

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
    newDiv.classList.add('deletable');
    newButton.classList.add('drag-handler');
    newButton.classList.add('button-reset');
    newButton.draggable = true;

    return newDiv;
}

export function createNewListElement(text, type = 'ul') {
    const newList = document.createElement(type);
    newList.classList.add('johannes-content-element');
    newList.classList.add('swittable');
    newList.classList.add('list');

    if (type == 'ul') {
        newList.setAttribute('data-type', 'bulleted-list');
    } else {
        newList.setAttribute('data-type', 'numbered-list');
    }

    const initialItem = createNewLiElement(text);

    newList.appendChild(initialItem);

    return newList;
}

export function createNewTodoListElement(text, type = 'ul') {
    const newList = document.createElement(type);
    newList.classList.add('johannes-content-element');
    newList.classList.add('checkbox-list');
    newList.classList.add('list');
    newList.setAttribute('data-type', 'todo-list');

    const initialItem = createNewCheckboxLiElement(text);

    newList.appendChild(initialItem);

    return newList;
}


export function createNewLiElement(text = '') {

    let initialItem = document.createElement('li');

    initialItem.classList.add('focusable');
    initialItem.classList.add('deletable');
    initialItem.classList.add('editable');
    initialItem.classList.add('focus');
    initialItem.classList.add('key-trigger');
    initialItem.classList.add('list-item');

    initialItem.innerText = text;

    initialItem.contentEditable = true;
    initialItem.setAttribute('data-placeholder', 'Item');

    return initialItem;

}

export function createNewCheckboxLiElement(text = '') {

    let li = document.createElement('li');
    li.classList.add('deletable');
    li.classList.add('list-item');

    initialItem.classList.add('key-trigger');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    let span = document.createElement('span');
    span.textContent = text || "";
    span.setAttribute('data-placeholder', 'To-do');
    span.contentEditable = true;

    span.classList.add('focusable');
    span.classList.add('editable');
    span.classList.add('focus');

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
    quote.classList.add('johannes-content-element');
    quote.setAttribute('data-type', 'quote');

    const p = createNewNoSwittableParagraphElement(text);
    const cite = createNewNoSwittableCiteElement();

    quote.appendChild(p);
    quote.appendChild(cite);

    return quote;
}

function createNewNoSwittableParagraphElement(text) {

    let newElement = document.createElement('p');
    newElement.classList.add('focus');
    newElement.classList.add('focusable');
    newElement.classList.add('editable');
    newElement.classList.add('key-trigger');

    newElement.contentEditable = true;

    newElement.innerText = text || "";

    newElement.setAttribute('data-placeholder', '”To be, or not to be, that is the question”');

    return newElement;
}

function createNewNoSwittableCiteElement(text) {

    let newElement = document.createElement('cite');
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('focusable');
    newElement.classList.add('deletable');
    newElement.classList.add('editable');

    newElement.contentEditable = true;

    newElement.innerText = text || "";

    newElement.setAttribute('data-placeholder', '— Socrates');

    return newElement;
}


export function createCheckedSVG() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('checked-svg');
    let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#icon-material-small-check");

    svg.appendChild(use);
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'currentColor');

    return svg;
}