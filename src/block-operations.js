import { createNewDraggableParagraphElement } from './element-farm';

import { focusOnPrevious } from './helper';
import { focusOnNext } from './helper';

document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.querySelector('.johannes-editor > .content');
    const blockSelection = document.querySelector('.johannes-editor .block-options-wrapper');

    content.addEventListener('keydown', function (event) {

        if (event.key === 'Enter' && blockSelection.style.display == 'none' && event.target.isContentEditable && !event.target.closest('li') && !event.shiftKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();

            const newP = createNewDraggableParagraphElement();

            const draggableBlock = event.target.closest('.draggable-block');

            if (draggableBlock) {
                if (draggableBlock.nextSibling) {
                    draggableBlock.parentNode.insertBefore(newP, draggableBlock.nextSibling);
                } else {
                    draggableBlock.parentNode.appendChild(newP);
                }
            }

            setTimeout(() => {
                let focusable = newP.querySelector('.johannes-content-element');

                if (focusable) {
                    focusable.focus();
                }
            }, 0);

        } else if (event.key === 'Backspace' && blockSelection.style.display == 'none' && !event.target.closest('li') && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            const activeElement = document.activeElement;
            if (activeElement.isContentEditable) {

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    event.preventDefault();

                    focusOnPrevious(activeElement);

                    let actualDraggableBlock = activeElement.closest('.draggable-block')
                    actualDraggableBlock.remove();


                }
            }
        } else if (event.key === 'Delete' && blockSelection.style.display == 'none' && !event.target.closest('li') && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            const activeElement = document.activeElement;
            if (activeElement.isContentEditable) {

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    event.preventDefault();

                    focusOnNext(activeElement);

                    let actualDraggableBlock = activeElement.closest('.draggable-block')
                    actualDraggableBlock.remove();
                }
            }
        }
    });
});