class ExecCommandFallback {

    editorElement: HTMLElement | null;

    constructor() {
        this.editorElement = null;
    }

    toggleStyle(tagName: string, editorElement: HTMLElement): void {

        this.editorElement = editorElement;

        const selection = window.getSelection();
        if (!selection!.rangeCount) return;

        const range = selection!.getRangeAt(0)!;
        if (range.collapsed) return;

        this.splitTextNodes(range);
        this.applyStyle(range, tagName);
        this.normalize(this.editorElement!);
    }

    private applyStyle(range: Range, tagName: string) {
        if (!this.isStyled(range, tagName)) {
            const tag = document.createElement(tagName);
            const selectedContent = range.extractContents();
            tag.appendChild(selectedContent);
            range.insertNode(tag);
        } else {
            this.removeStyle(range, tagName);
        }
    }

    private isStyled(range: Range, tagName: string): boolean {
        let ancestor = range.commonAncestorContainer;
        while (ancestor && ancestor !== this.editorElement) {
            if (ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeName === tagName.toUpperCase()) {
                return true;
            }
            ancestor = ancestor.parentNode!;
        }
        return false;
    }

    private removeStyle(range: Range, tagName: string) {
        const elements = range.cloneContents().querySelectorAll(tagName);
        elements.forEach(el => {
            while (el.firstChild) {
                el.parentNode!.insertBefore(el.firstChild, el);
            }
            el.parentNode!.removeChild(el);
        });

        const newContent = range.extractContents();
        this.removeAllStyles(newContent, tagName);
        range.insertNode(newContent);
        document.getSelection()!.removeAllRanges();
    }

    private removeAllStyles(node: Node, tagName: string) {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === tagName.toUpperCase()) {
            while (node.firstChild) {
                node.parentNode!.insertBefore(node.firstChild, node);
            }
            node.parentNode!.removeChild(node);
        }
        node.childNodes.forEach(child => this.removeAllStyles(child, tagName));
    }

    private splitTextNodes(range: Range) {
        let startContainer = range.startContainer;
        let endContainer = range.endContainer;

        // Certifique-se de que o container de início é um nó de texto antes de dividir
        if (startContainer.nodeType === Node.TEXT_NODE) {
            let startText = startContainer as Text; // Assegura que startContainer é tratado como um Text
            if (range.startOffset > 0 && range.startOffset < startText.length) {
                startText.splitText(range.startOffset);
                range.setStart(startText.nextSibling!, 0); // Atualiza a seleção para começar no novo nó criado
            }
        }

        // Certifique-se de que o container de término é um nó de texto antes de dividir
        if (endContainer.nodeType === Node.TEXT_NODE && range.endOffset < (endContainer as Text).length) {
            let endText = endContainer as Text; // Assegura que endContainer é tratado como um Text
            endText.splitText(range.endOffset);
            range.setEnd(endText, range.endOffset); // Atualiza a seleção para terminar no novo nó criado
        }
    }


    private normalize(node: Node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            element.normalize();

            const emptyElements = element.querySelectorAll("b, i, u");
            emptyElements.forEach(el => {
                if (el.childNodes.length === 0 || !el.textContent!.trim()) {
                    el.parentNode!.removeChild(el);
                }
            });
        }
    }
}

export default ExecCommandFallback;