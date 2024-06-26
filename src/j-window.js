import * as blockOptionsManagerImport from './block-options-manager';

export const blockOptionsManager = blockOptionsManagerImport;


//**Show */
export function showInputLinkBox() {

    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();

    const containerWidth = textFormattingBar.offsetWidth;
    const linkInputDivWidth = linkBox.offsetWidth;
    const containerCenter = (textFormattingBar.getBoundingClientRect().left + containerWidth) / 2;
    const linkInputDivCenter = (linkBox.getBoundingClientRect().left + linkInputDivWidth) / 2;

    linkBox.style.position = 'absolute';
    linkBox.style.left = `${containerCenter - linkInputDivCenter + window.scrollX}px`;
    linkBox.style.top = `${rect.bottom + window.scrollY + 5}px`;
    linkBox.style.display = 'block';

    linkBoxInput.focus();
}



export function closeAll() {
    closeAllDependentBox();
    closeTextFormattingBar();
    closeBlockOptions();
}

export function closeBlockOptions() {

}

export function closeTextFormattingBar() {
    textFormattingBar.style.display = 'none';
}

export function closeAllDependentBox() {

    const dependentBoxes = document.querySelectorAll('.dependent-box');

    for (let box of dependentBoxes) {
        box.style.display = 'none';
    }
}

export function closeTurnIntoBox() {

}

export function closeColorBox() {

}

export function closeMoreOptionsBox() {

}






export function tryHideTextFormattingBar() {

    // check before if a dependent box is opened, then close the dependent box

    //1. try  close text-formatting-bar before linkBox (the actual only one dependency box)
    if (textFormattingBoxVisible() && !anyDependentBoxVisible()) {
        // only hide if the dependency box is closed
        textFormattingBar.style.display = 'none';
        // restoreSelection();
    }

    // 2. close the dependency box (linkBox)
    if (anyDependentBoxVisible()) {

        // Remove a if has no href attribute or if href is empty
        if (anchorElement && (anchorElement.href == '' || anchorElement.href == null)) {
            const parent = anchorElement.parentNode;
            while (anchorElement.firstChild) {
                parent.insertBefore(anchorElement.firstChild, anchorElement);
            }

            if (parent) {
                parent.removeChild(anchorElement);
                parent.normalize(); // Mesclar nós de texto adjacentes, se necessário
            }
        }

        // linkBox.style.display = 'none';
        // closeAllDependentBox();
        // restoreSelection();
    }
}

function textFormattingBoxVisible() {
    return textFormattingBar.style.display != 'none';
}


function anyDependentBoxVisible() {
    const dependentBoxes = document.querySelectorAll('.dependent-box');

    for (const box of dependentBoxes) {
        if (box.style.display !== 'none') {
            return true;
        }
    }

    return false;
}

export function focusOnTheEndOfTheText(contentBlock) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(contentBlock);

    let lastChild = contentBlock;
    while (lastChild.lastChild && lastChild.lastChild.nodeType === Node.ELEMENT_NODE) {
        lastChild = lastChild.lastChild;
    }
    if (lastChild.lastChild) {
        lastChild = lastChild.lastChild;
    }

    range.setEnd(lastChild, lastChild.textContent.length);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    contentBlock.focus();
}

export function focusOnTheStartOfTheText(contentBlock) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(contentBlock);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    contentBlock.focus();
}

export function focusOnNext(actualElement, position) {
    let tag = actualElement.tagName.toUpperCase();
    let focusedElement = null;

    if (tag === 'LI') {
        let nextElement = actualElement.nextElementSibling;

        if (nextElement && nextElement.classList.contains('focusable')) {
            focusedElement = nextElement;
            if (position) {
                applyCursorXStartPosition(focusedElement, position);
            } else {
                focusOnTheStartOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    if (actualElement.parentNode.tagName.toUpperCase() === 'LI' /* focusable SPAN inside LI*/) {
        let nextElement = actualElement.closest('li').nextElementSibling?.querySelector('.focusable');

        if (nextElement && nextElement.classList.contains('focusable')) {
            focusedElement = nextElement;
            if (position) {
                applyCursorXStartPosition(focusedElement, position);
            } else {
                focusOnTheStartOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    let parent = actualElement.closest('.draggable-block');
    let sibling = parent.nextElementSibling;

    while (sibling) {
        let focusableCandidates = sibling.querySelectorAll('.focusable');
        if (focusableCandidates.length > 0) {
            focusedElement = focusableCandidates[0];
            if (position) {
                applyCursorXStartPosition(focusedElement, position);
            } else {
                focusOnTheStartOfTheText(focusedElement);
            }
            return focusedElement;
        }

        sibling = sibling.nextElementSibling;
    }

    return focusedElement;
}


export function focusOnPrevious(actualElement, position) {
    let tag = actualElement.tagName.toUpperCase();
    let focusedElement = null;

    if (tag === 'LI') {
        let previousElement = actualElement.previousElementSibling;

        if (previousElement && previousElement.classList.contains('focusable')) {
            focusedElement = previousElement;
            if (position) {
                applyCursorXEndPosition(focusedElement, position);
            } else {
                focusOnTheEndOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    if (actualElement.parentNode.tagName.toUpperCase() === 'LI' /* focusable SPAN inside LI*/) {
        let previousElement = actualElement.closest('li').previousElementSibling?.querySelector('.focusable');

        if (previousElement && previousElement.classList.contains('focusable')) {
            focusedElement = previousElement;
            if (position) {
                applyCursorXEndPosition(focusedElement, position);
            } else {
                focusOnTheEndOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    let parent = actualElement.closest('.draggable-block');
    let sibling = parent.previousElementSibling;

    while (sibling) {
        let focusableCandidates = sibling.querySelectorAll('.focusable');
        if (focusableCandidates.length > 0) {
            focusedElement = focusableCandidates[focusableCandidates.length - 1];
            if (position) {
                applyCursorXEndPosition(focusedElement, position);
            } else {
                focusOnTheEndOfTheText(focusedElement);
            }
            return focusedElement;
        }

        sibling = sibling.previousElementSibling;
    }

    return focusedElement;
}


function adjustCursorOffset(node, xPosition) {
    let range = document.createRange();
    let closestNode = node;
    let closestOffset = 0;
    let closestDiff = Infinity;

    for (let i = 0; i < node.textContent.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        const leftDiff = Math.abs(rect.left - xPosition);
        const rightDiff = Math.abs(rect.right - xPosition);

        if (leftDiff < closestDiff || rightDiff < closestDiff) {
            closestDiff = Math.min(leftDiff, rightDiff);
            closestOffset = i + (rightDiff < leftDiff ? 1 : 0);
        }
    }

    if (xPosition > range.getBoundingClientRect().right) {
        closestOffset = node.textContent.length;
    }

    return { closestNode, closestOffset };
}

function applyCursorXStartPosition(element, xPosition) {
    const selection = window.getSelection();
    const range = document.createRange();

    let currentNode = element.firstChild;
    let result = null;

    while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
            result = adjustCursorOffset(currentNode, xPosition);
            break;
        }
        currentNode = currentNode.nextSibling;
    }

    if (result && result.closestNode) {
        range.setStart(result.closestNode, result.closestOffset);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    } else {
        range.selectNodeContents(element);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    }
}

function applyCursorXEndPosition(element, xPosition) {
    const selection = window.getSelection();
    const range = document.createRange();

    let currentNode = element.lastChild;
    let result = null;

    while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
            result = adjustCursorOffset(currentNode, xPosition);
            break;
        } else if (currentNode.nodeName.toUpperCase() === 'BR') {
            currentNode = currentNode.previousSibling;
            continue;
        }
        currentNode = currentNode.previousSibling;
    }

    if (result && result.closestNode) {
        range.setStart(result.closestNode, result.closestOffset);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    } else {
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    }
}