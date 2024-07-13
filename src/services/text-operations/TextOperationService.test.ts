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
        sut = new TextOperationService("strong");
        document.body.innerHTML = '';
    });

    test('Applying bold to "strong"', () => {

        setupDOM("This is a strong text!");

        const textToSelect = "strong";
        simulateSelectionAndCheck(textToSelect);

        const expectedAfterExecCommand = "This is a <strong>strong</strong> text!";

        sut.execCommand('strong');

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
        sut = new TextOperationService("strong");
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

        const expected1AfterExecCommand = "This is a <strong>strong</strong> text!"

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


describe('getSelectedNodes', () => {

    let sut: TextOperationService;

    beforeEach(() => {
        sut = new TextOperationService("strong");
        document.body.innerHTML = ''; // Limpa o conteúdo do body antes de cada teste
    });

    test('Should return an empty array when there is no selection', () => {
        const result = sut.getSelectedTextNodes();
        expect(result).toEqual([]);
    });

    test('Should correctly return the selected text nodes', () => {
        setupDOM('<p>Hello <strong>world</strong>!</p>');
        const textToSelect = 'world';
        simulateSelectionAndCheck(textToSelect);
        const result = sut.getSelectedTextNodes();
        expect(result.length).toBe(1);
        expect(result[0].nodeValue).toBe('world');
    });

    test('Should return multiple selected text nodes', () => {
        setupDOM('<p>Hello <strong>world</strong>! <em>How are you</em>?</p>');

        const textToSelect = 'world! How';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(3);

        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe('! ');
        expect(result[2].nodeValue?.startsWith("How")).toBe(true);
    });

    test('Should return partially selected text nodes', () => {
        setupDOM('<p>Hello <strong>world</strong>!</p>');
        const textToSelect = 'llo wo';
        simulateSelectionAndCheck(textToSelect);
        const result = sut.getSelectedTextNodes();
        expect(result.length).toBe(2);
        expect(result[0].nodeValue).toBe('Hello ');
        expect(result[1].nodeValue).toBe('world');
    });

    test('Should return text nodes selected with complex nested elements', () => {
        setupDOM('<div>Hello <p><strong>world</strong>! <em>How <u>are</u> you</em>?</p></div>');

        const textToSelect = 'world! How are';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(4);

        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe('! ');
        expect(result[2].nodeValue).toBe('How ');
        expect(result[3].nodeValue).toBe('are');
    });

    test('Should return text nodes spanning multiple elements', () => {
        setupDOM('<div>Hello <p><strong>world</strong>!</p> <p>How are <em>you</em>?</p></div>');

        const textToSelect = 'world! How are you';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(5);

        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe('!');
        expect(result[2].nodeValue).toBe(' ');
        expect(result[3].nodeValue).toBe('How are ');
        expect(result[4].nodeValue).toBe('you');
    });

    test('Should return an empty array when the selection is empty', () => {
        setupDOM('<p>Hello <strong>world</strong>!</p>');
        const selection = window.getSelection();
        selection?.removeAllRanges();
        const result = sut.getSelectedTextNodes();
        expect(result).toEqual([]);
    });

    test('Should return a text node for partial selection within the same text node', () => {
        setupDOM('<p>Hello <strong>world</strong>!</p>');

        const textToSelect = 'llo w';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(2);
        expect(result[0].nodeValue?.endsWith('llo ')).toBe(true);
        expect(result[1].nodeValue?.startsWith('w')).toBe(true);
    });

    test('Should correctly handle empty text nodes or those containing only whitespace', () => {
        setupDOM('<p>Hello <strong>world</strong><span> </span>!</p>');

        const textToSelect = 'world !';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(3);
        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe(' ');
        expect(result[2].nodeValue).toBe('!');
    });

    test('Should return text nodes in deeply nested DOM structures', () => {
        setupDOM('<div>Hello <p><strong>world</strong>! <em><span>Deeply <u>nested</u> text</span></em></p></div>');

        const textToSelect = 'world! Deeply nested text';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(5);
        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe('! ');
        expect(result[2].nodeValue).toBe('Deeply ');
        expect(result[3].nodeValue).toBe('nested');
        expect(result[4].nodeValue).toBe(' text');
    });

    test('Should return text nodes across different nesting levels', () => {
        setupDOM('<div>Hello <div><p><strong>world</strong></p>! <em>How are <u>you</u>?</em></div></div>');

        const textToSelect = 'world! How are you';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(4);
        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe('! ');
        expect(result[2].nodeValue).toBe('How are ');
        expect(result[3].nodeValue).toBe('you');
    });

    test('Should return text nodes that span multiple block containers', () => {
        setupDOM('<div>Hello <p><strong>world</strong>!</p><div>How are <em>you</em> today?</div></div>');

        const textToSelect = 'world!How are you today';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(5);
        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe('!');
        expect(result[2].nodeValue).toBe('How are ');
        expect(result[3].nodeValue).toBe('you');
        expect(result[4].nodeValue?.startsWith(' today')).toBe(true);
    });


    test('Should exclude empty containers and correctly include valid text nodes', () => {
        setupDOM('<div>Hello <p><strong>world</strong></p><div></div>! How are <em>you</em>?</div>');

        const textToSelect = 'world! How are you';
        simulateSelectionAndCheck(textToSelect);

        const result = sut.getSelectedTextNodes();

        expect(result.length).toBe(3);
        expect(result[0].nodeValue).toBe('world');
        expect(result[1].nodeValue).toBe('! How are ');
        expect(result[2].nodeValue).toBe('you');
    });
});

describe('findClosestMatchingParent', () => {

    let sut: TextOperationService;

    beforeEach(() => {
        sut = new TextOperationService("strong");
        document.body.innerHTML = '';
    });

    test('Should find the closest parent node by type only', () => {
        setupDOM('<div>Hello <p><strong>world</strong><span class="highlight">!</span></p></div>');
        const targetNode = { nodeType: 'p', class: [] };
        const result = sut.findClosestMatchingParent(document.querySelector('.highlight'), targetNode);
        expect(result?.tagName.toLowerCase()).toBe('p');
    });

    test('Should find the closest parent node by type and class', () => {
        setupDOM('<div>Hello <p class="text"><strong class="highlight">world</strong>!</p></div>');
        const targetNode = { nodeType: 'p', classes: ['text'] };
        const result = sut.findClosestMatchingParent(document.querySelector('.highlight'), targetNode);
        expect(result?.tagName.toLowerCase()).toBe('p');
        expect(result?.classList.contains('text')).toBe(true);
    });

    test('Should return null if no matching parent is found', () => {
        setupDOM('<div>Hello <p><strong>world</strong>!</p></div>');
        const targetNode = { nodeType: 'span', classes: ['highlight'] };
        const result = sut.findClosestMatchingParent(document.querySelector('strong'), targetNode);
        expect(result).toBeNull();
    });

    test('Should handle multiple classes in target node', () => {
        setupDOM('<div>Hello <p class="text important"><strong>world</strong>!</p></div>');
        const targetNode = { nodeType: 'p', classes: ['text', 'important'] };
        const result = sut.findClosestMatchingParent(document.querySelector('strong'), targetNode);
        expect(result?.classList.contains('text')).toBe(true);
        expect(result?.classList.contains('important')).toBe(true);
    });

    test('Should ignore nodes that do not have all specified classes', () => {
        setupDOM('<div>Hello <p class="text"><strong>world</strong>!</p> <p class="text important">Hello again!</p></div>');
        const targetNode = { nodeType: 'p', classes: ['text', 'important'] };
        const result = sut.findClosestMatchingParent(document.querySelector('strong'), targetNode);
        expect(result).toBeNull();
    });

    test('Should correctly identify nodes when nested deeply with mixed classes', () => {
        setupDOM('<div><div class="text"><p class="text important"><span>world</span></p></div></div>');
        const targetNode = { nodeType: 'div', classes: ['text'] };
        const result = sut.findClosestMatchingParent(document.querySelector('span'), targetNode);
        expect(result?.tagName.toLowerCase()).toBe('div');
        expect(result?.classList.contains('text')).toBe(true);
    });


    test('Should correctly identify parent node from a TextNode with specified classes', () => {
        setupDOM('<div class="text"><p class="important"><span>hello <strong>world</strong></span></p></div>');
    
        const targetNode = { nodeType: 'p', classes: ['important'] };
    
        const textNode = document.querySelector('strong')?.firstChild as Node;
    
        const result = sut.findClosestMatchingParent(textNode, targetNode);
    
        expect(result?.tagName.toLowerCase()).toBe('p');
        expect(result?.classList.contains('important')).toBe(true);
    });
});

describe('extractSelectedText', () => {
    let pElement: HTMLElement;
    let textNode: Node;
    let sut: TextOperationService;

    beforeEach(() => {

        document.body.innerHTML = '<p id="testParagraph">Hello, this is a test paragraph.</p>';
        pElement = document.getElementById('testParagraph') as HTMLElement;
        textNode = pElement.firstChild as Node;

        sut = new TextOperationService("string");
    });

    test('should extract selected text from a TextNode when fully selected', () => {
        window.getSelection()!.selectAllChildren(pElement);

        let a = document.getSelection()?.toString();

        const selectedText = sut.extractSelectedText(textNode);
        expect(selectedText).toBe('Hello, this is a test paragraph.');
    });

    test('should extract part of the text from a TextNode when partially selected', () => {
        // Simula a seleção parcial do texto
        const range = document.createRange();
        range.setStart(textNode, 7);
        range.setEnd(textNode, 22);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);


        let a = document.getSelection()?.toString();

        const selectedText = sut.extractSelectedText(textNode);
        expect(selectedText).toBe('this is a test ');
    });

    test('should return an empty string if the TextNode is not within the selection', () => {
        // Nenhuma seleção ativa
        window.getSelection()!.removeAllRanges();

        const selectedText = sut.extractSelectedText(textNode);
        expect(selectedText).toBe('');
    });

    test('should handle selection that starts before and ends within the TextNode', () => {
        // Seleção que começa antes e termina dentro do TextNode
        const range = document.createRange();
        range.setStartBefore(pElement);
        range.setEnd(textNode, 12);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        const selectedText = sut.extractSelectedText(textNode);
        expect(selectedText).toBe('Hello, this ');
    });

    test('should handle selection that starts within and ends beyond the TextNode', () => {
        // Seleção que começa dentro e termina fora do TextNode
        const range = document.createRange();
        range.setStart(textNode, 17);
        range.setEndAfter(pElement);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        const selectedText = sut.extractSelectedText(textNode);
        expect(selectedText).toBe('test paragraph.');
    });
});

describe('extractSelectedText multiples nodes selected', () => {
    let container: HTMLElement;
    let sut: TextOperationService;

    beforeEach(() => {
        document.body.innerHTML = '<div id="testContainer">Hello, <strong>this is</strong> a test <em>paragraph with</em> multiple elements.</div>';
        container = document.getElementById('testContainer')! as HTMLElement;

        sut = new TextOperationService("string");
    });

    test('should extract text spanning multiple child nodes', () => {
        const range = document.createRange();
        range.setStart(container.childNodes[0], 0);
        range.setEnd(container.childNodes[3].firstChild!, 8);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        let nodeToTest = container.childNodes[1].firstChild;

        const selectedText = sut.extractSelectedText(nodeToTest as Node);

        expect(selectedText).toBe('this is');
    });

    test('should handle complex selections crossing multiple types of elements', () => {

        const range = document.createRange();

        range.setStart(container.childNodes[1].firstChild!, 5);
        range.setEnd(container.childNodes[3].firstChild!, 8);

        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        const selectedText = sut.extractSelectedText(container.childNodes[1].firstChild as Node);
        expect(selectedText).toBe('is');
    });

    test('should return empty string if selection is entirely outside the target node', () => {
        const range = document.createRange();

        range.setStart(container.childNodes[2], 1);
        range.setEnd(container.childNodes[4], 15);

        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        let a = document.getSelection()?.toString();

        const selectedText = sut.extractSelectedText(container.firstChild as Node);
        expect(selectedText).toBe('');
    });

    test('should extract correctly when selection starts before and ends inside the TextNode across elements', () => {

        const range = document.createRange();

        range.setStartBefore(container);
        range.setEnd(container.childNodes[2], 3);

        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        const selectedText = sut.extractSelectedText(container.firstChild as Node);
        expect(selectedText).toBe('Hello, ');
    });

    test('AAAAshould extract correctly when selection starts before and ends inside the TextNode across elements', () => {

        const range = document.createRange();

        range.setStartBefore(container);
        range.setEnd(container.childNodes[2], 3);

        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);

        const selectedText = sut.extractSelectedText(container.lastChild as Node);
        expect(selectedText).toBe('');
    });
});
