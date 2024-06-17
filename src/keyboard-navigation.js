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