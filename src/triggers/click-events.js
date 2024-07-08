// The start point for click events

import * as commandFactory from '../commands/command-factory';
import { isShowingTextFormattingBar } from '../components/floating-toolbar/text-formatting-bar';
import { canHideTextFormattingBar } from '../components/floating-toolbar/text-formatting-bar';
import { isOutOfTextFormattingBar } from '../components/floating-toolbar/text-formatting-bar';
import { isTriggable } from '../helper';


let lastClickTime = 0;
let isMousedownKeyTrigger = false;
const doubleClickThreshold = 300;

// Block operations events
// document.addEventListener('DOMContentLoaded', function () {
//     if (johannesEditor) {
//         document.querySelectorAll('.block-operation').forEach(option => {
//             option.addEventListener('click', function (event) {

//                 const operation = this.getAttribute('data-block-operation');

//                 const command = commandFactory.createCommand(operation, [event]);

//                 command.execute();
//             });
//         });
//     }
// });


// Text operations events
//CODE...

// document.addEventListener('DOMContentLoaded', function () {
//     if (johannesEditor) {
//         document.querySelectorAll('.text-formatting-operation').forEach(option => {
//             option.addEventListener('click', function (event) {

//                 const operation = this.getAttribute('data-text-formatting-operation');

//                 const command = commandFactory.createCommand(operation, [event]);

//                 command.execute();

//             });
//         });
//     }
// });




// document.addEventListener('mousedown', function (event) {
//     if (isTriggable(event)) {
//         isMousedownKeyTrigger = true;
//     }
// });

//Mouse up + selection event
// document.addEventListener('mouseup', function (event) {
//     const currentTime = Date.now();
//     const timeSinceLastClick = currentTime - lastClickTime;
//     lastClickTime = currentTime;

//     if (timeSinceLastClick < doubleClickThreshold) {
//         return;
//     }

//     if (window.getSelection().toString().trim() !== '' && isMousedownKeyTrigger && !isShowingTextFormattingBar()) {

//         setTimeout(() => {
//             if (window.getSelection().toString().trim() !== '') {
//                 event.preventDefault();
//                 event.stopPropagation();

//                 const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
//                 command.execute();
//             }
//         }, 10);

//         // clearTextFormattingButtonActive();
//         // showTextFormattingBar(event);
//         // updateTextFormattingActiveButtons();

//     }
// });

// document.addEventListener('dblclick', function (event) {
//     if (!isShowingTextFormattingBar()) {
//         setTimeout(() => {
//             if (window.getSelection().toString().trim() !== '') {
//                 event.preventDefault();
//                 event.stopPropagation();

//                 const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
//                 command.execute();
//             }
//         }, 15);
//     }
// });


//
// document.addEventListener('mouseup', function (event) {
//     if (isShowingTextFormattingBar() && canHideTextFormattingBar() && isOutOfTextFormattingBar(event)) {

//         const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR, [event]);
//         command.execute();
//     }
// });