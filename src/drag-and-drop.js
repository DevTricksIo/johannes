document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.johannes-editor');

    let draggedItem = null;

    let dropLine = document.createElement('div');
    dropLine.classList.add('drop-line');
    dropLine.style.height = '2px';
    dropLine.style.display = 'none';

    content.addEventListener('dragstart', (e) => {
        if (e.target.classList?.contains('drag-handler')) {
            draggedItem = e.target.closest('.block');
            draggedItem.setAttribute('draggable', 'true');
            setTimeout(() => {
                draggedItem.style.opacity = '0.5';
            }, 0);
        }
    });

    content.addEventListener('dragend', () => {
        setTimeout(() => {
            if (draggedItem) {
                draggedItem.style.opacity = '';
                draggedItem.removeAttribute('draggable');
                draggedItem = null;
            }
            dropLine.remove();
        }, 0);
    });

    content.addEventListener('dragover', (e) => {
        e.preventDefault();
        let target = e.target.closest('.block');

        if (target && target !== draggedItem) {
            let bounding = target.getBoundingClientRect();
            let offset = bounding.y + bounding.height / 2;

            if (e.clientY > offset) {
                if (target.nextElementSibling !== dropLine) {
                    target.insertAdjacentElement('afterend', dropLine);
                }
            } else {
                if (target.previousElementSibling !== dropLine) {
                    target.insertAdjacentElement('beforebegin', dropLine);
                }
            }
        }

        dropLine.style.display = 'block';
    });

    content.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dropLine.parentElement) {
            dropLine.parentElement.insertBefore(draggedItem, dropLine);
            dropLine.remove();
        }
    });
});