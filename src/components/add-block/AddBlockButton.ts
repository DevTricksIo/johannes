import ICommand from "services/common/ICommand";
import BaseUIComponent from "../common/BaseUIComponent";
import SVGIcon from "../common/SVGIcon";
import BlockOperationsService, { BLOCK_OPERATIONS } from "../../services/block-operations/BlockOperationsService";

class AddBlockButton extends BaseUIComponent {

    display: string;
    private readonly _commandService: ICommand;

    constructor() {
        super({});

        this.display = "block";
        this._commandService = BlockOperationsService.getInstance();
        this.attachEvents();
    }

    init(): HTMLElement {
        const htmlElement = document.createElement("button");

        htmlElement.classList.add("add-block", "block-operation");

        const svg = new SVGIcon("icon-add-block", "24", "24");

        htmlElement.appendChild(svg.htmlElement);

        return htmlElement;
    }

    attachEvents(): void {
        this.htmlElement.addEventListener("click", () => {
            this._commandService.execCommand(BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK, "");
        })
    }
}

export default AddBlockButton;