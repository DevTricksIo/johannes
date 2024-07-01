// The start point for click events

import * as commandFactory from './command-factory';
import { isShowingTextFormattingBar } from './text-formatting-bar-operation';
import { canHideTextFormattingBar } from './text-formatting-bar-operation';
import { isOutOfTextFormattingBar } from './text-formatting-bar-operation';
import { isTriggable } from './helper';



let isMousedownKeyTrigger = false;

// Block operations events
document.addEventListener('DOMContentLoaded', function () {
    if (johannesEditor) {
        document.querySelectorAll('.block-operation').forEach(option => {
            option.addEventListener('click', function (event) {

                const operation = this.getAttribute('data-block-operation');

                const command = commandFactory.createCommand(operation, [event]);

                command.execute();
            });
        });
    }
});


// Text operations events
//CODE...

document.addEventListener('DOMContentLoaded', function () {
    if (johannesEditor) {
        document.querySelectorAll('.text-formatting-operation').forEach(option => {
            option.addEventListener('click', function (event) {

                const operation = this.getAttribute('data-text-formatting-operation');

                const command = commandFactory.createCommand(operation, [event]);

                command.execute();

            });
        });
    }
});




document.addEventListener('mousedown', function(event){
    if(isTriggable(event)){
        isMousedownKeyTrigger = true;
    }
});

//Mouse up + selection event
document.addEventListener('mouseup', function (event) {
    if (window.getSelection().toString().trim() !== '' && isMousedownKeyTrigger && !isShowingTextFormattingBar()) {

        setTimeout(() => {
            if (window.getSelection().toString().trim() !== '') {
                event.preventDefault();
                event.stopPropagation();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
                command.execute();
            }
        }, 10);

        // clearTextFormattingButtonActive();
        // showTextFormattingBar(event);
        // updateTextFormattingActiveButtons();

    }
});


//
document.addEventListener('mouseup', function (event) {
    if (isShowingTextFormattingBar() && canHideTextFormattingBar() && isOutOfTextFormattingBar(event)) {

        const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR, [event]);
        command.execute();
    }
});