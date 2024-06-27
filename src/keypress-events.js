//The start point for key press events
// import * as jWindow from './j-window';
import { isShowingBlockOptions } from './block-options-operations';
// import * as blockOperation from './block-operation';

import * as commandFactory from './command-factory';


// Block operations is operations related to the block it self. Create a block, delete a block, change the block type, etc...
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', function (event) {

        if (event.target.classList.contains('key-trigger') && !isShowingBlockOptions()) {
            if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                //TODO: pass the event not event.target/it`s more simple to deal with event when create a click eventListener
                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.CREATE_NEW_ELEMENT, [event.target]);
                command.execute();

            } else if (event.key === 'Backspace' && isActiveContentBlank(event) && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_PREVIOUS);
                command.execute();

            } else if (event.key === 'Delete' && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_NEXT);
                command.execute();

            } else if (event.key === 'Escape' && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                //TODO: write the code to select the all text

            }
        }
    });
});

// Block options operations is operations related to the Block Options. Show the block options, hide the block options, filter, ...
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', function (event) {

        if (event.target.classList.contains('key-trigger') && !isShowingBlockOptions()) {

            if (event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.SHOW_BLOCK_OPTIONS);
                command.execute();
            }
        }

        if (event.target.classList.contains('key-trigger') && isShowingBlockOptions()) {

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

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_FAKE_FOCUS_TYPE);
                command.execute();

            } else if (/^[a-z0-9]$/i.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.FILTER_CONCAT, [event]);
                command.execute();

            } else if (event.key === 'Backspace') {

                const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.FILTER_REMOVE_LAST);
                command.execute();
            }
        }
    });
});

function isActiveContentBlank() {
    return document.activeElement.textContent.trim() === '';
}