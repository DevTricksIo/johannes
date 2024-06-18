import { focusOnPrevious } from './helper';


document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.querySelector('.johannes-editor > .content');
    const blockSelection = document.querySelector('.johannes-editor .block-options-wrapper');

    content.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && blockSelection.style.display == 'none' && !event.target.closest('li')) {
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
        }
    });
});