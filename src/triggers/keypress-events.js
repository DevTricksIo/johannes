//The start point for key press events
import * as commandFactory from '../commands/command-factory';
import { isShowingBlockOptions } from '../components/quick-menu/quick-insert-menu';
import { isTriggable } from '../helper';
import { canHideTextFormattingBar, isShowingTextFormattingBar } from '../components/text-formatting-bar/text-formatting-bar';
import { isShowingTextFormattingSelectableDependentBox } from '../components/text-formatting-bar/text-formatting-bar';


// Block operations is operations related to the block it self. Create a block, delete a block, change the block type, etc...
document.addEventListener('DOMContentLoaded', function () {


    document.addEventListener('keydown', function (event) {

        if (isTriggable(event) && !isShowingBlockOptions()) {

            if (event.key === 'Enter' && !isShowingTextFormattingSelectableDependentBox() && !isShowingTextFormattingBar() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();
                event.stopPropagation();

                //TODO: pass the event not event.target/it`s more simple to deal with event when create a click eventListener
                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.CREATE_NEW_ELEMENT, [event]);
                command.execute();

            } else if (event.key === 'Backspace' && isActiveContentBlank(event) && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_PREVIOUS);
                command.execute();

            } else if (event.key === 'Delete' && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_NEXT);
                command.execute();

            }
        }
    });

    document.addEventListener('keyup', function (event) {

        if (isTriggable(event) && !isShowingBlockOptions()) {
            if (event.key === 'Escape' && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                //TODO: write the code to select the all text

            }
        }
    });
});

// Block options operations is operations related to the Block Options. Show the block options, hide the block options, filter, ...
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', function (event) {

        // if (isTriggable(event) && !isShowingBlockOptions()) {

        //     if (event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

        //         const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.SHOW_BLOCK_OPTIONS);
        //         command.execute();
        //     }
        // }

        if (isShowingBlockOptions()) {

            if (event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const elementToFocusAfterHide = event.target;

                //TODO: pass the event not event.target/it`s more simple to deal with event when create a click eventListener
                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.HIDE_CLEAR_BLOCK_OPTIONS, [elementToFocusAfterHide]);
                command.execute();

            } else if (event.key === 'ArrowDown' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION);
                command.execute();

            } else if (event.key === 'ArrowUp' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION);
                command.execute();

            } else if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();
                event.stopPropagation();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_BLOCK_TYPE, [event]);
                command.execute();

            } else if (/^[a-z0-9]$/i.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.FILTER_CONCAT, [event]);
                command.execute();

            } else if (event.key === 'Backspace') {

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.FILTER_REMOVE_LAST);
                command.execute();
            }
        }


        if (isShowingTextFormattingSelectableDependentBox()) {

            if (event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.HIDE_TEXT_FORMATTING_BAR, [event]);
                command.execute();

            } else if (event.key === 'ArrowDown' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION);
                command.execute();

            } else if (event.key === 'ArrowUp' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION);
                command.execute();

            } else if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();
                event.stopPropagation();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_BLOCK_TYPE, [event]);
                command.execute();

            }
        }
    });
});


// Text formatting bar operations is operations related to text presentation, color, show or hide text formatting dependent boxes,...
document.addEventListener('keyup', function (event) {
    if (event.key === 'Shift' && isTriggable(event)) {

        setTimeout(() => {
            if (window.getSelection().toString().trim() !== '') {
                const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
                command.execute();
            }
        }, 10);

    }
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === 'a' && isTriggable(event)) {

        setTimeout(() => {
            if (window.getSelection().toString().trim() !== '') {
                const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
                command.execute();
            }
        }, 10);

    } else if (event.key === 'Escape' && canHideTextFormattingBar() && isShowingTextFormattingBar()) {

        const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR, [event]);
        command.execute();
    }
});



function isActiveContentBlank() {
    return document.activeElement.textContent.trim() === '';
}


// Listen a input link
document.addEventListener('DOMContentLoaded', function () {
    linkBoxInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {

            event.preventDefault();
            event.stopPropagation();

            const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.INPUT_LINK_URL);
            command.execute();
        }
    });
});


// Lock left and right key when is showing the dependent box
document.addEventListener('keydown', function (event) {
    if (isShowingTextFormattingSelectableDependentBox() &&
        (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {

        event.preventDefault();
        event.stopPropagation();
    }
});


document.addEventListener('keyup', function (event) {
    if (isShowingTextFormattingBar() && canHideTextFormattingBar() && !isShowingTextFormattingSelectableDependentBox() &&
        (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown')) {

        setTimeout(() => {
            if (window.getSelection().toString().trim() == '') {
                const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR, [event]);
                command.execute();
            }
        }, 10);
    }
});