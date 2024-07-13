//TODO use commands
import BlockOperationsService from '../services/block-operations/BlockOperationsService';
import ElementFactoryService from '../services/element-factory/ElementFactoryService';
import QuickMenuBuilder from "../builders/QuickMenuBuilder";
import FloatingToolbarBuilder from "../builders/FloatingToolbarBuilder";

//Focus on P when load
document.addEventListener('DOMContentLoaded', function () {
    const editor = document.querySelector('.johannes-editor');

    if (editor) {
        let blocks = editor.querySelectorAll('.draggable-block');

        if (blocks.length == 1) {

            const p = blocks[0].querySelector('.johannes-content-element');
            if (p.innerText == '') {
                p.focus();
            }
        }
    }
});

// Clear text when paste
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


//TODO: use a DI Container
document.addEventListener('DOMContentLoaded', function () {

    let elementFactory = new ElementFactoryService();
    let blockOperations = new BlockOperationsService(elementFactory);

    let quickMenu = QuickMenuBuilder.build(blockOperations);

    johannesEditor.appendChild(quickMenu.htmlElement);

    let floatingToolbar = FloatingToolbarBuilder.build();

    johannesEditor.appendChild(floatingToolbar.htmlElement);

});