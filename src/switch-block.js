// //Close the options wrapper when click out
// document.addEventListener('DOMContentLoaded', (event) => {
//     const editor = document.querySelector('.johannes-editor');

//     if (editor) {
//         document.addEventListener('mousedown', function (event) {
//             const optionsWrapper = document.querySelector('.block-options-wrapper');

//             if (optionsWrapper) {
//                 const isClickInsideOptions = optionsWrapper.contains(event.target);
//                 const mainMouseButton = event.button === 0;

//                 if (!isClickInsideOptions && mainMouseButton) {
//                     optionsWrapper.style.display = 'none';
//                 }
//             }
//         });
//     }
// });









// //Added event to listen turnIntoSelect options
// document.addEventListener('DOMContentLoaded', function () {
//     turnIntoSelect.querySelectorAll('.option').forEach(option => {
//         option.addEventListener('click', function (event) {

//             let type = this.getAttribute('data-type');
//             let selection = window.getSelection();

//             if (!selection.rangeCount) return;
//             let selectedNode = selection.getRangeAt(0).startContainer;

//             let currentDraggableBlock = selectedNode.nodeType === 3 ?
//                 selectedNode.parentNode.closest('.block') :
//                 selectedNode.closest('.block');
//             if (currentDraggableBlock) {
//                 transformBlock(currentDraggableBlock, type);
//             }

//             closeAllDependentBox();
//             tryHideTextFormattingBar();

//             // turnIntoSelect.style.display = 'none';
//             // blockOptionsWrapper.style.display = 'none';
//         });
//     });
// });