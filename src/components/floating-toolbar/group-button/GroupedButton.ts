import { SVGIcon } from "../../common/SVGIcon";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { ICommand } from "../../../services/common/ICommand";
import { TextOperationService } from "@/services/text-operations/TextOperationService";

export class GroupedButton extends BaseUIComponent {

    private readonly commandService: ICommand;
    private readonly command: string;
    private readonly showUI: boolean;

    constructor(commandService: ICommand, command: string, title: string, svgUseHref: string) {

        super({
            title: title,
            svgUseHref: svgUseHref
        });

        this.commandService = commandService;
        this.command = command;
        this.showUI = command == TextOperationService.QUERY_TEXT_OPERATIONS.CREATE_LINK;
        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("button");

        htmlElement.role = "button";
        htmlElement.classList.add("entry", "button-reset", "text-formatting-operation", "option-hover");
        htmlElement.title = this.props.title;
        htmlElement.tabIndex = 1;

        new SVGIcon(this.props.svgUseHref, "1.5rem", "1.5rem").documentAppendTo(htmlElement);

        return htmlElement;
    }


    attachEvents(): void {

        this.htmlElement.addEventListener("click", (event) => {

            setTimeout(() => {
                const editableElement = this.getParentEditable();

                this.commandService.execCommand(this.command, this.showUI);

                setTimeout(() => {
                    editableElement?.normalize();
                }, 10);

            }, 10);
        });

        document.addEventListener('selectionchange', (event) => {

            setTimeout(() => {
                const selection = window.getSelection();

                if (!selection?.isCollapsed) {
                    if (this.commandService.queryCommandState(this.command)) {
                        this.htmlElement.style.color = "#2382e2";
                    } else {
                        this.htmlElement.style.color = "";
                    }
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