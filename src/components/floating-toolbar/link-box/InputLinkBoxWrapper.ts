import { TextOperationService } from "@/services/text-operations/TextOperationService";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { InputLinkBox } from "./InputLinkBox";

export class InputLinkBoxWrapper extends BaseUIComponent {

    inputLinkBox: InputLinkBox;
    range?: Range;
    highlights: HTMLDivElement[] = [];

    constructor() {
        const inputLinkBox = new InputLinkBox();

        super({
            inputLinkBox: inputLinkBox
        });

        this.inputLinkBox = inputLinkBox;
        this.attachEvent();
        inputLinkBox.setParentWrapper(this);

    }

    init(): HTMLElement {
        const htmlElement = document.createElement("div");

        htmlElement.id = "linkBox";
        htmlElement.style.display = "none";
        htmlElement.classList.add("dependent-box");
        htmlElement.style.position = "absolute";

        htmlElement.appendChild(this.props.inputLinkBox.htmlElement);

        return htmlElement;
    }

    attachEvent(): void {

        document.addEventListener("showInputLinkBoxRequested", () => {

            this.show();
            this.highlightSelectedText();
            this.inputLinkBox.focus();
        });
    }


    hide(): void {

        super.hide();
        this.removeHighlights();

        setTimeout(() => {

            const showInputLinkBoxFinished = new CustomEvent('showInputLinkBoxFinished', {
                bubbles: true,
                cancelable: true
            });

            document.dispatchEvent(showInputLinkBoxFinished);
        }, 0);
    }

    highlightSelectedText() {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;

        const range = selection.getRangeAt(0);
        const rects = range.getClientRects();

        for (let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            const highlight = document.createElement('div');
            highlight.style.position = 'absolute';
            highlight.style.left = `${rect.left}px`;
            highlight.style.top = `${rect.top}px`;
            highlight.style.width = `${rect.width}px`;
            highlight.style.height = `${rect.height}px`;
            highlight.style.backgroundColor = '#c2c2c2';
            highlight.style.opacity = '0.3';
            document.body.appendChild(highlight);

            this.highlights.push(highlight);
        }

        selection.removeAllRanges();
    }

    removeHighlights() {
        this.highlights.forEach(highlight => {
            document.body.removeChild(highlight);
        });
        this.highlights = [];
    }

}