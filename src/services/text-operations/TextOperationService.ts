import ITextOperationService from "./ITextOperationService";

class TextOperationService implements ITextOperationService {

    queryCommandState(commandId: string): boolean {
        return document.queryCommandState(commandId);
    }

    execCommand(commandId: string, showUI?: boolean, value?: any): boolean {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return false; // No text selected

        const commandTag = this.getCommandTag(commandId);
        if (!commandTag) return false;

        // Corrected part: Node type checking
        let element: Node | null = range.commonAncestorContainer;
        if (element.nodeType !== Node.ELEMENT_NODE) {
            element = element.parentElement;
        }
        if (!element || !(element instanceof Element)) return false;

        // Modify or wrap based on whether the element or its children have the tag
        if (this.isPartiallyOrFullyStyled(element, commandTag)) {
            this.togglePartialStyle(element as HTMLElement, commandTag, range);
        } else {
            this.wrapSelection(range, commandTag);
        }

        return true;
    }

    private getCommandTag(commandId: string): string | null {
        switch (commandId) {
            case 'bold':
                return 'strong';
            case 'italic':
                return 'em';
            case 'underline':
                return 'u';
            default:
                return null;
        }
    }

    private isPartiallyOrFullyStyled(element: Element, tag: string): boolean {
        return element.nodeName.toLowerCase() === tag || element.querySelector(tag) !== null;
    }

    private wrapSelection(range: Range, tag: string): void {
        const span = document.createElement(tag);
        const content = range.extractContents();
        span.appendChild(content);
        range.insertNode(span);
        range.selectNode(span);
    }

    private togglePartialStyle(element: HTMLElement, tag: string, range: Range): void {
        // Find the closest styled element if any
        const styledElement = element.closest(tag);
        if (styledElement) {
            this.splitAndToggle(styledElement as HTMLElement, tag, range);
        } else {
            this.wrapSelection(range, tag);
        }
    }

    private splitAndToggle(element: HTMLElement, tag: string, range: Range): void {
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;
        const elementText = element.textContent || "";

        const parent = element.parentNode!;
        if (!parent) return;  // Ensure there is a parent

        // Create document fragment to hold new nodes
        const docFrag = document.createDocumentFragment();

        // Before the selection
        if (startOffset > 0) {
            const beforeNode = document.createElement(tag);
            beforeNode.textContent = elementText.substring(0, startOffset);
            docFrag.appendChild(beforeNode);
        }

        // Middle node: text inside the selection
        const middleText = elementText.substring(startOffset, endOffset);
        if (middleText.length > 0) {
            const middleNode = document.createTextNode(middleText);
            docFrag.appendChild(middleNode);
        }

        // After the selection
        if (endOffset < elementText.length) {
            const afterNode = document.createElement(tag);
            afterNode.textContent = elementText.substring(endOffset);
            docFrag.appendChild(afterNode);
        }

        // Insert the new nodes and remove the old element
        parent.insertBefore(docFrag, element);
        parent.removeChild(element);
    }

}

export default TextOperationService;