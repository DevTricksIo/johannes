import './add-block.css';

import * as factory from './element-factory';
import * as jSelection from './j-selection';
import { closeAll } from './j-window';

//** Just create a new paragraph draggable block and insert in the DOM */
export function createADefaultBlock(eventParagraph) {

    const newBlock = factory.createNewDraggableParagraphElement();

    if (eventParagraph && eventParagraph.closest('.draggable-block')) {
        const sibling = eventParagraph.closest('.draggable-block');
        sibling.insertAdjacentElement('afterend', newBlock);
    } else {
        document.querySelector('.johannes-editor > .content').appendChild(newBlock);
    }

    const focusable = newBlock.querySelector('.johannes-content-element');
    focusable.focus();
}

//** Delete the closest draggable-block parent of a child. Take the current selection if a child is not passed. */
export function deleteDraggableParentBlock(child) {

    let draggableBlockToRemove = null;

    if (child && child.closest('.draggable-block')) {
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

//** Delete the current element and the draggable-block parent if empty. A block is empty if has no editable element inside. */
export function deleteTheCurrentElementAndTheDraggableBlockIfEmpty(element) {

    const parentBlock = element.closest('.draggable-block');
    const actual = element.closest('.deletable');

    actual.remove();

    if (parentBlock && parentBlock.querySelectorAll('.editable').length == 0) {
        parentBlock.remove();
    }
}

/** Transform a block type into another */
export function transformBlock(blockElement, type) {

    let contentElement = blockElement.querySelector('.swittable');
    let content = contentElement.innerText;

    if (content.endsWith('/')) {
        content = content.slice(0, -1); // Remove the last '/'
    }

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

    removeDisplayNoneFromAllBlockOptions();
    blockElement.replaceChild(newContentBlock, contentElement);

    const focus = newContentBlock.querySelector('.focus') || newContentBlock;

    if (focus) {
        setTimeout(() => {
            focusOnTheEndOfTheText(focus);
        }, 0);
    }

    document.querySelector('.block-options-wrapper').style.display = 'none';
}


export function moveDownBlock() {

}

export function moveUpBlock() {

}

export function duplicateBlock(block) {

}

function clearAllAfterDelete() {
    jSelection.clearSelection();
    closeAll();
}