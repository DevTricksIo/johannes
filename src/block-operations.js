import { createNewDraggableParagraphElement } from './element-farm';
import { createNewLiElement } from './element-farm';
import { createNewCheckboxLiElement } from './element-farm';

import { focusOnPrevious } from './helper';
import { focusOnNext } from './helper';
import { focusOnTheEndOfTheText } from './helper';

import './list.css';

document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.querySelector('.johannes-editor > .content');
    const blockSelection = document.querySelector('.johannes-editor .block-options-wrapper');

    content.addEventListener('keydown', function (event) {

        if (event.key === 'Enter' && blockSelection.style.display == 'none' && event.target.isContentEditable && !event.shiftKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();

            const activeElement = document.activeElement;

            let newContentElement = null;

            let boxContent = event.target.closest('.johannes-content-element');

            if (boxContent.classList.contains('checkbox-list')) {
                newContentElement = createNewCheckboxLiElement();
            } else if (boxContent.classList.contains('list')) {
                newContentElement = createNewLiElement();
            } else {
                newContentElement = createNewDraggableParagraphElement();
            }

            let parentBlock = null;

            if (boxContent.classList.contains('list')) {

                parentBlock = boxContent;

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    parentBlock = event.target.closest('.draggable-block');

                    event.target.closest('.deletable').remove();

                    newContentElement = createNewDraggableParagraphElement();
                    parentBlock.insertAdjacentElement('afterend', newContentElement);
                
                } else {
                    event.target.closest('.list-item').insertAdjacentElement('afterend', newContentElement);
                }

            } else {
                parentBlock = event.target.closest('.draggable-block');

                if (parentBlock) {
                    if (parentBlock.nextSibling) {
                        parentBlock.parentNode.insertBefore(newContentElement, parentBlock.nextSibling);
                    } else {
                        parentBlock.parentNode.appendChild(newContentElement);
                    }
                }
            }

            setTimeout(() => {
                let focus = newContentElement.querySelector('.focus') || newContentElement;

                if (focus) {
                    focusOnTheEndOfTheText(focus);
                }
            }, 0);

        } else if (event.key === 'Backspace' && blockSelection.style.display == 'none' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            const activeElement = document.activeElement;
            if (activeElement.isContentEditable) {

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    event.preventDefault();

                    focusOnPrevious(activeElement);

                    let parentBlock = activeElement.closest('.draggable-block');
                    let actual = activeElement.closest('.deletable');

                    actual.remove();

                    if (parentBlock) {
                        let isEmpty = parentBlock.querySelectorAll('.editable').length <= 0;

                        if (isEmpty) {
                            parentBlock.remove();
                        }
                    }

                }
            }
        } else if (event.key === 'Delete' && blockSelection.style.display == 'none' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            const activeElement = document.activeElement;
            if (activeElement.isContentEditable) {

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    event.preventDefault();

                    focusOnNext(activeElement);

                    const parentBlock = activeElement.closest('.draggable-block');
                    const actual = activeElement.closest('.deletable');

                    actual.remove();

                    if (parentBlock) {
                        const isEmpty = parentBlock.querySelectorAll('.editable').length <= 0;

                        if (isEmpty) {
                            parentBlock.remove();
                        }
                    }
                }
            }
        }
    });
});