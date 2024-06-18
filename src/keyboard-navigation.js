// document.addEventListener('DOMContentLoaded', function (event) {
//     const blockWrapper = document.querySelector('.block-options-wrapper');

//     if (blockWrapper) {

//         const first = this.querySelector('.option');
//         let current = null;

//         blockWrapper.addEventListener('keydown', function (event) {

//             current = current || first;

//             if (event.key === 'ArrowDown') {
//                 event.preventDefault();
//                 current = moveToNextOption(current);
//             } else if (event.key === 'ArrowUp') {
//                 event.preventDefault();
//                 current = moveToPreviousOption(current);
//             }
//         });
//     }
// });


// function moveToNextOption(current) {

//     let next = current.nextElementSibling;

//     if (!(next && next.classList.contains('option'))) {

//         let currentSection = current.closest('section');
//         let siblingSection = currentSection.nextElementSibling;

//         if (siblingSection) {
//             next = siblingSection.querySelector('.option');
//         } else {
//             next = document.querySelector('.block-options-wrapper .option');
//         }

//     }

//     next.focus();

//     return next;
// }

// function moveToPreviousOption(current) {

//     let previous = current.previousElementSibling;

//     if (!(previous && previous.classList.contains('option'))) {

//         let currentSection = current.closest('section');
//         let siblingSection = currentSection.previousElementSibling;

//         if (siblingSection) {
//             let options = siblingSection.querySelectorAll('.option');
//             previous = options[options.length - 1];
//         } else {
//             let options = document.querySelectorAll('.block-options-wrapper .option');
//             previous = options[options.length - 1];
//         }
//     }

//     previous.focus();

//     return previous;
// }









document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.querySelector('.johannes-editor > .content');
    const blockSelection = document.querySelector('.block-options-wrapper');

    function isCursorAtEnd(target) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;

        const range = selection.getRangeAt(0);
        if (!range.collapsed) return false;

        let node = range.endContainer;
        while (node != target && node.nextSibling == null) {
            node = node.parentNode;
        }
        return node == target && range.endOffset == range.endContainer.textContent.length;
    }

    function isCursorAtStart(target) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;

        const range = selection.getRangeAt(0);
        if (!range.collapsed) return false;

        let node = range.startContainer;
        while (node != target && node.previousSibling == null) {
            node = node.parentNode;
        }
        return node == target && range.startOffset == 0;
    }

    function isAtFirstVisibleLine(target) {
        const selection = window.getSelection();

        if (!selection.rangeCount || selection.anchorNode.parentNode !== target) {
            return target.childNodes.length === 0;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const contentRect = target.getBoundingClientRect();

        return rect.top === contentRect.top;
    }


    function isAtLastVisibleLine(target) {
        const selection = window.getSelection();
        if (!selection.rangeCount) {
            return target.textContent.length === 0;
        }

        const originalRange = selection.getRangeAt(0).cloneRange(); 
        const originalRect = originalRange.getBoundingClientRect();

        selection.modify('move', 'forward', 'line'); 
        const newRect = selection.getRangeAt(0).getBoundingClientRect();

        const isLastLine = originalRect.top === newRect.top;

        selection.removeAllRanges();
        selection.addRange(originalRange);

        return isLastLine;
    }




    content.addEventListener('keydown', function (event) {
        const target = event.target;
        if (blockSelection.style.display === 'none') {
            if (event.key === 'ArrowRight' && isCursorAtEnd(target)) {
                alert('Tecla direita pressionada no final do conteúdo.');
                event.preventDefault();
            } else if (event.key === 'ArrowLeft' && isCursorAtStart(target)) {
                alert('Tecla esquerda pressionada no início do conteúdo.');
                event.preventDefault();
            } else if (event.key === 'ArrowDown' && isAtLastVisibleLine(target)) {
                alert('Tecla para baixo pressionada na última linha visível do conteúdo.');
                event.preventDefault();
            } else if (event.key === 'ArrowUp' && isAtFirstVisibleLine(target)) {
                alert('Tecla para cima pressionada na primeira linha visível do conteúdo.');
                event.preventDefault();
            }
        }
    });
});