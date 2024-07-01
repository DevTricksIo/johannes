import { transformBlock } from "./block-operation";
import { getCurrentDraggableBlockFocused } from './j-selection';
import { hideAllDependentBox } from './text-formatting-bar-operation';
import { hideTextFormattingBar } from './text-formatting-bar-operation';

let currentDraggableBlock = null; //This element represents the block where block-options will be displayed close to
let currentFakeFocusedOption = null; //Fake focus is where the visual focus in on
let realFocusedElement = null;   // This element is where the real/actual focus is on / TODO: change the name
let filterText = '';

export function isShowingBlockOptions() {
    return blockOptionsWrapper.style.display !== 'none'
}

export function setCurrentDraggableBlock(element) {
    if (!element.classList.contains('draggable-block')) {
        throw new Error('The Element is Not a Draggable Block');
    }

    currentDraggableBlock = element;
}

export function setRealFocusedElement(element) {
    realFocusedElement = element;
}

export function setCurrentFakeFocusElement(element) {
    currentFakeFocusedOption = element;
}

export function filterContact(event) {

    filterText += event.key.toLowerCase();

    updateBlockVisibility(filterText);

    const firstVisibleOption = getTheFirstVisibleBlockOption();
    removeAllVisualFakeFocus();

    setCurrentFakeFocusElement(firstVisibleOption);
    applyVisualFakeFocus(realFocusedElement, firstVisibleOption);
}

export function filterRemoveLast() {

    if (filterText.length > 0) {

        filterText = filterText.slice(0, -1);

        updateBlockVisibility(filterText);

        const firstVisibleOption = getTheFirstVisibleBlockOption();
        removeAllVisualFakeFocus();

        setCurrentFakeFocusElement(firstVisibleOption);
        applyVisualFakeFocus(realFocusedElement, firstVisibleOption);

    } else {
        hideAndClearBlockOptions();
    }
}

export function clear() {
    throw new Error('Not Implement Exception')
}

export function showDependentBlockOptions(element) {
    // The timeout in necessary to wait the browser process the selection before show the Block Options
    setTimeout(() => {

        removeAllVisualFakeFocus();

        let draggableBlock = getCurrentDraggableBlockFocused();

        const realFocusedElement = draggableBlock.querySelector('.focusable');
        const currentDraggableBlock = draggableBlock;
        const firstBlockOption = getTheFirstVisibleBlockOptionV2(element);

        setRealFocusedElement(realFocusedElement);
        setCurrentDraggableBlock(currentDraggableBlock);
        setCurrentFakeFocusElement(null);

        applyVisualFakeFocus(realFocusedElement, null);

    }, 10);
}

export function showMainBlockOptions() {

    // The timeout in necessary to wait the browser process the selection before show the Block Options
    setTimeout(() => {

        const realFocusedElement = document.activeElement;
        const currentDraggableBlock = realFocusedElement.closest('.draggable-block');
        const firstBlockOption = getTheFirstVisibleBlockOption();

        setRealFocusedElement(realFocusedElement);
        setCurrentDraggableBlock(currentDraggableBlock);
        setCurrentFakeFocusElement(firstBlockOption);

        applyVisualFakeFocus(realFocusedElement, firstBlockOption);


        //TODO: create a clear filter
        // removeDisplayNoneFromAllBlockOptions();

        const range = document.getSelection().getRangeAt(0);
        const cursorPos = range.getBoundingClientRect();

        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const menuWidth = 19 * remSize;

        let xPosition = cursorPos.right;
        let yPosition = cursorPos.bottom + window.scrollY;

        const margin = remSize * 1.25;

        blockOptionsWrapper.style.display = 'block';

        let blockWidth = blockOptionsWrapper.offsetWidth;


        if (xPosition + blockWidth + margin > window.innerWidth) {
            xPosition = cursorPos.left - menuWidth;
            if (xPosition < 0) xPosition = 0;
        }

        blockOptionsWrapper.style.left = `${xPosition}px`;
        blockOptionsWrapper.style.top = `${yPosition}px`;


    }, 10);
}

export function hideAndClearBlockOptions(elementToFocus) {

    if (elementToFocus) {
        elementToFocus.focus();
    }

    blockOptionsWrapper.style.display = 'none';
    clearFilter();

    //TODO: rename this
    removeDisplayNoneFromAllBlockOptions();
}



// TODO:Rename this function
export function removeDisplayNoneFromAllBlockOptions() {
    let sections = document.querySelectorAll('.johannes-editor .block-options-wrapper section');

    sections.forEach(section => {
        let options = section.querySelectorAll('.option');

        options.forEach(option => {
            option.style.display = '';
        });

        section.style.display = '';
    });
}

export function moveTheFakeFocusToPreviousBlockOption() {

    if (!currentFakeFocusedOption) {
        let options = document.getElementById(getVisibleSelectionId()).querySelectorAll('.option');
        currentFakeFocusedOption = options[options.length - 1];

        applyVisualFakeFocus(realFocusedElement, currentFakeFocusedOption);

        return;
    }

    let previous = currentFakeFocusedOption.previousElementSibling;

    while (previous && (!previous.classList.contains('option') || !isElementVisible(previous))) {
        previous = previous.previousElementSibling;
    }

    if (!previous) {
        let currentSection = currentFakeFocusedOption.closest('section');
        let siblingSection;

        if (currentSection) {
            siblingSection = currentSection.previousElementSibling;
        } else {
            siblingSection = currentFakeFocusedOption.closest('ul');
        }

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

    removeAllVisualFakeFocus();
    setCurrentFakeFocusElement(previous);
    applyVisualFakeFocus(realFocusedElement, previous);
}


function getVisibleSelectionId() {
    if (turnIntoSelect.style.display !== 'none') {
        return 'turnIntoSelect';
    }

    if (colorTextOptionSelect.style.display !== 'none') {
        return 'colorTextOptionSelect';
    }

    if (moreTextOptionSelect.style.display !== 'none') {
        return 'moreTextOptionSelect';
    }
}

export function moveTheFakeFocusToTheNextBlockOption() {

    if (!currentFakeFocusedOption) {
        currentFakeFocusedOption = document.getElementById(getVisibleSelectionId()).querySelectorAll('.option')[0];

        applyVisualFakeFocus(realFocusedElement, currentFakeFocusedOption);

        return;
    }

    let next = currentFakeFocusedOption.nextElementSibling;

    while (next && (!next.classList.contains('option') || !isElementVisible(next))) {
        next = next.nextElementSibling;
    }

    if (!next) {
        let currentSection = currentFakeFocusedOption.closest('section');
        let siblingSection;

        if (currentSection) {
            siblingSection = currentSection.nextElementSibling;
        } else {
            siblingSection = currentFakeFocusedOption.closest('ul');
        }

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

    removeAllVisualFakeFocus();
    setCurrentFakeFocusElement(next);
    applyVisualFakeFocus(realFocusedElement, next);
}


export function applySelectedBlockType(event) {

    const draggableBlock = realFocusedElement.closest('.draggable-block');
    const newBlockType = event.target.closest('.option') ?
        event.target.closest('.option').getAttribute('data-type') :
        currentFakeFocusedOption.getAttribute('data-type');

    const lastSlashIndex = realFocusedElement.innerText.lastIndexOf('/');
    realFocusedElement.innerText = lastSlashIndex !== -1 ? realFocusedElement.innerText.slice(0, lastSlashIndex) : realFocusedElement.innerText;


    transformBlock(draggableBlock, newBlockType);

    hideAndClearBlockOptions();
    hideAllDependentBox();
    hideTextFormattingBar();
}

function clearFilter() {
    filterText = '';
}

function isElementVisible(element) {
    return element && element.style.display !== 'none' && element.style.visibility !== 'hidden' && element.offsetParent !== null;
}

function getTheFirstVisibleBlockOptionV2(element) {

    let button = element.closest('button');
    let listId = button.getAttribute('aria-controls');
    let list = document.querySelector(`#${listId}`);

    let options = list.querySelectorAll('.option');

    // for (let option of options) {
    //     if (option.style.display !== 'none') {
    //         return option;
    //     }
    // }

    return options[0];

}

function getTheFirstVisibleBlockOption() {

    let options = blockOptionsWrapper.querySelectorAll('.option');

    for (let option of options) {
        if (option.style.display !== 'none') {
            return option;
        }
    }

    return null;
}

function applyVisualFakeFocus(realFocusedElement, elementToApplyFakeFocus) {

    if (elementToApplyFakeFocus) {
        elementToApplyFakeFocus.focus();
        elementToApplyFakeFocus.classList.add('block-options-focused');
    }

    realFocusedElement.focus();
}

// function applyVisualFakeAndRealFocus(elementToApplyFakeFocus) {

//     if (elementToApplyFakeFocus) {
//         elementToApplyFakeFocus.focus();
//         elementToApplyFakeFocus.classList.add('block-options-focused');
//     }
// }

function removeAllVisualFakeFocus() {
    let focusedElements = document.querySelectorAll('.block-options-focused');

    focusedElements.forEach(element => {
        element.classList.remove('block-options-focused');
    });
}

function updateBlockVisibility(filter) {

    let sections = blockOptionsWrapper.querySelectorAll('section');

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

    let allOptions = blockOptionsWrapper.querySelectorAll('.option');

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