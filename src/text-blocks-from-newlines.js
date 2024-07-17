import { createNewDraggableParagraphElement } from './element-factory';
import { focusOnTheEndOfTheText } from './j-window';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.johannes-editor > .content');

    content.addEventListener('paste', function (event) {

        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        event.preventDefault();

        const target = event.target;

        if (target.tagName === 'P' && target.isContentEditable) {
            const clipboardData = event.clipboardData || window.clipboardData;
            const pastedText = clipboardData.getData('text');

            const blocks = pastedText.split('\n').filter(block => block.trim() !== '');

            target.innerText = blocks[0];

            let currentTarget = target.closest('.block');

            for (let i = 1; i < blocks.length; i++) {
                const newParagraph = createNewDraggableParagraphElement();
                const lastContentBlock = newParagraph.querySelector('.johannes-content-element');
                lastContentBlock.innerText = blocks[i];
                currentTarget.insertAdjacentElement('afterend', newParagraph);
                currentTarget = newParagraph;
            }

            focusOnTheEndOfTheText(currentTarget.querySelector('.johannes-content-element'));
        }
    });
});