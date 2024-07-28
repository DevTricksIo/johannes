import { ITextOperationService } from "./ITextOperationService";

type TargetNode = {
    nodeType: string;
    classes?: string[];
};

export class TextOperationService implements ITextOperationService {

    private static instance: TextOperationService;

    private constructor() {

        if (TextOperationService.instance) {
            throw new Error();
        }
    }

    static getInstance(): TextOperationService {


        if (!this.instance) {
            this.instance = new TextOperationService();
        }

        return this.instance;
    }

    execCommand(command: string, showUi: boolean, value: string | null): boolean {

        if (command == TextOperationService.QUERY_TEXT_OPERATIONS.INLINE_CODE) {
            this.toggleCodeExecCommand();
            return true;
        }

        let v: string | undefined = value || undefined;

        if (v == "initial") {
            v = this.getInitialColorAsHex();
        }

        if (command == TextOperationService.QUERY_TEXT_OPERATIONS.CREATE_LINK) {

            const element = TextOperationService.getSelectedHTMLElement();

            if (element?.closest("a")) {
                return document.execCommand("unlink", false, v);
            }

            if (showUi) {

                const showInputLinkBox = new CustomEvent('showInputLinkBoxRequested', {
                    bubbles: true,
                    cancelable: true
                });

                document.dispatchEvent(showInputLinkBox);

                return true;
            }
        }

        if(command == TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR || 
            command == TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR){

                document.execCommand(command, false, v);

                const showInputLinkBox = new CustomEvent('colorChange', {
                    bubbles: true,
                    cancelable: true
                });

                document.dispatchEvent(showInputLinkBox);
        }

        return document.execCommand(command, false, v);
    }


    static QUERY_TEXT_OPERATIONS = {
        HILITE_COLOR: "hiliteColor",
        FORE_COLOR: "foreColor",
        INLINE_CODE: "inlineCode",
        CREATE_LINK: "createLink",
        UNDERLINE: "underline"
        // CREATE_LINK: "createLink"

    };

    queryCommandState(command: string, value: string | null): boolean {

        if (command === TextOperationService.QUERY_TEXT_OPERATIONS.CREATE_LINK) {

            if (TextOperationService.getSelectedHTMLElement()?.closest("a")) {
                return true;
            }

            return false;;
        }

        if (command === TextOperationService.QUERY_TEXT_OPERATIONS.UNDERLINE) {

            if (TextOperationService.getSelectedHTMLElement()?.closest("a")) {
                return false;
            }
        }

        if (command === TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR) {
            return this.queryHiliteColor(value!);
        }

        if (command === TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR) {
            return this.queryForeColor(value!);
        }

        return document.queryCommandState(command);
    }

    private toggleCodeExecCommand() {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        let containerNode: Node | null = range.commonAncestorContainer;

        while (containerNode && containerNode.nodeName !== 'CODE') {
            containerNode = containerNode.parentNode;
        }

        if (containerNode && containerNode.nodeName === 'CODE') {
            const codeElement = containerNode as HTMLElement;
            const rangeOfCode = document.createRange();
            rangeOfCode.selectNodeContents(codeElement);

            if (range.toString() === rangeOfCode.toString()) {
                const parent: Node | null = codeElement.parentNode;
                while (parent && codeElement.firstChild) {
                    parent.insertBefore(codeElement.firstChild, codeElement);
                }
                parent?.removeChild(codeElement);
            } else {
                const textContent = range.toString();
                document.execCommand('insertHTML', false, textContent);
            }
            document.getSelection()?.removeAllRanges();
        } else {
            const contentAsString = new XMLSerializer().serializeToString(range.cloneContents());
            document.execCommand('insertHTML', false, `<code>${contentAsString}</code>`);
        }
    }






    private queryForeColor(expectedColor: string) {
        const selection = window.getSelection();

        if (!selection) {
            return false;
        }
        if (!selection.rangeCount) return false;

        let element: Node | null = selection.getRangeAt(0).commonAncestorContainer;

        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }

        const fontColor = (element as HTMLElement).closest("font[color]");
        if (!fontColor) return false;

        const style = window.getComputedStyle(fontColor);
        const rgbColor = style.color;

        const hexColor = this.rgbToHex(rgbColor);

        return hexColor.toUpperCase() === expectedColor.toUpperCase();
    }


    private queryHiliteColor(expectedColor: string) {

        const selection = window.getSelection();

        if (!selection) {
            return false;
        }
        if (!selection.rangeCount) return false;

        let element: Node | null = selection.getRangeAt(0).commonAncestorContainer;

        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }

        const spanWithBackground = 
            (element as HTMLElement).closest("span[style*='background-color']") || 
            (element as HTMLElement).closest("font[style*='background-color']");


        if (!spanWithBackground) return false;

        const style = window.getComputedStyle(spanWithBackground);
        const rgbColor = style.backgroundColor;

        const hexColor = this.rgbToHex(rgbColor);

        return hexColor.toUpperCase() === expectedColor.toUpperCase();
    }

    private rgbToHex(rgb: string): string {
        const rgbArray = rgb.match(/\d+/g)!.map(Number);
        return "#" + rgbArray.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }

    private getInitialColorAsHex() {
        const tempElement = document.createElement("div");
        document.body.appendChild(tempElement);

        tempElement.style.color = 'initial';

        const computedColor = window.getComputedStyle(tempElement).color;

        document.body.removeChild(tempElement);

        return this.rgbToHex(computedColor);
    }

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

    static getSelectedHTMLElement(): HTMLElement | null {
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let element: Node | null = range.commonAncestorContainer;

            if (element.nodeType === Node.TEXT_NODE) {
                element = element.parentNode as HTMLElement;
            }

            while (element && !(element instanceof HTMLElement)) {
                element = element.parentNode as HTMLElement | null;
            }

            if (element) {
                return element;
            }
        }

        return null;
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
