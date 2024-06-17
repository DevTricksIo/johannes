document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.querySelector('.content');

    content.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
            const activeElement = document.activeElement;
            if (activeElement.isContentEditable) {
                const placeholder = activeElement.getAttribute('data-placeholder');
                const textContent = activeElement.textContent.trim();

                if (textContent === '' || textContent === placeholder) {
                    event.preventDefault();

                    let actualDraggableBlock = activeElement.closest('.draggable-block');
                    let previousDraggableBlockSibling = actualDraggableBlock.previousElementSibling;

                    actualDraggableBlock.remove();

                    let previousSiblingContentElement = previousDraggableBlockSibling.querySelector('.johannes-content-element');

                    previousSiblingContentElement.focus();

                    let range = document.createRange();
                    let selection = window.getSelection();
                    range.selectNodeContents(previousSiblingContentElement);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }
    });
});