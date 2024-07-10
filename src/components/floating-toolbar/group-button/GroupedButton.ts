import SVGIcon from "../../common/SVGIcon";
import BaseUIComponent from "../../common/BaseUIComponent";
import ITextOperationService from "../../../services/text-operations/ITextOperationService";

class GroupedButton extends BaseUIComponent {

    private readonly _textOperationService: ITextOperationService;

    display: string;
    commandId: string;

    constructor(textOperationService: ITextOperationService, title: string, commandId: string, svgUseHref: string) {

        super({
            title: title,
            svgUseHref: svgUseHref
        });

        this.display = "block";
        this.commandId = commandId;
        this._textOperationService = textOperationService;

        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("button");

        htmlElement.role = "button";
        htmlElement.classList.add("entry", "button-reset", "text-formatting-operation", "option-hover");
        htmlElement.title = this.props.title;
        htmlElement.tabIndex = 1;

        new SVGIcon(this.props.svgUseHref, "22", "22").documentAppendTo(htmlElement);

        return htmlElement;
    }


    attachEvents(): void {
        
        this.htmlElement.addEventListener("click", (event) => {

            const editableElement = this.getParentEditable();

            this._textOperationService.execCommand(this.commandId);

            setTimeout(() => {
                editableElement?.normalize();
            }, 10);
        });

        document.addEventListener('selectionchange', (event) => {

            setTimeout(() => {
                if (this._textOperationService.queryCommandState(this.commandId)) {
                    this.htmlElement.style.color = "#2382e2";
                } else {
                    this.htmlElement.style.color = "";
                }
            }, 10);
        });
    }

    getParentEditable() {

        let currentBlockRange = window.getSelection()!.getRangeAt(0);

        let commonAncestor = currentBlockRange.commonAncestorContainer;

        if (commonAncestor.nodeType === 3) {
            commonAncestor = commonAncestor.parentNode!;
        }

        const currentBlock = (commonAncestor as HTMLElement).closest('.editable');

        return currentBlock;
    }

}

export default GroupedButton;