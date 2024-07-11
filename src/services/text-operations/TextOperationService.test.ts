import TextOperationService from "./TextOperationService";

function setupDOM(htmlContent: string = 'This is a strong text!'): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = htmlContent;
    document.body.appendChild(div);
    return div;
}

/**
 * Simulates text selection in the DOM.
 * Finds the first occurrence of the specified textToSelect and creates a Range object based on it.
 *
 * @param textToSelect The text to be simulated as selected within the DOM.
 */
function simulateSelectionIn(textToSelect: string): void {
    const element = document.querySelector('div');
    if (!element) return;

    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();

    const range = new Range();
    let cumulativeText = '';

    let nodeInfo: any[] = [];

    function processNode(node: Node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const textContent = node.textContent || '';
            const start = cumulativeText.length;
            cumulativeText += textContent;
            nodeInfo.push({ node, start, end: cumulativeText.length });
        }

        node.childNodes.forEach(child => processNode(child));
    }

    function setRangeFromText(searchText: string) {
        const index = cumulativeText.indexOf(searchText);
        if (index !== -1) {
            const startInfo = nodeInfo.find(info => index >= info.start && index < info.end);
            const endInfo = nodeInfo.find(info => index + searchText.length <= info.end);

            if (startInfo && endInfo) {
                range.setStart(startInfo.node, index - startInfo.start);
                range.setEnd(endInfo.node, (index + searchText.length) - endInfo.start);
                selection?.addRange(range);
                return true;
            }
        }
        return false;
    }

    element.normalize();
    processNode(element);

    setRangeFromText(textToSelect);
}

/**
 * Calls simulateSelectionIn and verifies if the intended text is selected.
 * If the actual selection does not match the intended text, it throws an error.
 *
 * @param textToSelect The text that is intended to be simulated as selected in the DOM.
 * @throws {Error} Throws an error if the simulated selection does not match the expected text.
 *                 The error message specifies both the expected and the actual text.
 */
function simulateSelectionAndCheck(textToSelect: string): void {

    simulateSelectionIn(textToSelect);

    const selectedText = document.getSelection()?.toString();

    if (textToSelect !== selectedText) {
        throw new Error(`Failed to simulate selection. Expected: '${textToSelect}', but got: '${selectedText}'`);
    }
}

function findContinuationIndex(mainString: string, searchString: string): number {
    for (let i = 0; i < mainString.length; i++) {
        const substring = mainString.substring(i);

        if (searchString.startsWith(substring)) {
            return i;
        }
    }
    return -1;
}

function removeOverlap(mainString: string, searchString: string) {
    for (let i = 0; i < mainString.length; i++) {
        const substring = mainString.substring(i);

        if (searchString.startsWith(substring)) {
            return searchString.slice(substring.length);
        }
    }
    return searchString;
}


describe('Base operations', () => {
    let sut: TextOperationService;

    beforeEach(() => {
        sut = new TextOperationService();
        document.body.innerHTML = '';
    });

    test('Applying bold to "strong"', () => {

        setupDOM("This is a strong text!");

        const textToSelect = "strong";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This is a <strong>strong</strong> text!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;

        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Removing bold from "strong"', () => {

        setupDOM("This is a <strong>strong</strong> text!");

        const textToSelect = "strong";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This is a strong text!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Adding multiples bold', () => {

        setupDOM("This is a <strong>strong</strong> text!");

        const textToSelect = "text";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This is a <strong>strong</strong> <strong>text</strong>!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Remove specific bold without remove previous', () => {

        setupDOM("This is a <strong>strong</strong> <strong>text</strong>!");

        const textToSelect = "text";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This is a <strong>strong</strong> text!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Applying bold to all text content', () => {

        setupDOM("This is a strong text!");

        const textToSelect = "This is a strong text!";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "<strong>This is a strong text!</strong>";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Remove bold from all text content', () => {

        setupDOM("<strong>This is a strong text!</strong>");

        const textToSelect = "This is a strong text!";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This is a strong text!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Restore original value applying execCommand two times', () => {

        setupDOM("This is a strong text!");

        const textToSelect = "strong";
        simulateSelectionAndCheck(textToSelect);

        sut.execCommand('bold');

        const expected1AfterExecCommand = "This is a <strong>strong</strong> text!";
        const expected2AfterExecCommand = "This is a strong text!";

        const result1 = document.querySelector("div")?.innerHTML;
        expect(result1).toEqual(expected1AfterExecCommand);

        simulateSelectionAndCheck(textToSelect);

        sut.execCommand('bold');

        const result2 = document.querySelector("div")?.innerHTML;
        expect(result2).toEqual(expected2AfterExecCommand);
    });

    test('Partial toggle selection left', () => {

        setupDOM("This is a <strong>strong</strong> text!");

        const textToSelect = "str";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This is a str<strong>ong</strong> text!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Partial toggle selection right', () => {

        setupDOM("This is a <strong>strong</strong> text!");

        simulateSelectionAndCheck("ong");

        const expectedAfterExecCommand = "This is a <strong>str</strong>ong text!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Partial toggle selection left without side effect', () => {

        setupDOM("<strong>This is</strong> a <strong>strong</strong> - <strong>text</strong>!");

        const textToSelect = "str";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "<strong>This is</strong> a str<strong>ong</strong> - <strong>text</strong>!"

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Partial toggle selection right without side effect', () => {

        setupDOM("<strong>This is</strong> a <strong>strong</strong> - <strong>text</strong>!");

        const textToSelect = "ong"
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "<strong>This is</strong> a <strong>str</strong>ong - <strong>text</strong>!";
        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Mixed content', () => {

        setupDOM("<u>This</u> is a <strong>strong</strong> text!");

        const textToSelect = "text";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "<u>This</u> is a <strong>strong</strong> <strong>text</strong>!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });
});

describe('Nested operations', () => {

    let sut: TextOperationService;

    beforeEach(() => {
        sut = new TextOperationService();
        document.body.innerHTML = '';
    });

    test('Toggle bold on part of bold text', () => {

        setupDOM("This <strong>is a strong</strong> text!");

        const textToSelect = "a";
        simulateSelectionAndCheck(textToSelect);

        sut.execCommand('bold');

        const expectedAfterExecCommand = "This <strong>is </strong>a<strong> strong</strong> text!";

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Applying bold surrounding italicized text', () => {

        setupDOM("This is <em>a strong text</em>!");

        const textToSelect = "is a strong text";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This <strong>is <em>a strong text</em></strong>!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Applying bold within italicized text', () => {

        setupDOM("This is <em>a strong text</em>!");

        const textToSelect = "is a strong";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This <strong>is </strong><em><strong>a strong</strong> text</em>!";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Applying italic over bold and italic text', () => {
        setupDOM("This <strong>is </strong><em><strong>a strong</strong> text</em>!");

        const textToSelect = "is a strong";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This <em><strong>is a strong</strong> text</em>!";

        sut.execCommand('italic');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Removing bold from already bold text', () => {
        setupDOM("This is a <strong>strong</strong> text!");

        const textToSelect = "strong";
        simulateSelectionAndCheck(textToSelect);

        sut.execCommand('bold');

        const expectedAfterExecCommand = "This is a strong text!";

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });

    test('Complex nested formatting with toggle', () => {
        setupDOM("<strong>This <em>is a strong</em> text!</strong>");

        const textToSelect = "strong";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "<strong>This <em>is a </em></strong><em>strong</em><strong> text!</strong>";

        sut.execCommand('bold');

        const result = document.querySelector("div")?.innerHTML;
        expect(result).toEqual(expectedAfterExecCommand);
    });


    test('Toggle underline on selected text test', () => {
        setupDOM("This is a strong text!");

        const expectedAfterAllExecCommand = "This <em>i<strong>s a </strong></em><strong><em><string>str</strong>ong</em></strong> text!";

        //T1
        const textToSelect1 = "strong";
        simulateSelectionAndCheck(textToSelect1);

        const expected1AfterExecCommand = "This is a <b>strong</b> text!"

        sut.execCommand('bold');

        const result1 = document.querySelector("div")?.innerHTML;
        expect(result1).toEqual(expected1AfterExecCommand);

        //T2
        const textToSelect2 = "is a strong";
        simulateSelectionAndCheck(textToSelect2);

        const expected2AfterExecCommand = "This <i>is a </i><b><i>strong</i></b> text!"

        sut.execCommand('italic');

        const result2 = document.querySelector("div")?.innerHTML;
        expect(result2).toEqual(expected2AfterExecCommand);

        //T3
        const textToSelect3 = "This is a str";
        simulateSelectionAndCheck(textToSelect3);

        const expected3AfterExecCommand = "<u>This </u><i><u>is a </u></i><b><i><u>str</u>ong</i></b> text!"

        sut.execCommand('underline');

        const result3 = document.querySelector("div")?.innerHTML;
        expect(result3).toEqual(expected3AfterExecCommand);

        //T4
        const textToSelect4 = "This i";
        simulateSelectionAndCheck(textToSelect4);

        const expected4AfterExecCommand = "This <i>i<u>s a </u></i><b><i><u>str</u>ong</i></b> text!"

        sut.execCommand('underline');

        const result4 = document.querySelector("div")?.innerHTML;
        expect(result4).toEqual(expected4AfterExecCommand);

        //Final
        const finalResult = document.querySelector("div")?.innerHTML;
        expect(finalResult).toEqual(expectedAfterAllExecCommand);
    });
});
