import { Commands } from "@/commands/Commands";
import { ITextOperationsService } from "./ITextOperationsService";
import { Utils } from "@/utilities/Utils";
import { Colors } from "@/common/Colors";
import { IMemento } from "@/core/IMemento";
import { DependencyContainer } from "@/core/DependencyContainer";
import { EventEmitter } from "@/commands/EventEmitter";
import { ButtonIDs } from "@/core/ButtonIDs";
import { DropdownListIDs } from "@/core/DropdownListIDs";

type TargetNode = {
    nodeType: string;
    classes?: string[];
};

export class TextOperationsService implements ITextOperationsService {

    private static instance: TextOperationsService;

    private memento: IMemento;

    textOperationService: any;

    private constructor(memento: IMemento) {
        if (TextOperationsService.instance) {
            throw new Error("Use TextOperationService.getInstance() to get instance.");
        }

        this.memento = memento;
        this.attachEvents();

    }

    //TODO: move this to textContentFloatingToolbar
    attachEvents(): void {
        // document.addEventListener(DefaultJSEvents.SelectionChange, this.handleSelectionChange.bind(this));
    }

    // handleSelectionChange() {

    //     const bold: boolean = document.queryCommandState('bold');
    //     const italic: boolean = document.queryCommandState('italic');
    //     const underline: boolean = document.queryCommandState('underline');
    //     const strikeThrough: boolean = document.queryCommandState('strikeThrough');

    //     const hiliteColor: { [key: string]: boolean } = {};
    //     hiliteColor[Colors.HiliteColorRed] = this.queryHiliteColor(Colors.HiliteColorRed);
    //     hiliteColor[Colors.HiliteColorGreen] = this.queryHiliteColor(Colors.HiliteColorGreen);
    //     hiliteColor[Colors.HiliteColorBlue] = this.queryHiliteColor(Colors.HiliteColorBlue);
    //     hiliteColor[Colors.HiliteColorYellow] = this.queryHiliteColor(Colors.HiliteColorYellow);
    //     hiliteColor[Colors.HiliteColorGrey] = this.queryHiliteColor(Colors.HiliteColorGrey);

    //     const foreColor: { [key: string]: boolean } = {};
    //     foreColor[Colors.ForeColorRed] = this.queryHiliteColor(Colors.ForeColorRed);
    //     foreColor[Colors.ForeColorGreen] = this.queryHiliteColor(Colors.ForeColorGreen);
    //     foreColor[Colors.ForeColorBlue] = this.queryHiliteColor(Colors.ForeColorBlue);
    //     foreColor[Colors.ForeColorYellow] = this.queryHiliteColor(Colors.ForeColorYellow);
    //     foreColor[Colors.ForeColorGrey] = this.queryHiliteColor(Colors.ForeColorGrey);

    //     // EventEmitter.emitFormatChangeEvent(bold, italic, underline, strikeThrough, hiliteColor, foreColor);
    // }

    static getInstance(): TextOperationsService {

        const memento = DependencyContainer.Instance.resolve<IMemento>("IMemento");

        if (!this.instance) {
            this.instance = new TextOperationsService(memento);
        }

        return this.instance;
    }



    /**
     * Executes the 'bold' command by toggling bold style on the selected text.
     * @returns {boolean} True if the command was executed successfully.
     */
    execBold(): void {

        this.memento.saveState();

        if (document.execCommand("bold")) {
            EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Bold, Colors.IconActiveBlue);
        }
    }

    execItalic(): void {

        this.memento.saveState();

        if (document.execCommand("italic")) {
            EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Italic, Colors.IconActiveBlue);
        }
    }

    execStrikeThrough(): void {

        this.memento.saveState();

        if (document.execCommand("strikeThrough")) {
            EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Strikethrough, Colors.IconActiveBlue);
        }
    }

    execUnderline(): void {
        this.memento.saveState();

        if (document.execCommand("underline")) {
            EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Underline, Colors.IconActiveBlue);
        }
    }

    execHiliteColor(value: string): void {

        this.memento.saveState();

        EventEmitter.emitResetActiveButtonsElementEvent("hiliteColor");

        if (document.execCommand("hiliteColor", false, value)) {
            EventEmitter.emitShowHideActiveElementEvent("hiliteColor", value, "show");
        }
    }

    execForeColor(value: string): void {

        this.memento.saveState();

        EventEmitter.emitResetActiveButtonsElementEvent("foreColor");

        if (document.execCommand("foreColor", false, value)) {
            EventEmitter.emitShowHideActiveElementEvent("foreColor", value, "show");
        }
    }

    execCommand(command: string, showUi: boolean, value: string | null): boolean {

        // if (command == TextOperationService.QUERY_TEXT_OPERATIONS.INLINE_CODE) {
        //     this.toggleCodeExecCommand();
        //     return true;
        // }

        // let v: string | undefined = value || undefined;

        // if (v == "initial") {
        //     v = this.getInitialColorAsHex();
        // }

        // if (command == TextOperationService.QUERY_TEXT_OPERATIONS.CREATE_LINK) {

        //     const element = TextOperationService.getSelectedHTMLElement();

        //     if (element?.closest("a")) {
        //         return document.execCommand("unlink", false, v);
        //     }

        //     if (showUi) {

        //         const showInputLinkBox = new CustomEvent('showInputLinkBoxRequested', {
        //             bubbles: true,
        //             cancelable: true
        //         });

        //         document.dispatchEvent(showInputLinkBox);

        //         return true;
        //     }
        // }

        // if (command == TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR ||
        //     command == TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR) {

        //     document.execCommand(command, false, v);

        //     const showInputLinkBox = new CustomEvent('colorChange', {
        //         bubbles: true,
        //         cancelable: true
        //     });

        //     document.dispatchEvent(showInputLinkBox);
        // }

        // return document.execCommand(command, false, v);

        return false;
    }

    queryCommandState(command: string, value: string | null): Promise<boolean> {

        return new Promise((resolve, reject) => {

            requestAnimationFrame(() => {
                if (command === Commands.toggleLink) {
                    resolve(this.queryAnchor());
                    return;
                }

                if (command === Commands.toggleUnderline) {

                    if (this.queryAnchor()) {
                        resolve(false);
                        return;
                    }
                }

                if (command === Commands.toggleHiliteColor) {
                    resolve(this.queryHiliteColor(value!));
                    return;
                }

                if (command === Commands.toggleForeColor) {
                    resolve(this.queryForeColor(value!));
                    return;
                }

                resolve(document.queryCommandState(command));
                return;
            });
        });
    }


    queryCommandStateA(command: string, value: string | null): boolean {

        if (command === Commands.toggleLink) {
            return this.queryAnchor();
        }

        if (command === Commands.toggleUnderline) {

            if (this.queryAnchor()) {
                return !this.queryAnchor();
            }
        }

        if (command === Commands.toggleHiliteColor) {
            return this.queryHiliteColor(value!);
        }

        if (command === Commands.toggleForeColor) {
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





    /**
    * Checks if the currently selected text has the specified foreground (text) color.
    * This function is crucial in environments where text color formatting is monitored or needs verification,
    * such as in a rich text editor. It determines whether the selected text's color matches an expected hexadecimal color value.
    *
    * @param {string} expectedColor - The expected text color in hexadecimal format (e.g., "#FFFFFF") to check against the selection.
    * @returns {boolean} Returns true if the selected text's color matches the expected color, otherwise false.
    *
    * @example
    * // To verify if the selected text has a blue text color:
    * const hasBlueTextColor = queryForeColor("#0000FF");
    * console.log('Selected text has blue text color:', hasBlueTextColor);
    *
    * @description
    * The function operates as follows:
    * 1. Retrieves the current text selection using `window.getSelection()`.
    * 2. Validates that there is a selection and that it includes at least one range.
    * 3. Identifies the most deeply nested node that contains the selection, adjusting for text nodes by moving to their parent node.
    * 4. Searches for the nearest ancestor `font` element with an explicit `color` attribute, intended to directly influence the text color.
    * 5. If such an element is found, computes the actual color in RGB format using computed styles and converts it to hexadecimal.
    * 6. Compares the converted hexadecimal color to the `expectedColor`, adjusting for case sensitivity.
    * 7. Returns true if the colors match, false otherwise.
    */
    queryForeColor(expectedColor: string): boolean {
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

        const hexColor = Utils.rgbToHex(rgbColor);

        return hexColor.toUpperCase() === expectedColor.toUpperCase();
    }

    private queryAnchor(): boolean {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;

        let node: Node | null = selection.getRangeAt(0).commonAncestorContainer;

        // Se o node é um nó de texto, começamos a verificar a partir de seu nó pai.
        if (node.nodeType === Node.TEXT_NODE) {
            node = node.parentNode;
        }

        // Verifica se o nó ou um ascendente até o elemento editável é um link.
        while (node && node !== null) { // 'this.editorElement' deve ser o elemento <p>
            if (node.nodeType == Node.ELEMENT_NODE && (node as HTMLElement).closest('a')) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }


    /**
    * Checks if the currently selected text has the specified background color.
    * This function is designed to verify the presence of a specific background color in the text selection,
    * which can be useful in text editing environments where background color formatting needs to be tracked or verified.
    *
    * @param {string} expectedColor - The expected background color in hexadecimal format (e.g., "#FFFFFF") to check against the selection.
    * @returns {boolean} Returns true if the selected text's background color matches the expected color, otherwise false.
    *
    * @example
    * // To check if the selected text has a red background color:
    * const hasRedBackground = queryHiliteColor("#FF0000");
    * console.log('Selected text has red background:', hasRedBackground);
    *
    * @description
    * The function operates as follows:
    * 1. Retrieves the current text selection using `window.getSelection()`.
    * 2. Checks if there is a selection and if it includes at least one range.
    * 3. Identifies the most deeply nested node that contains the selection, adjusting for text nodes by stepping up to their parent node.
    * 4. Searches for the nearest ancestor `span` or `font` element that explicitly has a `background-color` style applied.
    * 5. If such an element is found, computes the actual background color in RGB format and converts it to hexadecimal.
    * 6. Compares the converted hexadecimal color to the `expectedColor`, adjusting for case sensitivity.
    * 7. Returns true if the colors match, false otherwise.
    */
    queryHiliteColor(expectedColor: string): boolean {

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

        const hexColor = Utils.rgbToHex(rgbColor);

        return hexColor.toUpperCase() === expectedColor.toUpperCase();
    }

    private getInitialColorAsHex() {
        const tempElement = document.createElement("div");
        document.body.appendChild(tempElement);

        tempElement.style.color = 'initial';

        const computedColor = window.getComputedStyle(tempElement).color;

        document.body.removeChild(tempElement);

        return Utils.rgbToHex(computedColor);
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
