export let savedRange = null;

export function saveSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedRange = sel.getRangeAt(0).cloneRange();
        }
    }
}

export function temporarySelectContentFromCurrentSelection() {

    setTimeout(() => {
        console.log('select all content temporarrly')
        if (window.getSelection) {
            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                const range = savedRange || selection.getRangeAt(0);
                let container = range.commonAncestorContainer;

                if (container.nodeType !== 1) {
                    container = container.parentNode;
                }

                const contentElement = container.closest('.johannes-content-element');

                if (contentElement) {
                    selection.removeAllRanges();

                    const newRange = document.createRange();
                    newRange.selectNodeContents(contentElement);

                    selection.addRange(newRange);
                } else {
                    console.log("Nenhum elemento '.content' envolvendo a seleção atual foi encontrado.");
                }
            }
        }
    }, 11);
}

export function restoreSelection() {

    setTimeout(() => {
        console.log('restore selection');

        const selection = window.getSelection();
        if (savedRange) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
        }
    }, 10);
}

export function getSavedRange() {
    return savedRange;
}

export function clearAllSelection() {
    savedRange = null;
    window.getSelection().removeAllRanges();
}

export function removeSavedSelection() {
    savedRange = null;
}

export function getCurrentDraggableBlockFocused() {

    let currentBlockRange = window.getSelection().getRangeAt(0);

    let commonAncestor = currentBlockRange.commonAncestorContainer;

    if (commonAncestor.nodeType === 3) { //* text node */
        commonAncestor = commonAncestor.parentNode;
    }

    const currentBlock = commonAncestor.closest('.draggable-block');

    return currentBlock;
}


export function hasSelection(){
    savedRange != null;
}