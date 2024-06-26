// import * as commandFactory from './command-factory';

let currentDraggableBlock = null; //This element represents the block where block-options will be displayed close to
let currentFakeFocusedOption = null;
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

export function filterContact(str) {
    filterText += str;
}

function clearFilter() {
    filterText = '';
}

export function clear() {
    throw new Error('Not Implement Exception')
}

export function showBlockOptions() {

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

export function hideBlockOptions(elementToFocus) {

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
    let previous = currentFakeFocusedOption.previousElementSibling;

    while (previous && (!previous.classList.contains('option') || !isElementVisible(previous))) {
        previous = previous.previousElementSibling;
    }

    if (!previous) {
        let currentSection = currentFakeFocusedOption.closest('section');
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

    removeAllVisualFakeFocus();
    setCurrentFakeFocusElement(previous);
    applyVisualFakeFocus(realFocusedElement, previous);
}

export function moveTheFakeFocusToTheNextBlockOption() {

    let next = currentFakeFocusedOption.nextElementSibling;

    while (next && (!next.classList.contains('option') || !isElementVisible(next))) {
        next = next.nextElementSibling;
    }

    if (!next) {
        let currentSection = currentFakeFocusedOption.closest('section');
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

    removeAllVisualFakeFocus();
    setCurrentFakeFocusElement(next);
    applyVisualFakeFocus(realFocusedElement, next);
}


export function applySelectedFakeFocusType() {

    const draggableBlock = realFocusedElement.closest('.draggable-block');
    const newBlockType = option.getAttribute('data-type');

    const lastSlashIndex = realFocusedElement.innerText.lastIndexOf('/');
    realFocusedElement.innerText = lastSlashIndex !== -1 ? realFocusedElement.innerText.slice(0, lastSlashIndex) : realFocusedElement.innerText;

    const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.TRANSFORM_BLOCK, [draggableBlock, newBlockType]);
    command.execute();

}


function isElementVisible(element) {
    return element && element.style.display !== 'none' && element.style.visibility !== 'hidden' && element.offsetParent !== null;
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

function removeAllVisualFakeFocus() {
    let focusedElements = blockOptionsWrapper.querySelectorAll('.block-options-focused');

    focusedElements.forEach(element => {
        element.classList.remove('block-options-focused');
    });
}