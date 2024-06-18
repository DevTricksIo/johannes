import { createNewDraggableParagraphElement } from './element-farm';

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.isContentEditable && !e.target.closest('li')) {
            e.preventDefault();

            const newP = createNewDraggableParagraphElement();

            const draggableBlock = e.target.closest('.draggable-block');

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
        }
    });
});