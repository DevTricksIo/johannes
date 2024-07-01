// import { focusOnPrevious } from './j-window';
// import { focusOnNext } from './j-window';


// document.addEventListener('DOMContentLoaded', (event) => {
    
//     const content = document.querySelector('.johannes-editor > .content');
//     const blockSelection = document.querySelector('.block-options-wrapper');


//     content.addEventListener('keydown', function (event) {
//         const target = event.target;
//         if (blockSelection.style.display === 'none') {
//             if (event.key === 'ArrowRight' && isCursorAtEnd(target)) {
//                 event.preventDefault();

//                 focusOnNext(target);

//             } else if (event.key === 'ArrowLeft' && isCursorAtStart(target)) {
//                 event.preventDefault();

//                 focusOnPrevious(target);

//             } else if (event.key === 'ArrowDown' && isAtLastVisibleLine(target)) {
//                 event.preventDefault();

//                 let position = getCursorXPosition();
//                 focusOnNext(target, position);


//             } else if (event.key === 'ArrowUp' && isAtFirstVisibleLine(target)) {
//                 event.preventDefault();

//                 let position = getCursorXPosition();
//                 focusOnPrevious(target, position);
//             }
//         }
//     });
// });


// function getCursorXPosition() {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) {
//         return 0;
//     }

//     const range = selection.getRangeAt(0).cloneRange();
//     const rect = range.getBoundingClientRect();
//     return rect.left;
// }

// function isCursorAtEnd(target) {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return false;

//     const range = selection.getRangeAt(0);
//     if (!range.collapsed) return false;

//     let node = range.endContainer;
//     while (node != target && node.nextSibling == null) {
//         node = node.parentNode;
//     }
//     return node == target && range.endOffset == range.endContainer.textContent.length;
// }

// function isCursorAtStart(target) {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return false;

//     const range = selection.getRangeAt(0);
//     if (!range.collapsed) return false;

//     let node = range.startContainer;
//     while (node != target && node.previousSibling == null) {
//         node = node.parentNode;
//     }
//     return node == target && range.startOffset == 0;
// }

// function isAtFirstVisibleLine(target) {
//     const selection = window.getSelection();

//     if (!selection.rangeCount || selection.anchorNode.parentNode !== target) {
//         return target.childNodes.length === 0;
//     }

//     const range = selection.getRangeAt(0);
//     const rect = range.getBoundingClientRect();
//     const contentRect = target.getBoundingClientRect();

//     return rect.top === contentRect.top;
// }

// function isAtLastVisibleLine(target) {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) {
//         return target.textContent.length === 0;
//     }

//     const originalRange = selection.getRangeAt(0).cloneRange();
//     const originalRect = originalRange.getBoundingClientRect();

//     selection.modify('move', 'forward', 'line');
//     const newRect = selection.getRangeAt(0).getBoundingClientRect();

//     const isLastLine = originalRect.top === newRect.top;

//     selection.removeAllRanges();
//     selection.addRange(originalRange);

//     return isLastLine;
// }