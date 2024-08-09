export class DOMUtils {


    static isSelectionInTableCell() {
        let selection = window.getSelection();
        if (!selection?.rangeCount) return false;

        let node = selection.anchorNode;
        while (node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if ((node as Element).tagName === 'TD' || (node as Element).tagName === 'TH') {
                    return true;  // The selection starts inside a table cell
                }
            }
            node = node.parentNode;  // Move up in the DOM tree
        }
        return false;  // Selection is not inside a table cell
    }

    /**
    * Determines whether the current selection is at the start or end of a contenteditable element.
    * This function was adapted from a StackOverflow answer.
    *
    * @param {HTMLElement} el - The contenteditable element to check.
    * @returns {Object} An object containing two boolean properties: `atStart` and `atEnd`.
    *
    * @see {@link https://stackoverflow.com/questions/7451468/contenteditable-div-how-can-i-determine-if-the-cursor-is-at-the-start-or-end-o#answer-7478420|StackOverflow Response}
    * @example
    * // Returns { atStart: true, atEnd: false } if the cursor is at the start of the element, but not at the end.
    * const result = getSelectionTextInfo(document.getElementById('editable'));
    */
    static getSelectionTextInfo(el: HTMLElement): { atStart: boolean; atEnd: boolean } {

        let atStart = false, atEnd = false;

        if (el.textContent == "") {
            atStart = true;
            atEnd = true;

            return { atStart, atEnd }
        }

        let selRange: Range, testRange: Range;

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            selRange = sel.getRangeAt(0);
            testRange = document.createRange();

            testRange.selectNodeContents(el);
            testRange.setEnd(selRange.startContainer, selRange.startOffset);
            atStart = testRange.toString() === "";

            testRange.selectNodeContents(el);
            testRange.setStart(selRange.endContainer, selRange.endOffset);
            atEnd = testRange.toString() === "";
        }

        return { atStart, atEnd };
    }

    /**
    * Inserts a new node into the DOM immediately after a specified reference node.
    * This function is particularly useful for dynamically modifying the document structure by adding new content
    * or components in relation to existing elements.
    *
    * @param {Node} newNode - The new node to be inserted into the DOM.
    * @param {Node} referenceNode - The node after which the new node should be inserted.
    * @returns {void} This function does not return a value; it performs a DOM manipulation operation.
    *
    * @example
    * // Suppose you want to insert a new paragraph after an existing div element:
    * const newParagraph = document.createElement('p');
    * newParagraph.textContent = 'Hello, world!';
    * const referenceDiv = document.getElementById('myDiv');
    * insertAfter(newParagraph, referenceDiv);
    *
    * @description
    * This function checks if the referenceNode has a parent node. If a parent node exists, it uses
    * `parentNode.insertBefore()` to insert the newNode into the DOM right after the referenceNode.
    * This is achieved by specifying `referenceNode.nextSibling` as the second parameter to `insertBefore()`,
    * which effectively places the newNode directly after the referenceNode in the document's structure.
    * If the referenceNode has no parent, the function does nothing, as insertion is not possible.
    */
    static insertAfter(newNode: Node, referenceNode: Node) {
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }

    /**
    * Checks if a given DOM Node has any visible text content. The function considers text content directly within the node
    * as well as recursively checking all child nodes. This is useful for determining if an element or any part of a subtree
    * has textual significance, which might affect display logic, validation, or processing.
    *
    * @param {Node} node - The DOM Node to check for text content.
    * @returns {boolean} True if the node itself or any of its children has non-empty text content, otherwise false.
    *
    * @example
    * // Suppose you want to check if a paragraph element is empty or not:
    * const paragraph = document.getElementById('exampleParagraph');
    * const hasContent = hasTextContent(paragraph);
    * console.log('Does the paragraph have content?', hasContent);
    *
    * @description
    * This function first checks the text content of the node itself. If the node's textContent, when trimmed, is not an empty string,
    * the function returns true, indicating the presence of visible text. If the initial check fails, the function then recursively
    * checks each child node to determine if any child contains visible text. This recursion ensures that even deeply nested text nodes
    * that contribute to the visible content are accounted for. The function returns true at the first instance of finding visible text,
    * optimizing the search process within potentially large DOM structures.
    */
    static hasTextContent(node: Node): boolean {
        return node.textContent?.trim() !== '' ||
            (node.hasChildNodes() && Array.from(node.childNodes).some(childNode => this.hasTextContent(childNode)));
    }

    /**
    * Clones a specified HTMLElement and inserts the clone immediately after the original element in the DOM.
    * This function is useful for duplicating interactive components or content blocks within a dynamic interface.
    *
    * @param {HTMLElement} element - The HTMLElement to be cloned and reinserted.
    * @returns {HTMLElement | null} The cloned HTMLElement if the operation is successful, or null if the original element does not have a parent.
    *
    * @example
    * // Assume you have a list item that you want to duplicate:
    * const listItem = document.querySelector('li.my-item');
    * const newListItem = cloneAndInsertAfter(listItem);
    * if (newListItem) {
    *     console.log('Item was cloned successfully.');
    * }
    *
    * @description
    * This function first attempts to clone the provided `element` using `cloneNode(true)`, which ensures that all child nodes and attributes are copied.
    * The function then checks if the original element has a parent node. If it does not, the function returns null since insertion cannot proceed.
    * If a parent node exists, the cloned element is inserted immediately after the original element using `parentNode.insertBefore()`.
    * This allows the function to effectively duplicate and place the new element in the correct position within the DOM tree.
    */
    static cloneAndInsertAfter(element: HTMLElement): HTMLElement | null {
        const clonedElement = element.cloneNode(true) as HTMLElement;

        const parentElement = element.parentNode;

        if (!parentElement) {
            return null;
        }

        parentElement.insertBefore(clonedElement, element.nextSibling);

        return clonedElement;
    }

    /** 
    * Searches for the closest ancestor element of the currently active element that has the specified CSS class.
    * This function traverses up from the active element in the DOM tree and checks each ancestor to see if it matches
    * the specified class name.
    *
    * @param {string} className - The class name to match against ancestor elements.
    * @returns {HTMLElement | null} The closest ancestor element with the specified class, or null if no such element exists.
    *
    * @example
    * // Suppose you want to find the closest form element that contains the currently focused input field:
    * const closestForm = findClosestAncestorOfActiveElementByClass('my-form-class');
    * console.log(closestForm);
    *
    * @description
    * This function begins by obtaining a reference to the currently active element using `document.activeElement`.
    * If there is no active element, or the active element does not have any ancestor with the specified class,
    * the function returns null. Otherwise, it iterates through the ancestors of the active element until it finds
    * an element with the specified class or reaches the root of the document. This is particularly useful in complex
    * forms or interactive areas where context-based actions depend on specific parts of the DOM structure.
    */
    static findClosestAncestorOfActiveElementByClass(className: string): HTMLElement | null {
        const activeElement = document.activeElement;

        if (!activeElement) {
            return null;
        }

        let currentElement: Node | null = activeElement;

        while (currentElement) {
            if (
                currentElement.nodeType === Node.ELEMENT_NODE &&
                (currentElement as HTMLElement).classList.contains(className)
            ) {
                return currentElement as HTMLElement;
            }

            currentElement = currentElement.parentNode;
        }

        return null;
    }


    /**
    * Finds the closest ancestor element with the specified class name from the current text selection.
    * If the selection is in a text node, it climbs up the DOM tree to find the closest element that matches the specified class.
    * This function is useful for context-sensitive operations based on the current selection in document editing or processing environments.
    *
    * @param {string} className - The class name to search for in ancestor elements.
    * @returns {HTMLElement | null} The closest ancestor element with the specified class, or null if no such element is found.
    */
    static findClosestAncestorOfSelectionByClass(className: string): HTMLElement | null {
        const selection = window.getSelection();

        // Check if there's a selection and if it has at least one range
        if (!selection || selection.rangeCount === 0) {
            return null;
        }

        // Get the starting node of the selection
        let currentElement: Node | null = selection.getRangeAt(0).commonAncestorContainer;

        // If the current node is a text node, start from its parent element
        if (currentElement && currentElement.nodeType === Node.TEXT_NODE) {
            currentElement = currentElement.parentNode;
        }

        // Traverse up the DOM tree to find the closest element with the specified class
        while (currentElement) {
            if (currentElement.nodeType === Node.ELEMENT_NODE && (currentElement as HTMLElement).classList.contains(className)) {
                return currentElement as HTMLElement;
            }
            currentElement = currentElement.parentNode;
        }

        return null;
    }

    /**
    * Rearrange content around the split point based on the cursor position.
    * This function handles the process of splitting the content at the cursor,
    * then rearranging the content by deleting appropriate parts in the original
    * and cloned nodes. It ensures that after the split, the original node contains
    * only the content before the cursor and the cloned node contains the content after the cursor.
    * Importantly, this function maintains the validity of the DOM structure after modifications,
    * preventing any disruptions in document structure that could affect rendering or further scripting.
    * 
    * @param {Node} currentNode - The node containing the original content before the split.
    * @param {Node} newNode - The cloned node that will contain the content after the split.
    * @returns {void} This function does not return a value; it modifies DOM nodes directly.
    * 
    * @example
    * // Assuming currentNode is an element with text content and a cursor position within it,
    * // and newNode is its cloned counterpart:
    * rearrangeContentAfterSplit(currentNode, newNode);
    * 
    * @description
    * This function is a part of an editing system where content needs to be dynamically
    * split and rearranged. It uses a cursor-based approach to determine the split point,
    * removes content from the original and the clone based on the cursor's position,
    * and sets up the nodes for subsequent user interactions. The DOM remains valid and well-formed,
    * ensuring that subsequent operations, such as further splits or style changes, can be performed
    * without additional checks or corrections.
    */
    static rearrangeContentAfterSplit(currentNode: Node, newNode: Node): void {
        const cursorPosition = DOMUtils.getCursorPosition(currentNode as Node);
        const ranges1 = this.splitContentAtCursorSelection(currentNode as Node);

        // change the original
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(ranges1[1]);
        document.getSelection()?.deleteFromDocument();

        // change the clone
        if (newNode && cursorPosition) {
            this.setCursorPosition(newNode, cursorPosition);

            const ranges2 = this.splitContentAtCursorSelection(newNode as Node);

            document.getSelection()?.removeAllRanges();
            document.getSelection()?.addRange(ranges2[0]);
            document.getSelection()?.deleteFromDocument();
        }
    }

    /**
    * Calculates the cursor position within the specified node. The position is determined
    * by counting characters from the start of the node to the cursor's location within the node.
    * This function is essential for scenarios where precise text manipulation is required, such as
    * text editors or dynamically generated content fields.
    * 
    * @param {Node} node - The node within which to calculate the cursor position.
    * @returns {number | null} The zero-based index representing the cursor's position within the node,
    * or null if the selection does not intersect with the specified node or if there are any issues
    * retrieving the selection.
    * 
    * @example
    * // Assuming there is a contenteditable element and the cursor is inside it:
    * const position = getCursorPosition(document.getElementById('my-editable-div'));
    * console.log('Cursor position:', position);
    * 
    * @description
    * This function retrieves the current selection's range and determines if it intersects with the
    * given node. If an intersection is found, it uses a TreeWalker to traverse the text nodes under
    * the given node, counting characters until it reaches the start container of the range.
    * This allows the function to return an accurate character index even in the presence of nested elements
    * or mixed content (text combined with elements).
    */
    static getCursorPosition(node: Node): number | null {
        const selection = window.getSelection();
        if (!selection || !node) return null;

        const range = selection.getRangeAt(0);

        if (!range.intersectsNode(node)) return null;

        const treeWalker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_TEXT,
            { acceptNode: node => NodeFilter.FILTER_ACCEPT }
        );

        let charCount = 0;
        let currentNode = treeWalker.firstChild();

        while (currentNode) {
            if (currentNode === range.startContainer) {
                charCount += range.startOffset;
                break;
            }

            charCount += currentNode.textContent?.length || 0;
            currentNode = treeWalker.nextNode();
        }

        return charCount;
    }

    /**
    * Sets the cursor position within the specified element based on a character index.
    * This function creates a new range and uses a TreeWalker to navigate through the text nodes
    * within the element to find the exact location to set the cursor. The position is set
    * by counting characters up to the specified index.
    * 
    * @param {Node} element - The element within which to set the cursor position.
    * @param {number} position - The zero-based character index where the cursor should be positioned.
    * @returns {void} This function does not return a value; it directly modifies the selection within the document.
    * 
    * @example
    * // Assuming there is a paragraph element and you want to set the cursor at the 10th character:
    * const paragraph = document.getElementById('my-paragraph');
    * setCursorPosition(paragraph, 10);
    * 
    * @description
    * The function clears any existing selections, calculates the correct text node and offset within that node,
    * and then sets a new range at that position. It ensures that the cursor is moved accurately, even within
    * complex nested content structures. This is particularly useful for text editing applications and dynamic
    * content management systems where precise cursor control is required.
    */
    static setCursorPosition(element: Node, position: number): void {
        const selection = window.getSelection();
        if (!selection) return;

        selection.removeAllRanges();

        const range = document.createRange();
        const treeWalker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            { acceptNode: () => NodeFilter.FILTER_ACCEPT }
        );

        let currentNode = treeWalker.nextNode();
        let currentPos = 0;

        while (currentNode) {
            const textLength = currentNode.textContent?.length || 0;
            if (currentPos + textLength >= position) {
                range.setStart(currentNode, position - currentPos);
                range.collapse(true);
                break;
            }
            currentPos += textLength;
            currentNode = treeWalker.nextNode();
        }

        selection.addRange(range);
    }

    /**
    * Retrieves the content type attribute from the currently active content block in the document.
    * This function is primarily used in contexts where different actions or behaviors are conditioned
    * upon the type of content the user is interacting with.
    *
    * @returns {string | null} The value of the 'data-content-type' attribute if it exists on the content element,
    * or null if the attribute is not found or the content element does not exist.
    *
    * @example
    * // If you need to apply specific logic based on the type of content currently being edited:
    * const contentType = getContentTypeFromActiveElement();
    * if (contentType === 'p') {
    *     console.log('Editing a text block');
    * } else if (contentType === 'h1') {
    *     console.log('Editing an heading');
    * }
    *
    * @description
    * This function begins by calling `getCurrentActiveBlock()`, which should return the currently active block element
    * in the UI. It then searches for an element within this block with the class '.johannes-content-element',
    * which is expected to carry a 'data-content-type' attribute specifying the type of content (e.g., 'text', 'image', etc.).
    * The function retrieves and returns the value of this attribute, or null if the attribute is not present.
    */
    static getContentTypeFromActiveElement(): string | null {
        const block = DOMUtils.getCurrentActiveBlock();
        const contentElement = block?.querySelector(".johannes-content-element") as HTMLElement;
        if (!contentElement) {
            return null;
        }
        const contentType = contentElement.getAttribute("data-content-type");
        return contentType || null;
    }

    /**
    * Splits the content of the specified root node into two ranges based on the current cursor position.
    * This function creates two ranges: one for the content before the cursor and one for the content after.
    * The operation is limited to the boundaries of the provided root node, ensuring that the division respects
    * the structural integrity of the content within that node.
    * 
    * @param {Node} rootNode - The root node within which the content is to be split. This node sets the boundary for the split operation.
    * @returns {Range[]} An array of two `Range` objects: the first containing the content before the cursor, and the second containing the content after the cursor.
    * 
    * @example
    * // Assume there is a div element with content and a cursor position somewhere inside it:
    * const contentDiv = document.getElementById('contentDiv');
    * const ranges = splitContentAtCursorSelection(contentDiv);
    * console.log('Content before cursor:', ranges[0].cloneContents().textContent);
    * console.log('Content after cursor:', ranges[1].cloneContents().textContent);
    * 
    * @description
    * This function retrieves the current selection's range and checks if it intersects with the provided rootNode.
    * If so, it constructs two new ranges using the rootNode as the context:
    * - The first range captures all content from the start of rootNode up to the cursor's start.
    * - The second range captures all content from the cursor's end to the end of rootNode, optionally extending to the last child of rootNode if necessary.
    * This is useful for applications involving rich text editing or any scenario where content needs to be segmented around a user's point of focus.
    */
    static splitContentAtCursorSelection(rootNode: Node): Range[] {
        const ranges: Range[] = [];

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return ranges;

        const range = selection.getRangeAt(0);

        const rangeBefore = document.createRange();
        rangeBefore.selectNodeContents(rootNode);
        rangeBefore.setEnd(range.startContainer, range.startOffset);

        const rangeAfter = document.createRange();
        rangeAfter.selectNodeContents(rootNode);
        rangeAfter.setStart(range.endContainer, range.endOffset);
        if (rootNode.lastChild) {
            rangeAfter.setEndAfter(rootNode.lastChild);
        }

        ranges.push(rangeBefore);
        ranges.push(rangeAfter);

        return ranges;
    }

    /**
    * Places the cursor at the start of a specified editable HTML element. This function ensures that if the element is 
    * content-editable, the cursor is positioned at the very beginning. This is especially useful in user interfaces
    * where text editing capabilities are dynamically enabled, and immediate user interaction is expected.
    *
    * @param {HTMLElement} editableElement - The content-editable HTML element where the cursor should be placed at the start.
    * @returns {void} This function does not return a value; it directly manipulates the DOM and selection state.
    *
    * @example
    * // Assuming there is a content-editable paragraph in the document:
    * const editableParagraph = document.getElementById('editableParagraph');
    * placeCursorAtStartOfEditableElement(editableParagraph);
    *
    * @description
    * This function first checks if the `editableElement` is content-editable. If it is not, a warning is logged to the console.
    * If the element is editable, it:
    * 1. Sets focus on the element to ensure that it is ready for user input.
    * 2. Creates a new Range object, selects all the contents of the element, and collapses this range to the start of the element.
    * 3. Clears any existing selections and applies the new range, effectively positioning the cursor at the start of the element.
    * This approach is crucial for editing interfaces, ensuring that user interaction is intuitive and immediately responsive.
    */
    static placeCursorAtStartOfEditableElement(editableElement: HTMLElement) {
        if (editableElement.isContentEditable) {
            editableElement.focus();

            const range = document.createRange();
            range.selectNodeContents(editableElement);
            range.collapse(true);

            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        } else {
            console.warn("The element is not editable.");
        }
    }

    /**
    * Sets the focus and cursor position to the end of the text within a specified content-editable HTML element.
    * This method is specifically designed to handle content-editable elements by positioning the cursor
    * at the very end of the element's content, regardless of the content's composition (text, elements, etc.).
    *
    * The function checks if the provided element is content-editable. If it is, it uses `requestAnimationFrame`
    * to ensure that all DOM updates have completed before setting focus and adjusting the cursor position.
    * It then creates a range spanning the content of the element, finds the deepest last node, and sets the
    * cursor position at the end of this node. This is particularly useful for rich text editors or any application
    * that requires precise control over cursor placement in editable content.
    *
    * If the element is not content-editable, a warning is logged to the console indicating that the element cannot be edited.
    *
    * @param {HTMLElement} contentBlock - The content-editable HTML element where the cursor will be placed at the end.
    */
    static placeCursorAtEndOfEditableElement(contentBlock: HTMLElement) {
        if (contentBlock.isContentEditable) {
            requestAnimationFrame(() => {
                contentBlock.focus();

                const range = document.createRange();
                const selection = window.getSelection();

                range.selectNodeContents(contentBlock);

                let lastNode: Node | null = contentBlock;
                while (lastNode.lastChild) {
                    lastNode = lastNode.lastChild;
                }

                range.setEnd(lastNode, lastNode.nodeType === Node.TEXT_NODE ? lastNode.textContent!.length : 0);
                range.collapse(false);

                selection?.removeAllRanges();
                selection?.addRange(range);
            });
        } else {
            console.warn("The element is not editable.");
        }
    }

    static getCurrentActiveBlock(): Element | null {

        let container = document.activeElement;

        if (container) {
            return container.closest(".block");
        }

        return null;
    }

    static isSelectedTextDescendantOf(parentSelector: string): boolean {
        const selection = document.getSelection();

        if (!selection) {
            return false;
        }

        if (!selection.rangeCount) return false;

        const range = selection.getRangeAt(0);
        let element: Node | null = range.startContainer;

        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }

        if (!element) {
            return false;
        }

        return (element as Element).closest(parentSelector) !== null;
    }

    static removeFilterText(): number | null {
        let lastSlashPosition: number | null = null;
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer;

            if (container.nodeType === Node.TEXT_NODE && container.parentElement?.isContentEditable) {
                let node: Node | null = container;
                let offset = range.startOffset;

                while (node && offset > 0) {
                    const textBeforeCursor = node.textContent?.substring(0, offset) || "";
                    lastSlashPosition = textBeforeCursor.lastIndexOf("/");

                    if (lastSlashPosition !== -1) {
                        range.setStart(node, lastSlashPosition);
                        range.deleteContents();
                        break;
                    } else {
                        offset = node.parentNode?.textContent?.lastIndexOf("/") || -1;
                        node = node.parentNode;
                    }
                }

                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                console.warn("The cursor is not within a contentEditable element or a text node.");
            }
        } else {
            console.warn("No active selection.");
        }

        return lastSlashPosition;
    }

}