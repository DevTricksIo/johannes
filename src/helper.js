export function focusOnTheEndOfTheText(contentBlock) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(contentBlock);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}
