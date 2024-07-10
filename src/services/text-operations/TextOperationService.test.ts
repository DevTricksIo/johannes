import TextOperationService from "./TextOperationService";

function setupDOM(htmlContent: string = 'This is a strong text!'): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = htmlContent;
    document.body.appendChild(div);
    return div;
}

function simulateSelectionIn(searchText: string): void {
    const element = document.querySelector('div');
    if (!element) return;

    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;

    let found = false;

    function recursiveSearch(node: Node): boolean {
        if (node.nodeType === Node.TEXT_NODE && node.textContent) {
            const startIdx = node.textContent.indexOf(searchText);
            if (startIdx !== -1 && !found) {
                range.setStart(node, startIdx);
                range.setEnd(node, startIdx + searchText.length);
                selection!.removeAllRanges();
                selection!.addRange(range);
                found = true;
                return true;
            }
        } else {
            for (const child of Array.from(node.childNodes)) {
                if (recursiveSearch(child)) return true;
            }
        }
        return false;
    }

    recursiveSearch(element);
}

describe('Base operations', () => {
    let textOperationService: TextOperationService;

    beforeEach(() => {
        textOperationService = new TextOperationService();
        document.body.innerHTML = '';
    });

    test('Applying bold to "strong"', () => {
        setupDOM();
        simulateSelectionIn("strong");

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a <strong>strong</strong> text!");
    });

    test('Removing bold from "strong"', () => {
        setupDOM("This is a <strong>strong</strong> text!");
        simulateSelectionIn("strong");

        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a strong text!");
    });

    test('Adding multiples bold', () => {
        setupDOM("This is a <strong>strong</strong> text!");

        simulateSelectionIn("text");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a <strong>strong</strong> <strong>text</strong>!");
    });

    test('Remove specific bold without remove previous', () => {
        setupDOM("This is a <strong>strong</strong> <strong>text</strong>!");

        simulateSelectionIn("text");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a <strong>strong</strong> text!");
    });

    test('Applying bold to all text content', () => {
        setupDOM("This is a strong text!");

        simulateSelectionIn("This is a strong text!");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("<strong>This is a strong text!</strong>");
    });

    test('Remove bold from all text content', () => {
        setupDOM("<strong>This is a strong text!</strong>");

        simulateSelectionIn("This is a strong text!");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a strong text!");
    });

    test('Restore original value applying execCommand two times', () => {

        setupDOM("This is a strong text!");

        simulateSelectionIn("strong");
        textOperationService.execCommand('bold');

        const after1 = document.querySelector("div")?.innerHTML;
        expect(after1).toEqual("This is a <strong>strong</strong> text!");

        simulateSelectionIn("strong");
        textOperationService.execCommand('bold');

        const after2 = document.querySelector("div")?.innerHTML;
        expect(after2).toEqual("This is a strong text!");
    });

    test('Partial toggle selection left', () => {

        setupDOM("This is a <strong>strong</strong> text!");

        simulateSelectionIn("str");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a str<strong>ong</strong> text!");
    });

    test('Partial toggle selection right', () => {

        setupDOM("This is a <strong>strong</strong> text!");

        simulateSelectionIn("ong");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a <strong>str</strong>ong text!");
    });

    test('Partial toggle selection left without side effect', () => {

        setupDOM("<strong>This is</strong> a <strong>strong</strong> - <strong>text</strong>!");

        simulateSelectionIn("str");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("<strong>This is</strong> a str<strong>ong</strong> - <strong>text</strong>!");
    });

    test('Partial toggle selection right without side effect', () => {

        setupDOM("<strong>This is</strong> a <strong>strong</strong> - <strong>text</strong>!");

        simulateSelectionIn("ong");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("<strong>This is</strong> a <strong>str</strong>ong - <strong>text</strong>!");
    });

    test('Mixed content', () => {

        setupDOM("<u>This</u> is a <strong>strong</strong> text!");

        simulateSelectionIn("text");
        textOperationService.execCommand('bold');

        const after1 = document.querySelector("div")?.innerHTML;
        expect(after1).toEqual("<u>This</u> is a <strong>strong</strong> <strong>text</strong>!");
    });
});

describe('Nested operations', () => {

    let textOperationService: TextOperationService;

    beforeEach(() => {
        textOperationService = new TextOperationService();
        document.body.innerHTML = '';
    });

    test('Toggle bold on part of bold text', () => {
        setupDOM("This <strong>is a strong</strong> text!");

        simulateSelectionIn("a");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <strong>is </strong>a<strong> strong</strong> text!");
    });

    test('Applying bold surrounding italicized text', () => {
        setupDOM("This is <em>a strong text</em>!");

        simulateSelectionIn("is a strong text");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <strong>is <em>a strong text</em></strong>!");
    });

    test('Applying bold within italicized text', () => {
        setupDOM("This is <em>a strong text</em>!");

        simulateSelectionIn("is a strong");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <strong>is </strong><em><strong>a strong</strong> text</em>!");
    });

    test('Applying italic over bold and italic text', () => {
        setupDOM("This <strong>is </strong><em><strong>a strong</strong> text</em>!");
        simulateSelectionIn("is a strong");

        textOperationService.execCommand('italic');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <em><strong>is a strong</strong> text</em>!");
    });

    test('Removing bold from already bold text', () => {
        setupDOM("This is a <strong>strong</strong> text!");

        simulateSelectionIn("strong");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This is a strong text!");
    });

    test('Complex nested formatting with toggle', () => {
        setupDOM("<strong>This <em>is a strong</em> text!</strong>");

        simulateSelectionIn("strong");
        textOperationService.execCommand('bold');

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("<strong>This <em>is a </em></strong><em>strong</em><strong> text!</strong>");
    });


    test('Toggle underline on selected text test', () => {
        setupDOM("This is a strong text!");

        simulateSelectionIn("strong");
        textOperationService.execCommand('bold');
        //Expected: This is a <b>strong</b> text!

        simulateSelectionIn("is a strong");
        textOperationService.execCommand('italic');
        //This <i>is a </i><b><i>strong</i></b> text!

        simulateSelectionIn("This is a str");
        textOperationService.execCommand('underline');
        //<u>This </u><i><u>is a </u></i><b><i><u>str</u>ong</i></b> text!

        simulateSelectionIn("This i");
        textOperationService.execCommand('underline');
        //This <i>i<u>s a </u></i><b><i><u>str</u>ong</i></b> text!

        const after = document.querySelector("div")?.innerHTML;
        expect(after).toEqual("This <em>i<strong>s a </strong></em><strong><em><string>str</strong>ong</em></strong> text!");
    });

});
