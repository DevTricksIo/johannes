//The start point for key press events

import { executeCommand } from './command-factory';
import * as jWindow from './j-window';


import * as commandFactory from './command-factory';

// import * as blockOptionsManager from './block-options-manager';


// Block operations is operations related to the block it self. Create a block, delete a block, change the block type, etc...
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', function (event) {

        if (event.target.classList.contains('key-trigger') && !jWindow.blockOptionsManager.isShowingBlockOptions()) {
            if (event.key === 'Enter' && !jWindow.blockOptionsManager.isShowingBlockOptions() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                //TODO: transform into a command
                createNewElementWhenHitEnter(event);

            } else if (event.key === 'Backspace' && !jWindow.blockOptionsManager.isShowingBlockOptions() && isActiveContentBlank(event) && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                //TODO: transform into a command
                let currentElement = document.activeElement;

                jWindow.focusOnPrevious(document.activeElement);
                executeCommand(currentElement, 'delete-current-element-and-parent-block-if-empty');

            } else if (event.key === 'Delete' && !jWindow.blockOptionsManager.isShowingBlockOptions() && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();

                //TODO: transform into a command
                let currentElement = document.activeElement;

                jWindow.focusOnNext(document.activeElement);
                executeCommand(currentElement, 'delete-current-element-and-parent-block-if-empty');

            } else if (event.key === 'Escape' && !jWindow.blockOptionsManager.isShowingBlockOptions() && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                //TODO: write the code to select the all text

            } else if (event.key === 'Escape' && !jWindow.blockOptionsManager.isShowingBlockOptions() && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();
                selectContentWhenHitEscape();
            }
        }
    });
});


// Block options operations is operations related to the Block Options. Show the block options, hide the block options, filter, ...
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', function (event) {

        if (event.target.classList.contains('key-trigger')) {

            if (event.key === '/' && !jWindow.blockOptionsManager.isShowingBlockOptions() && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                const command = commandFactory.createCommand(
                    commandFactory.OPERATIONS.BLOCK_OPTIONS.SHOW_BLOCK_OPTIONS);

                command.execute();
            } else if (event.key === 'Escape' && jWindow.blockOptionsManager.isShowingBlockOptions() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                const elementToFocusAfterHide = event.target;

                const command = commandFactory.createCommand(
                    commandFactory.OPERATIONS.BLOCK_OPTIONS.HIDE_BLOCK_OPTIONS, [elementToFocusAfterHide]);

                command.execute();
            } else if (event.key === 'ArrowDown' && jWindow.blockOptionsManager.isShowingBlockOptions() && event.target.isContentEditable) {
                event.preventDefault();

                const command = commandFactory.createCommand(
                    commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION);

                command.execute();

            } else if (event.key === 'ArrowUp' && jWindow.blockOptionsManager.isShowingBlockOptions() && event.target.isContentEditable) {
                event.preventDefault();

                const command = commandFactory.createCommand(
                    commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION);

                command.execute();

            } else if (event.key === 'Enter' && jWindow.blockOptionsManager.isShowingBlockOptions() && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                const command = commandFactory.createCommand(
                    commandFactory.OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_FAKE_FOCUS_TYPE);

                command.execute();
            }
        }
    });
});



function isActiveContentBlank() {
    return document.activeElement.textContent.trim() === '';
}

function createNewElementWhenHitEnter(event) {
    let contentElement = event.target.closest('.johannes-content-element');

    if (contentElement.classList.contains('list')) {
        executeCommand(event.target, 'create-list-element');
    } else {
        executeCommand(event.target, 'create-default-block');
    }
}