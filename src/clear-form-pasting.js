document.addEventListener('DOMContentLoaded', function () {

    const editor = document.querySelector('.johannes-editor');

    if (editor) {
        document.addEventListener('paste', function (e) {
            if (e.target.getAttribute('contenteditable') === 'true') {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text/plain');
                insertTextAtCursor(text);
            }
        }, true);

        function insertTextAtCursor(text) {
            const sel = window.getSelection();
            if (sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                range.deleteContents();

                const textNode = document.createTextNode(text);
                range.insertNode(textNode);

                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
});