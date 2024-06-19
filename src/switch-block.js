import * as farm from './element-farm.js';

import { focusOnTheEndOfTheText } from './helper.js';
import { changeVirtualFocus } from './helper.js';
import { showBlockOptions } from './helper.js';

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

                setTimeout(() => {

                    const target = event.target;

                    if (target.closest('.draggable-block')) {
                        event.preventDefault(); // Avoid / be inserted
                        currentDraggableBlock = target.closest('.draggable-block');
                        triggerElement = target;

                        removeDisplayNoneFromAllBlockOptions();

                        filterText = '';
                        showBlockOptions();
                        let firstOption = blockOptions.querySelector('.option');
                        removeAllVirtualFocus();
                        currentFocusedOption = changeVirtualFocus(triggerElement, firstOption);
                    }

                }, 0);

            } else if (event.key === 'Escape' && event.target.isContentEditable && blockOptions.style.display !== 'none' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                if (triggerElement) {
                    triggerElement.focus();

                    currentFocusedOption.classList.remove('block-options-focused');
                }

                document.querySelector('.block-options-wrapper').style.display = 'none';
                filterText = '';
                removeDisplayNoneFromAllBlockOptions();

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
                event.preventDefault();

                currentFocusedOption = moveToNextOption(currentFocusedOption, triggerElement);

            } else if (event.key === 'ArrowUp' && event.target.isContentEditable && blockOptions.style.display !== 'none') {
                event.preventDefault();

                currentFocusedOption = moveToPreviousOption(currentFocusedOption, triggerElement);

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

function moveToNextOption(current, keepFocused) {
    let next = current.nextElementSibling;

    while (next && (!next.classList.contains('option') || !isElementVisible(next))) {
        next = next.nextElementSibling;
    }

    if (!next) {
        let currentSection = current.closest('section');
        let siblingSection = currentSection.nextElementSibling;

        while (siblingSection) {
            next = siblingSection.querySelector('.option');
            if (next && isElementVisible(next)) {
                break;
            }
            siblingSection = siblingSection.nextElementSibling;
        }

        if (!next) {
            next = document.querySelector('.block-options-wrapper .option');
            while (next && !isElementVisible(next)) {
                next = next.nextElementSibling;
            }
        }
    }

    removeAllVirtualFocus();

    changeVirtualFocus(keepFocused, next);

    return next;
}

function moveToPreviousOption(current, keepFocused) {
    let previous = current.previousElementSibling;

    while (previous && (!previous.classList.contains('option') || !isElementVisible(previous))) {
        previous = previous.previousElementSibling;
    }

    if (!previous) {
        let currentSection = current.closest('section');
        let siblingSection = currentSection.previousElementSibling;

        while (siblingSection) {
            let options = siblingSection.querySelectorAll('.option');
            for (let i = options.length - 1; i >= 0; i--) {
                if (isElementVisible(options[i])) {
                    previous = options[i];
                    break;
                }
            }
            if (previous) break;
            siblingSection = siblingSection.previousElementSibling;
        }

        if (!previous) {
            let options = document.querySelectorAll('.block-options-wrapper .option');
            for (let i = options.length - 1; i >= 0; i--) {
                if (isElementVisible(options[i])) {
                    previous = options[i];
                    break;
                }
            }
        }
    }

    removeAllVirtualFocus();

    changeVirtualFocus(keepFocused, previous);

    return previous;
}

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

function findFirstVisibleOption() {

    let options = document.querySelectorAll('.johannes-editor .block-options-wrapper section .option');

    for (let option of options) {
        if (option.style.display !== 'none' && option.offsetParent !== null) {
            return option;
        }
    }

    return null;
}

function isElementVisible(element) {
    return element && element.style.display !== 'none' && element.style.visibility !== 'hidden' && element.offsetParent !== null;
}

function removeAllVirtualFocus() {
    let focusedElements = document.querySelectorAll('.johannes-editor .block-options-wrapper .block-options-focused');

    focusedElements.forEach(element => {
        element.classList.remove('block-options-focused');
    });
}

/** Transform a block type into another */
function transformBlock(blockElement, type) {

    let contentElement = blockElement.querySelector('.johannes-content-element');
    let content = contentElement.innerText;

    if (content.endsWith('/')) {
        content = content.slice(0, -1); // Remove the last '/'
    }

    let newContentBlock;

    switch (type) {
        case 'p':
            {
                newContentBlock = farm.createNewParagraphElement();
                newContentBlock.innerText = content;
                break;
            }
        case 'h1':
            {
                newContentBlock = farm.createNewHeadingElement(1);
                newContentBlock.innerText = content;
                break;
            }
        case 'h2':
            {
                newContentBlock = farm.createNewHeadingElement(2);
                newContentBlock.innerText = content;
                break;
            }
        case 'h3':
            {
                newContentBlock = farm.createNewHeadingElement(3);
                newContentBlock.innerText = content;
                break;
            }
        case 'h4':
            {
                newContentBlock = farm.createNewHeadingElement(4);
                newContentBlock.innerText = content;
                break;
            }
        case 'h5':
            {
                newContentBlock = farm.createNewHeadingElement(5);
                newContentBlock.innerText = content;
                break;
            }
        case 'h6':
            {
                newContentBlock = farm.createNewHeadingElement(6);
                newContentBlock.innerText = content;
                break;
            }
        case 'code':
            newContentBlock = document.createElement('pre');
            const code = document.createElement('code');
            code.innerText = content;
            newContentBlock.appendChild(code);
            break;
        case 'image':
            newContentBlock = document.createElement('img');
            newContentBlock.src = content;
            newContentBlock.alt = "Descriptive text";
            break;
        case 'quote':
            {
                newContentBlock = farm.createNewQuoteElement(content);
                // newContentBlock.innerText = content;
                break;
            }
        case 'bulleted-list':
            {
                newContentBlock = farm.createNewListElement(content);

                let li = newContentBlock.querySelector('li');

                setTimeout(() => {
                    focusOnTheEndOfTheText(li);
                }, 0);
                break;
            }

        case 'numbered-list':
            {
                newContentBlock = farm.createNewListElement(content, 'ol');

                let li = newContentBlock.querySelector('li');

                setTimeout(() => {
                    focusOnTheEndOfTheText(li);
                }, 0);
                break;
            }
        case 'todo-list':
            {
                newContentBlock = farm.createNewTodoListElement(content, 'ul');

                let li = newContentBlock.querySelector('li');

                setTimeout(() => {
                    focusOnTheEndOfTheText(li);
                }, 0);
                break;
            }

        case 'separator':
            {
                newContentBlock = farm.createNewSeparatorElement();
                break;
            }

        default:
            console.error('Unsupported type');
            return;
    }

    removeDisplayNoneFromAllBlockOptions();
    blockElement.replaceChild(newContentBlock, contentElement);

    focusOnTheEndOfTheText(newContentBlock);

    document.querySelector('.block-options-wrapper').style.display = 'none';
}