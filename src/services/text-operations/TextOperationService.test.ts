import TextOperationService from "./TextOperationService";

function setupDOMEnvironment(htmlContent: string = 'This is a strong text!', selectedText: string = 'strong'): void {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = htmlContent;
    document.body.appendChild(div);

    const selection: Selection = window.getSelection()!;
    const range: Range = document.createRange();

    function findAndSelectText(node: Node): boolean {
        if (node.nodeType === Node.TEXT_NODE) {
            const textContent: string = node.textContent!;
            const start: number = textContent.indexOf(selectedText);
            if (start !== -1) {
                const end: number = start + selectedText.length;
                range.setStart(node, start);
                range.setEnd(node, end);
                selection.removeAllRanges();
                selection.addRange(range);
                return true;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (let i = 0; i < node.childNodes.length; i++) {
                if (findAndSelectText(node.childNodes[i])) {
                    return true;
                }
            }
        }
        return false;
    }

    findAndSelectText(div);
}



describe('TextOperationService Bold Toggle', () => {
    let textOperationService: TextOperationService;

    beforeEach(() => {
        textOperationService = new TextOperationService();
        document.body.innerHTML = '';
    });

    test('Applying bold to "strong"', () => {
        setupDOMEnvironment();

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a <b>strong</b> text!");
    });

    test('Removing bold from "strong"', () => {
        setupDOMEnvironment("This is a <b>strong</b> text!", "strong");

        jest.advanceTimersByTime(10);

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a strong text!");
    });

    test('Adding multiples bold without remove previous"', () => {
        setupDOMEnvironment("This is a <b>strong</b> text!", "text");

        jest.advanceTimersByTime(10);

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a <b>strong</b> <b>text</b>!");
    });

    test('Remove specific bold without remove previous"', () => {
        setupDOMEnvironment("This is a <b>strong</b> <b>text</b>!", "text");

        jest.advanceTimersByTime(10);

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a <b>strong</b> text!");
    });
});

describe('TextOperationService Partial Bold', () => {

    let textOperationService: TextOperationService;

    beforeEach(() => {
        textOperationService = new TextOperationService();
        document.body.innerHTML = '';
    });

    test('Toggle bold on part of bold text', () => {
        setupDOMEnvironment("This <b>is a strong</b> text!", "a");

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <b>is </b>a<b> strong</b> text!");
    });

    test('Applying bold within italicized text', () => {
        setupDOMEnvironment("This is <i>a strong text</i>!", "is a strong");

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <b>is </b><i><b>a strong</b> text</i>!");
    });

    test('Applying italic over bold and italic text', () => {
        setupDOMEnvironment("This <b>is </b><i><b>a strong</b> text</i>!", "is a strong");

        textOperationService.execCommand('italic');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <i><b>is a strong</b> text</i>!");
    });

    test('Removing bold from already bold text', () => {
        setupDOMEnvironment("This is a <b>strong</b> text!", "strong");

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a strong text!");
    });

    test('Complex nested formatting with toggle', () => {
        setupDOMEnvironment("<b>This <i>is a strong</i> text!</b>", "strong");

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("<b>This <i>is a </i></b><i>strong</i><b> text!</b>");
    });

});
