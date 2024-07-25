// export let savedRange = null;

// export function saveSelection() {
//     if (window.getSelection) {
//         const sel = window.getSelection();
//         if (sel.rangeCount > 0) {
//             savedRange = sel.getRangeAt(0).cloneRange();
//         }
//     }
// }

// export function temporarySelectContentFromCurrentSelection() {

//     setTimeout(() => {
//         console.log('select all content temporarrly')
//         if (window.getSelection) {
//             const selection = window.getSelection();

//             if (selection.rangeCount > 0) {
//                 const range = savedRange || selection.getRangeAt(0);
//                 let container = range.commonAncestorContainer;

//                 if (container.nodeType !== 1) {
//                     container = container.parentNode;
//                 }

//                 const contentElement = container.closest('.johannes-content-element');

//                 if (contentElement) {
//                     selection.removeAllRanges();

//                     const newRange = document.createRange();
//                     newRange.selectNodeContents(contentElement);

//                     selection.addRange(newRange);
//                 } else {
//                     console.log("Nenhum elemento '.content' envolvendo a seleção atual foi encontrado.");
//                 }
//             }
//         }
//     }, 11);
// }

// export function restoreSelection() {

//     setTimeout(() => {
//         console.log('restore selection');

//         const selection = window.getSelection();
//         if (savedRange) {
//             selection.removeAllRanges();
//             selection.addRange(savedRange);
//         }
//     }, 10);
// }

// export function getSavedRange() {
//     return savedRange;
// }

// export function clearAllSelection() {
//     savedRange = null;
//     window.getSelection().removeAllRanges();
// }

// export function removeSavedSelection() {
//     savedRange = null;
// }

// export function getCurrentDraggableBlockFocused() {

//     let currentBlockRange = window.getSelection().getRangeAt(0);

//     let commonAncestor = currentBlockRange.commonAncestorContainer;

//     if (commonAncestor.nodeType === 3) { //* text node */
//         commonAncestor = commonAncestor.parentNode;
//     }

//     const currentBlock = commonAncestor.closest('.block');

//     return currentBlock;
// }


// export function hasSelection() {
//     savedRange != null;
// }

// export function isRangeCoveringElement(element, range) {
//     const textNodes = getTextNodes(element);

//     if (textNodes.length === 0) {
//         return false;
//     }

//     const firstNode = textNodes[0];
//     if (range.startContainer !== firstNode || range.startOffset !== 0) {
//         return false;
//     }

//     const lastNode = textNodes[textNodes.length - 1];
//     if (range.endContainer !== lastNode || range.endOffset !== lastNode.length) {
//         return false;
//     }

//     return true;
// }

// function getTextNodes(node) {
//     let textNodes = [];
//     if (node.nodeType === Node.TEXT_NODE) {
//         textNodes.push(node);
//     } else {
//         node.childNodes.forEach(child => {
//             textNodes = textNodes.concat(getTextNodes(child));
//         });
//     }
//     return textNodes;
// }

// export function getSelectedClosestElementAcceptingClosest() {
//     let currentRange = window.getSelection().getRangeAt(0);
//     if (!currentRange || currentRange.collapsed) {
//         console.error('No valid selection found.');
//         return null;
//     }

//     let commonAncestor = currentRange.commonAncestorContainer;

//     while (commonAncestor.nodeType !== 1) {
//         commonAncestor = commonAncestor.parentNode;
//     }

//     return commonAncestor;
// }

// export function getClosestContentEditable() {
//     return getSelectedClosestElementAcceptingClosest().closest('.editable');
// }