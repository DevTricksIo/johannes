import { Commands } from "@/commands/Commands";
import { ITextOperationsService } from "./ITextOperationsService";
import { Utils } from "@/utilities/Utils";
import { Colors } from "@/common/Colors";
import { IMemento } from "@/core/IMemento";
import { DependencyContainer } from "@/core/DependencyContainer";
import { EventEmitter } from "@/commands/EventEmitter";
import { ButtonIDs } from "@/core/ButtonIDs";
import { DOMUtils } from "@/utilities/DOMUtils";

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
    }

    static getInstance(): TextOperationsService {

        const memento = DependencyContainer.Instance.resolve<IMemento>("IMemento");

        if (!this.instance) {
            this.instance = new TextOperationsService(memento);
        }

        return this.instance;
    }

    execInsertLink(url: string): void {
        this.memento.saveState();

        document.execCommand("createLink", false, url);

        setTimeout(() => {
            EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Link, Colors.IconActiveBlue);
            this.normalizeAnchors();
        }, 50);
    }

    private normalizeAnchors() {
        const anchors = document.querySelectorAll("#johannesEditor .content a");

        anchors.forEach(anchor => {
            if (!anchor.hasAttribute('title')) {
                anchor.setAttribute('title', (anchor as HTMLAnchorElement).href);
            }

            anchor.normalize();
        });
    }


    execToggleLink(): void {
        if (!this.queryAnchorCommandState()) {
            EventEmitter.emitShowElementEvent("linkBox");
        } else {
            document.execCommand('unlink', false);
            EventEmitter.emitChangeComponentColorEvent("linkButton", Colors.IconDefaultBlack);
        }
    }

    execBold(): void {

        this.memento.saveState();

        if (document.execCommand("bold")) {
            if (document.queryCommandState("bold")) {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Bold, Colors.IconActiveBlue);
            } else {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Bold, Colors.IconDefaultBlack);
            }
        }
    }

    execInlineCode(): void {

        this.memento.saveState();

        if (this.toggleInlineCode()) {
            if (this.queryInlineCodeCommandState()) {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.InlineCode, Colors.IconActiveBlue);
            } else {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.InlineCode, Colors.IconDefaultBlack);
            }
        }
    }

    toggleInlineCode(): boolean {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;

        const range = selection.getRangeAt(0);
        let selectedContent: DocumentFragment | HTMLSpanElement = range.extractContents();

        let isCode = false;
        const containsCode = document.createElement('span');
        containsCode.appendChild(selectedContent.cloneNode(true));

        if (containsCode.querySelector('code')) {
            isCode = true;
            containsCode.querySelectorAll('code').forEach(code => {
                const textNode = document.createTextNode(code.textContent || '');
                code.parentNode?.replaceChild(textNode, code);
            });
            selectedContent = containsCode;
        }

        let parentCode = selection.anchorNode;
        while (parentCode && parentCode.nodeName !== "CODE" && parentCode.nodeName !== "BODY") {
            parentCode = parentCode.parentNode;
        }

        if (parentCode && parentCode.nodeName === "CODE") {
            isCode = true;
            const textNode = document.createTextNode(parentCode.textContent || '');
            parentCode.parentNode?.replaceChild(textNode, parentCode);
        }

        if (!isCode) {
            const codeElement = document.createElement("code");
            codeElement.appendChild(selectedContent);
            range.insertNode(codeElement);
        } else {
            range.insertNode(containsCode);
        }

        selection.removeAllRanges();
        selection.addRange(range);


        const content = DOMUtils.getActiveContentEditable();
        if (content) {
            content.normalize();

            DOMUtils.mergeInlineElements(content);
        }

        return true;
    }

    execItalic(): void {

        this.memento.saveState();

        if (document.execCommand("italic")) {
            if (document.queryCommandState("italic")) {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Italic, Colors.IconActiveBlue);
            } else {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Italic, Colors.IconDefaultBlack);
            }
        }
    }

    execStrikeThrough(): void {

        this.memento.saveState();

        if (document.execCommand("strikeThrough")) {
            if (document.queryCommandState("strikeThrough")) {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Strikethrough, Colors.IconActiveBlue);
            } else {
                EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Strikethrough, Colors.IconDefaultBlack);
            }
        }
    }

    execUnderline(): void {
        this.memento.saveState();

        if (document.execCommand("underline")) {
            setTimeout(() => {
                if (document.queryCommandState("underline")) {
                    EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Underline, Colors.IconActiveBlue);
                } else {
                    EventEmitter.emitChangeComponentColorEvent(ButtonIDs.Underline, Colors.IconDefaultBlack);
                }
            }, 10);
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


    queryCommandState(command: string, value: string | null): boolean {

        if (command === Commands.toggleLink) {
            return this.queryAnchorCommandState();
        }

        if (command === Commands.toggleUnderline) {
            return this.queryUnderlineCommandState();
        }

        if (command === Commands.toggleHiliteColor) {
            return this.queryHiliteColor(value!);
        }

        if (command === Commands.toggleForeColor) {
            return this.queryForeColor(value!);
        }

        if (command === Commands.toggleInlineCode) {
            return this.queryInlineCodeCommandState();
        }

        return document.queryCommandState(command);
    }

    private queryAnchorCommandState(): boolean {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;

        const range = selection.getRangeAt(0);
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;

        const isNodeInsideAnchor = (node: Node | null): boolean => {
            while (node && node !== document.body) {
                if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName.toLowerCase() === 'a') {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        };

        if (isNodeInsideAnchor(startContainer) || isNodeInsideAnchor(endContainer)) {
            return true;
        }

        const nodesInRange = range.cloneContents().querySelectorAll('a');
        return nodesInRange.length > 0;
    }


    private queryInlineCodeCommandState(): boolean {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;

        let node: Node | null = selection.getRangeAt(0).commonAncestorContainer;

        if (node.nodeType === Node.TEXT_NODE) {
            node = node.parentNode;
        }

        while (node && node !== null) {
            if (node.nodeType == Node.ELEMENT_NODE && (node as HTMLElement).closest('code')) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }


    private queryUnderlineCommandState(): boolean {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;

        let node: Node | null = selection.getRangeAt(0).commonAncestorContainer;

        if (node.nodeType === Node.TEXT_NODE) {
            node = node.parentNode;
        }

        while (node && node !== null) {
            if (node.nodeType == Node.ELEMENT_NODE && (node as HTMLElement).closest('u')) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }

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

        if(!(element instanceof Element)){
            return false;
        }

        const fontColor = (element as HTMLElement).closest("font[color]");
        if (!fontColor) return false;

        const style = window.getComputedStyle(fontColor);
        const rgbColor = style.color;

        const hexColor = Utils.rgbToHex(rgbColor);

        return hexColor.toUpperCase() === expectedColor.toUpperCase();
    }

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

        if(!(element instanceof Element)){
            return false;
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