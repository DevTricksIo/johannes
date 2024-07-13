import ITextOperationService from "./ITextOperationService";

type TargetNode = {
    nodeType: string;
    classes?: string[];
};

class TextOperationService implements ITextOperationService  {

    // selectedNodes: Node[] | null; //muito provavlemente eu vou ter que quebrar em n arrays um para cada no de bloco 
    // target: TargetNode | null;    //muito provavelmente eu vou ter um target para cada nó de bloco
    // intention: string | null;     //e um intention para cada nó de bloco.


    command: string;
    value: string | undefined;

    constructor(command: string, value: string | undefined = undefined) {
        // this.selectedNodes = null;
        // this.target = null;
        // this.intention = null;

        this.command = command;
        this.value = value;
    }



    queryCommandState(): boolean {
        return document.queryCommandState(this.command);
    }

    queryCommandState2(): boolean {
        let aa = document.queryCommandState(this.command);
        return aa;
    }

    execCommand(): boolean {

        if(this.command == "link"){
            alert("delete");

            return true;
        }
        
        if (this.command == "delete") {
            alert("delete");

            return true;
        }

        if (this.command == "duplicate") {
            alert("duplicate");

            return true;
        }

        return document.execCommand(this.command, false, this.value);
    }

    execCommand2(): boolean {


        if(this.command == "link"){
            alert("delete");

            return true;
        }
        
        if (this.command == "delete") {
            alert("delete");

            return true;
        }

        if (this.command == "duplicate") {
            alert("duplicate");

            return true;
        }


        return document.execCommand(this.command, false, this.value);
    }


    // execCommand(command: string, showUI?: boolean, value?: any): boolean {

    //     this.selectedNodes = this.getSelectedTextNodes();
    //     this.target = { nodeType: command, classes: value };
    //     this.setIntention(this.selectedNodes[0], this.target);


    //     this.selectedNodes.forEach(node => {

    //         if (node.nodeType !== Node.TEXT_NODE) {
    //             throw new Error("Invalid node typed");
    //         }

    //         if (this.intention == "add") {

    //             let alreadyAppliedStyle = this.findClosestMatchingParent(node, this.target!);

    //             if (!alreadyAppliedStyle) {
    //                 this.insertNewContent(node);
    //             } else {
    //                 // não faça nada por enquanto
    //             }
    //         }
    //     });


    //     return true;
    // }


    // insertNewContent(node: Node): void {
    //     if (node.nodeType !== Node.TEXT_NODE) {
    //         throw new Error("Node must be a text node.");
    //     }

    //     // Get the current selection
    //     const selection = window.getSelection()!;

    //     // Check if the selection is within the node
    //     if (!selection.containsNode(node, true)) {
    //         console.log("No text selected or selection does not intersect with the given node.");
    //         return;
    //     }

    //     // Get the range of the selection
    //     const range = selection.getRangeAt(0);

    //     // Check if the selected range is within the text node
    //     if (range.commonAncestorContainer !== node) {
    //         console.log("Selection does not fully encompass the text node.");
    //         return;
    //     }

    //     // Extract parts of the text node based on the selection
    //     const startOffset = range.startOffset;
    //     const endOffset = range.endOffset;

    //     const beforeText = node.textContent.substring(0, startOffset);
    //     const selectedText = range.toString();
    //     const afterText = node.textContent.substring(endOffset);

    //     // Create the wrapper element for the selected text
    //     const wrapperElement = this.createWrapperElement();
    //     wrapperElement.textContent = selectedText;

    //     // Create document fragment to hold the new structure
    //     let fragment = document.createDocumentFragment();

    //     if (beforeText) {
    //         fragment.appendChild(document.createTextNode(beforeText));
    //     }

    //     fragment.appendChild(wrapperElement);

    //     if (afterText) {
    //         fragment.appendChild(document.createTextNode(afterText));
    //     }

    //     // Replace the original node with the fragment
    //     if (node.parentNode) {
    //         node.parentNode.replaceChild(fragment, node);
    //     }
    // }



    // createWrapperElement(textNode: Node): HTMLElement {
    //     const element = document.createElement(this.target!.nodeType);
    //     element.classList.add(...this.target!.classes!);
    //     element.textContent = this.extractSelectedText(textNode);
    //     return element;
    // }


    // setIntention(firstNode: Node, targetNode: TargetNode): string {

    //     let hasTarget = this.findClosestMatchingParent(firstNode, targetNode);

    //     if (!hasTarget) {
    //         return this.intention = "add";
    //     }

    //     return "remove";
    // }


    getTargetElementMap(command: string): keyof HTMLElementTagNameMap {
        switch (command) {

            case "strong":
            case "bold":
            case "b":
                return 'strong';

            case "italic":
            case "i":
            case "em":
                return "em";

            case "underline":
            case "u":
                return "u";

            case "strikethrough":
            case "s":
                return 's';

            case "background":
                return "span";

            case "color":
                return "span";

            default:
                throw new Error();
        }
    }


    getSelectedTextNodes(): Node[] {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return [];
        }

        const textNodes: Node[] = [];

        for (let i = 0; i < selection.rangeCount; ++i) {
            const range = selection.getRangeAt(i);
            const nodeIterator = document.createNodeIterator(
                range.commonAncestorContainer,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode(node) {
                        if (range.intersectsNode(node)) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        return NodeFilter.FILTER_REJECT;
                    }
                }
            );

            let node;
            while ((node = nodeIterator.nextNode())) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const nodeRange = document.createRange();
                    nodeRange.selectNodeContents(node);

                    if (
                        range.compareBoundaryPoints(Range.END_TO_START, nodeRange) === -1 &&
                        range.compareBoundaryPoints(Range.START_TO_END, nodeRange) === 1
                    ) {
                        textNodes.push(node);
                    }
                }
            }
        }

        return textNodes;
    }

    findClosestMatchingParent(element: Node | null, target: TargetNode): Element | null {
        if (element && element.nodeType === Node.TEXT_NODE) {
            element = element.parentElement;
        }

        while (element && element !== document.body) {
            if (element.nodeType === Node.ELEMENT_NODE) {
                const elem = element as Element;
                if (elem.tagName.toLowerCase() === target.nodeType.toLowerCase()) {
                    if (!target.classes || target.classes.every(cls => elem.classList.contains(cls))) {
                        return elem;
                    }
                }
            }
            element = element.parentElement;
        }
        return null;
    }

    extractSelectedText(textNode: Node): string {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return "";
        }

        const range = selection.getRangeAt(0);

        if (textNode.nodeType !== Node.TEXT_NODE) {
            return "";
        }

        const textContent = textNode.textContent || "";

        let start = 0;
        let end = textContent.length;

        if (!range.intersectsNode(textNode)) {
            return "";
        }

        if (range.startContainer === textNode) {
            start = range.startOffset;
        } else if (range.startContainer.contains(textNode)) {
            start = 0;
        }

        if (range.endContainer === textNode) {
            end = range.endOffset;
        } else if (range.endContainer.contains(textNode)) {
            end = textContent.length;
        }

        if (start < end) {
            return textContent.substring(start, end);
        }

        return "";
    }
}

export default TextOperationService;
