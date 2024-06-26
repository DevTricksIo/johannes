export let savedSelection = null;

export function saveSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedSelection = sel.getRangeAt(0).cloneRange();
        }
    }
}

export function restoreSelection() {
    const selection = window.getSelection();
    if (savedSelection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
    }
}

export function clearSelection() {
    savedSelection = null;
    window.getSelection().removeAllRanges();
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