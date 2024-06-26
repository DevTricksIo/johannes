import { createNewLiElement } from './element-factory';
import { createNewCheckboxLiElement } from './element-factory';
import { createNewDraggableParagraphElement } from './element-factory';

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
            element.closest('.list-item').insertAdjacentElement('afterend', newContentElement);
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
}