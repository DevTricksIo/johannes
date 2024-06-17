import { createNewDraggableParagraphElement } from './element-farm';
import { focusOnTheEndOfTheText } from './helper';

document.addEventListener('DOMContentLoaded', () => {

    const content = document.querySelector('.johannes-editor > .content');

    content.addEventListener('input', function (event) {

        const target = event.target;

        if (target.tagName === 'P' && target.isContentEditable) {

            const blocks = target.innerText.split('\n');

            if (blocks.length > 1) {

                event.preventDefault();

                // Remove original text to avoid duplication
                target.innerText = blocks[0]; // Keep the first actual line paragraph 

                let currentTarget = target.closest('.draggable-block');
                let lastContentBlock = null;

                // Each new line, create a new P below the actual
                for (let i = 1; i < blocks.length; i++) {

                    const newParagraph = createNewDraggableParagraphElement();

                    //works?  I dont't know
                    lastContentBlock = newParagraph.querySelector('.johannes-content-element');

                    lastContentBlock.innerText = blocks[i];
                    currentTarget.insertAdjacentElement('afterend', newParagraph);
                    currentTarget = newParagraph;
                }

                focusOnTheEndOfTheText(lastContentBlock);
            }
        }
    });
});