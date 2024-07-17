class DOMSelectionFocusManager {

    constructor() {

        this.savedRange = null;
    }

    saveSelection() {
        if (window.getSelection) {
            const sel = window.getSelection();
            if (sel.rangeCount > 0) {
                this.savedRange = sel.getRangeAt(0).cloneRange();
            }
        }
    }

    temporarySelectContentFromCurrentSelection() {

        setTimeout(() => {
            console.log('select all content temporarrly')
            if (window.getSelection) {
                const selection = window.getSelection();

                if (selection.rangeCount > 0) {
                    const range = this.savedRange || selection.getRangeAt(0);
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

    restoreSelection() {

        setTimeout(() => {
            console.log('restore selection');

            const selection = window.getSelection();
            if (this.savedRange) {
                selection.removeAllRanges();
                selection.addRange(this.savedRange);
            }
        }, 10);
    }

    getSavedRange() {
        return this.savedRange;
    }

    clearAllSelection() {
        this.savedRange = null;
        window.getSelection().removeAllRanges();
    }

    removeSavedSelection() {
        this.savedRange = null;
    }

    getCurrentDraggableBlockFocused() {

        let currentBlockRange = window.getSelection().getRangeAt(0);

        let commonAncestor = currentBlockRange.commonAncestorContainer;

        if (commonAncestor.nodeType === 3) { //* text node */
            commonAncestor = commonAncestor.parentNode;
        }

        const currentBlock = commonAncestor.closest('.block');

        return currentBlock;
    }


    hasSelection() {
        this.savedRange != null;
    }

    isRangeCoveringElement(element, range) {
        const textNodes = getTextNodes(element);

        if (textNodes.length === 0) {
            return false;
        }

        const firstNode = textNodes[0];
        if (range.startContainer !== firstNode || range.startOffset !== 0) {
            return false;
        }

        const lastNode = textNodes[textNodes.length - 1];
        if (range.endContainer !== lastNode || range.endOffset !== lastNode.length) {
            return false;
        }

        return true;
    }

    getTextNodes(node) {
        let textNodes = [];
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else {
            node.childNodes.forEach(child => {
                textNodes = textNodes.concat(getTextNodes(child));
            });
        }
        return textNodes;
    }

    getSelectedClosestElementAcceptingClosest() {
        let currentRange = window.getSelection().getRangeAt(0);
        if (!currentRange || currentRange.collapsed) {
            console.error('No valid selection found.');
            return null;
        }

        let commonAncestor = currentRange.commonAncestorContainer;

        while (commonAncestor.nodeType !== 1) {
            commonAncestor = commonAncestor.parentNode;
        }

        return commonAncestor;
    }

    getClosestContentEditable() {
        return getSelectedClosestElementAcceptingClosest().closest('.editable');
    }
}



