let savedSelection = null;

function saveSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedSelection = sel.getRangeAt(0).cloneRange();
        }
    }
}

function restoreSelection() {
    const selection = window.getSelection();
    if (savedSelection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
    }
}

function wrapSelectedTextWithStrong() {
    restoreSelection();
    const selection = window.getSelection();
    if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        const strongTag = document.createElement('strong');
        range.surroundContents(strongTag);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const boldButton = document.getElementById('bold-text-button');

    if (boldButton) {
        boldButton.addEventListener('mousedown', function(event) {
            event.preventDefault();
            saveSelection();
        });

        boldButton.addEventListener('click', function(event) {
            toggleStrong();
        });
    }
});



function toggleStrong() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let container = range.commonAncestorContainer;

    if (container.nodeType === 3) {
        container = container.parentNode;
    }

    if (container.tagName === 'STRONG') {
        const newRange = document.createRange();
        newRange.selectNode(container);
        selection.removeAllRanges();
        selection.addRange(newRange);

        const parent = container.parentNode;
        while (container.firstChild) {
            parent.insertBefore(container.firstChild, container);
        }
        parent.removeChild(container);
    } else {
        const strongTag = document.createElement('strong');
        range.surroundContents(strongTag);
    }
}