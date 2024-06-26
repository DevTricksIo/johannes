import * as factory from './element-factory.js';

import { focusOnTheEndOfTheText } from './helper.js';
import { changeVirtualFocus } from './helper.js';

import { showBlockOptions } from './j-window.js';


import { tryHideTextFormattingBar } from './j-window.js';
import { closeAllDependentBox } from './j-window.js';

import './switch-block.css';


//Close the options wrapper when click out
document.addEventListener('DOMContentLoaded', (event) => {
    const editor = document.querySelector('.johannes-editor');

    if (editor) {
        document.addEventListener('mousedown', function (event) {
            const optionsWrapper = document.querySelector('.block-options-wrapper');

            if (optionsWrapper) {
                const isClickInsideOptions = optionsWrapper.contains(event.target);
                const mainMouseButton = event.button === 0;

                if (!isClickInsideOptions && mainMouseButton) {
                    optionsWrapper.style.display = 'none';
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const editor = document.querySelector('.johannes-editor');

    const blockOptions = document.querySelector('.johannes-editor > .block-options-wrapper');
    let triggerElement = null;
    let currentDraggableBlock = null;
    let currentFocusedOption = null;
    let filterText = '';

    if (editor) {
        editor.addEventListener('keydown', function (event) {

            if (event.key === '/' && event.target.isContentEditable && blockOptions.style.display === 'none' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                // setTimeout(() => {

                //     const target = event.target;

                //     if (target.closest('.draggable-block')) {
                //         event.preventDefault(); // Avoid / be inserted
                //         currentDraggableBlock = target.closest('.draggable-block');
                //         triggerElement = target;

                //         removeDisplayNoneFromAllBlockOptions();

                //         filterText = '';
                //         showBlockOptions();
                //         let firstOption = blockOptions.querySelector('.option');
                //         removeAllVirtualFocus();
                //         currentFocusedOption = changeVirtualFocus(triggerElement, firstOption);
                //     }

                // }, 0);

            } else if (event.key === 'Escape' && event.target.isContentEditable && blockOptions.style.display !== 'none' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                // event.preventDefault();
                // if (triggerElement) {
                //     triggerElement.focus();

                //     currentFocusedOption.classList.remove('block-options-focused');
                // }

                // document.querySelector('.block-options-wrapper').style.display = 'none';
                // filterText = '';
                // removeDisplayNoneFromAllBlockOptions();

            } else if (event.key === 'Enter' && event.target.isContentEditable && (blockOptions.style.display !== 'none' && blockOptions.style.display !== '')) {

                event.preventDefault();

                currentFocusedOption.classList.remove('block-options-focused');
                let option = currentFocusedOption;

                if (option) {

                    const block = triggerElement.closest('.draggable-block');
                    const blockType = option.getAttribute('data-type');

                    const lastSlashIndex = triggerElement.innerText.lastIndexOf('/');
                    triggerElement.innerText = lastSlashIndex !== -1 ? triggerElement.innerText.slice(0, lastSlashIndex) : triggerElement.innerText;

                    transformBlock(block, blockType);
                }

            } else if (event.key === 'ArrowDown' && event.target.isContentEditable && blockOptions.style.display !== 'none') {
                // event.preventDefault();

                // currentFocusedOption = moveToNextOption(currentFocusedOption, triggerElement);

            } else if (event.key === 'ArrowUp' && event.target.isContentEditable && blockOptions.style.display !== 'none') {
                // event.preventDefault();

                // currentFocusedOption = moveToPreviousOption(currentFocusedOption, triggerElement);

            } else if (event.key === 'Backspace' && event.target.isContentEditable && (blockOptions.style.display !== 'none' && blockOptions.style.display !== '')) {

                if (filterText.length > 0) {

                    filterText = filterText.slice(0, -1);

                    updateBlockVisibility(filterText);

                    let firstVisibleOption = findFirstVisibleOption();

                    removeAllVirtualFocus();

                    currentFocusedOption = changeVirtualFocus(triggerElement, firstVisibleOption);

                } else {
                    blockOptions.style.display = 'none';
                }


            } else if (/^[a-z0-9]$/i.test(event.key) && event.target.isContentEditable && blockOptions.style.display !== 'none' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                filterText += event.key.toLowerCase();
                updateBlockVisibility(filterText);

                let firstVisibleOption = findFirstVisibleOption();
                removeAllVirtualFocus();
                currentFocusedOption = changeVirtualFocus(triggerElement, firstVisibleOption);
            }

        });


        // Added listeners in options
        document.querySelectorAll('.block-options .option').forEach(option => {
            option.addEventListener('click', function () {
                const type = this.getAttribute('data-type');
                if (currentDraggableBlock) {
                    transformBlock(currentDraggableBlock, type);
                }
            });
        });
    }
});


function updateBlockVisibility(filter) {
    let sections = document.querySelectorAll('.johannes-editor .block-options-wrapper section');

    sections.forEach(section => {
        let options = section.querySelectorAll('.option');
        let allHidden = true;

        options.forEach(option => {
            const type = option.getAttribute('data-type');
            const title = option.querySelector('.block-title').textContent.toLowerCase();

            if (type.includes(filter) || title.includes(filter.toLowerCase())) {
                option.style.display = '';
                allHidden = false;
            } else {
                option.style.display = 'none';
            }
        });

        section.style.display = allHidden ? 'none' : '';
    });

    let emptyListIndicator = document.querySelector('.empty-block-options');

    let allOptions = document.querySelectorAll('.johannes-editor .block-options-wrapper .option');

    let hasVisibleOption = Array.from(allOptions).some(option => {
        let style = window.getComputedStyle(option);
        return style.display !== 'none';
    });

    if (hasVisibleOption) {
        emptyListIndicator.style.display = 'none';

    } else {
        emptyListIndicator.style.display = 'block';
    }
}


function removeDisplayNoneFromAllBlockOptions() {
    let sections = document.querySelectorAll('.johannes-editor .block-options-wrapper section');

    sections.forEach(section => {
        let options = section.querySelectorAll('.option');

        options.forEach(option => {
            option.style.display = '';
        });

        section.style.display = '';
    });
}



function isElementVisible(element) {
    return element && element.style.display !== 'none' && element.style.visibility !== 'hidden' && element.offsetParent !== null;
}



//Added event to listen turnIntoSelect options
document.addEventListener('DOMContentLoaded', function () {
    turnIntoSelect.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function (event) {

            let type = this.getAttribute('data-type');
            let selection = window.getSelection();

            if (!selection.rangeCount) return;
            let selectedNode = selection.getRangeAt(0).startContainer;

            let currentDraggableBlock = selectedNode.nodeType === 3 ?
                selectedNode.parentNode.closest('.draggable-block') :
                selectedNode.closest('.draggable-block');
            if (currentDraggableBlock) {
                transformBlock(currentDraggableBlock, type);
            }

            closeAllDependentBox();
            tryHideTextFormattingBar();

            // turnIntoSelect.style.display = 'none';
            // blockOptionsWrapper.style.display = 'none';
        });
    });
});