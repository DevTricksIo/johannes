import { SVGIcon } from "../../common/SVGIcon";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { ICommand } from "../../../services/common/ICommand";
import { TextOperationService } from "@/services/text-operations/TextOperationService";

export class GroupedButton extends BaseUIComponent {

    private readonly commandService: ICommand;
    private readonly command: string;
    private readonly showUI: boolean;
    private readonly icon: SVGIcon;

    constructor(commandService: ICommand, command: string, title: string, svgIconId: string) {

        const icon = new SVGIcon(svgIconId, "1.25rem", "1.25rem");

        super({
            title: title,
            icon: icon
        });

        this.commandService = commandService;
        this.command = command;
        this.showUI = command == TextOperationService.QUERY_TEXT_OPERATIONS.CREATE_LINK;
        this.icon = icon;
        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("button");

        htmlElement.role = "button";
        htmlElement.classList.add("entry", "button-reset", "text-formatting-operation", "option-hover");
        htmlElement.title = this.props.title;
        htmlElement.tabIndex = 1;

        htmlElement.appendChild(this.props.icon.htmlElement);

        return htmlElement;
    }


    attachEvents(): void {

        this.htmlElement.addEventListener("click", (event) => {

            const editableElement = this.getParentEditable();

            this.commandService.execCommand(this.command, this.showUI);
            this.changeIconColor();

            setTimeout(() => {
                editableElement?.normalize();
            }, 10);
        });

        document.addEventListener('selectionchange', (event) => {
            const selection = window.getSelection();

            if (!selection?.isCollapsed) {
                this.changeIconColor();
            }
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

    changeIconColor(): void {
        if (this.commandService.queryCommandState(this.command)) {
            this.icon.changeColor("#2382e2");
        } else {
            this.icon.changeColor("rgba(55, 53, 47, 0.85)");
        }
    }
}