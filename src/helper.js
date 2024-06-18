export function focusOnTheEndOfTheText(contentBlock) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(contentBlock);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

export function focusOnPrevious(actualElement) {

    let actualDraggableBlock = actualElement.closest('.draggable-block');
    let sibling = actualDraggableBlock.previousElementSibling;
    let focusableElement = null;

    while (sibling && !focusableElement) {
        let focusableCandidates = sibling.querySelectorAll('.focusable');
        if (focusableCandidates.length > 0) {
            focusableElement = focusableCandidates[focusableCandidates.length - 1];
        }

        // Se não encontrar dentro deste sibling, move para o próximo irmão anterior
        if (!focusableElement) {
            sibling = sibling.previousElementSibling;
        }
    }

    // Se um elemento focusable foi encontrado, dá foco a ele
    if (focusableElement) {
        focusOnTheEndOfTheText(focusableElement);
    } else {
        console.log('No focusable element found');
    }
}


export function changeVirtualFocus(focusedElement, elementToApplyVisibleFocus) {

    if (elementToApplyVisibleFocus) {
        elementToApplyVisibleFocus.focus();
        elementToApplyVisibleFocus.classList.add('block-options-focused');
    }

    focusedElement.focus();

    return elementToApplyVisibleFocus;
}


export function showBlockOptions() {
    const range = document.getSelection().getRangeAt(0);
    const cursorPos = range.getBoundingClientRect();

    const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const menuWidth = 19 * remSize;

    let xPosition = cursorPos.right;
    let yPosition = cursorPos.bottom + window.scrollY;

    const blockOptionsWrapper = document.querySelector('.block-options-wrapper');

    const margin = remSize * 1.25;    

    blockOptionsWrapper.style.display = 'block';
    
    let blockWidth = blockOptionsWrapper.offsetWidth;


    if (xPosition + blockWidth + margin > window.innerWidth) {
        xPosition = cursorPos.left - menuWidth;
        if (xPosition < 0) xPosition = 0;
    }

    blockOptionsWrapper.style.left = `${xPosition}px`;
    blockOptionsWrapper.style.top = `${yPosition}px`;
}

