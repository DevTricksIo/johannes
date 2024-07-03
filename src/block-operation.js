import * as factory from './element-factory';
import * as jSelection from './j-selection';
import { focusOnTheEndOfTheText } from './j-window';

import { focusOnPrevious } from './j-window';
import { focusOnNext } from './j-window';

import { createNewLiElement } from './element-factory';
import { createNewCheckboxLiElement } from './element-factory';
import { createNewDraggableParagraphElement } from './element-factory';

import { hideAllDependentBox } from './components/text-formatting-bar/text-formatting-bar';
import { hideTextFormattingBar } from './components/text-formatting-bar/text-formatting-bar';

//** Create a default block or a element list */
export function createNewElement(event) {

    const element = event.target;

    const contentElement = element.closest('.johannes-content-element');

    if (contentElement && contentElement.classList.contains('list')) {
        createListItem(contentElement);
    } else {
        createADefaultBlock(contentElement);
    }
}

//** Just create a new paragraph draggable block and insert in the DOM */
function createADefaultBlock(eventParagraph) {

    const newBlock = factory.createNewDraggableParagraphElement();

    if (eventParagraph && eventParagraph.closest('.draggable-block')) {
        const sibling = eventParagraph.closest('.draggable-block');
        sibling.insertAdjacentElement('afterend', newBlock);
    } else {
        document.querySelector('.johannes-editor > .content').appendChild(newBlock);
    }

    const focusable = newBlock.querySelector('.johannes-content-element');
    // focusable.focus();

    focusOnTheEndOfTheText(focusable);
}

export function createListItem(element) {

    let newContentElement = null;

    let activeElement = document.activeElement;
    let contentElement = element.closest('.johannes-content-element');

    if (contentElement.classList.contains('checkbox-list')) {
        newContentElement = createNewCheckboxLiElement();
    } else if (contentElement.classList.contains('list')) {
        newContentElement = createNewLiElement();
    } else {
        newContentElement = createNewDraggableParagraphElement();
    }

    let parentBlock = null;

    if (contentElement.classList.contains('list')) {

        parentBlock = contentElement;

        const textContent = activeElement.textContent.trim();

        if (textContent === '') {

            parentBlock = element.closest('.draggable-block');

            element.closest('.deletable').remove();

            newContentElement = createNewDraggableParagraphElement();
            parentBlock.insertAdjacentElement('afterend', newContentElement);

        } else {
            const activeElement = document.activeElement.closest('.list-item');
            activeElement.insertAdjacentElement('afterend', newContentElement);
        }

    } else {
        parentBlock = element.closest('.draggable-block');

        if (parentBlock) {
            if (parentBlock.nextSibling) {
                parentBlock.parentNode.insertBefore(newContentElement, parentBlock.nextSibling);
            } else {
                parentBlock.parentNode.appendChild(newContentElement);
            }
        }
    }

    focusOnTheEndOfTheText(newContentElement);
}

//** Delete the closest draggable-block parent of a child. Take the current selection if a child is not passed. */
export function deleteDraggableParentBlock(child) {

    let draggableBlockToRemove = null;

    if (child && child instanceof HTMLElement && child.closest('.draggable-block')) {
        draggableBlockToRemove = child.closest('.draggable-block');
    } else {
        draggableBlockToRemove = jSelection.getCurrentDraggableBlockFocused();
    }

    if (draggableBlockToRemove) {
        draggableBlockToRemove.remove();
    } else {
        throw new Error('Focusable Element Not Found Exception');
    }

    clearAllAfterDelete();
}

export function deleteAndFocusOnPrevious() {

    const currentActiveElement = document.activeElement;

    focusOnPrevious(currentActiveElement);
    deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentActiveElement);
}

export function deleteAndFocusOnNext() {

    const currentActiveElement = document.activeElement;

    focusOnNext(currentActiveElement);
    deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentActiveElement);
}


//** Delete the current element and the draggable-block parent if empty. A block is empty if has no editable element inside. */
function deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentElement) {

    const parentBlock = currentElement.closest('.draggable-block');
    const actual = currentElement.closest('.deletable');

    actual.remove();

    if (parentBlock && parentBlock.querySelectorAll('.editable').length == 0) {
        parentBlock.remove();
    }
}

/** Transform a block type into another */
export function transformBlock(blockElement, type) {

    //blockElement, type


    let contentElement = blockElement.querySelector('.swittable');
    let content = contentElement.innerText;

    // if (content.endsWith('/')) {
    //     content = content.slice(0, -1); // Remove the last '/'
    // }

    let newContentBlock;

    switch (type) {
        case 'p':
            {
                newContentBlock = factory.createNewParagraphElement();
                newContentBlock.innerText = content;
                break;
            }
        case 'h1':
            {
                newContentBlock = factory.createNewHeadingElement(1);
                newContentBlock.innerText = content;
                break;
            }
        case 'h2':
            {
                newContentBlock = factory.createNewHeadingElement(2);
                newContentBlock.innerText = content;
                break;
            }
        case 'h3':
            {
                newContentBlock = factory.createNewHeadingElement(3);
                newContentBlock.innerText = content;
                break;
            }
        case 'h4':
            {
                newContentBlock = factory.createNewHeadingElement(4);
                newContentBlock.innerText = content;
                break;
            }
        case 'h5':
            {
                newContentBlock = factory.createNewHeadingElement(5);
                newContentBlock.innerText = content;
                break;
            }
        case 'h6':
            {
                newContentBlock = factory.createNewHeadingElement(6);
                newContentBlock.innerText = content;
                break;
            }
        case 'code':
            newContentBlock = document.createElement('pre');
            const code = document.createElement('code');
            code.innerText = content;
            newContentBlock.appendChild(code);
            break;
        case 'image':
            newContentBlock = document.createElement('img');
            newContentBlock.src = content;
            newContentBlock.alt = "Descriptive text";
            break;
        case 'quote':
            {
                newContentBlock = factory.createNewQuoteElement(content);

                break;
            }
        case 'bulleted-list':
            {
                newContentBlock = factory.createNewListElement(content);

                break;
            }

        case 'numbered-list':
            {
                newContentBlock = factory.createNewListElement(content, 'ol');

                break;
            }
        case 'todo-list':
            {
                newContentBlock = factory.createNewTodoListElement(content, 'ul');

                break;
            }

        case 'separator':
            {
                newContentBlock = factory.createNewSeparatorElement();
                break;
            }

        default:
            console.error('Unsupported type');
            return;
    }

    blockElement.replaceChild(newContentBlock, contentElement);

    const focusable = newContentBlock.closest('.focusable') || blockElement.querySelector('.focusable');

    focusOnTheEndOfTheText(focusable);
}


export function moveDownBlock() {

}

export function moveUpBlock() {

}

export function duplicateSelectedBlock() {

    let element = jSelection.getCurrentDraggableBlockFocused();

    if (!element || !element.parentNode) {
        console.error('O elemento fornecido é inválido ou não está no DOM.');
        return;
    }

    const clone = element.cloneNode(true);

    // Obtem o próximo elemento irmão
    const nextElement = element.nextSibling;

    // Insere o clone antes do próximo elemento irmão no pai
    // Se o próximo elemento irmão não existir, 'insertBefore' funcionará como 'appendChild'
    element.parentNode.insertBefore(clone, nextElement);


    hideAllDependentBox();
    hideTextFormattingBar();

    focusOnTheEndOfTheText(clone);
}

function clearAllAfterDelete() {
    jSelection.clearAllSelection();

    hideAllDependentBox();
    hideTextFormattingBar();
}