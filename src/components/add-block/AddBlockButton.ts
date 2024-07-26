import { BaseUIComponent } from "../common/BaseUIComponent";
import { SVGIcon } from "../common/SVGIcon";
import { BlockOperationsService } from "../../services/block-operations/BlockOperationsService";
import { IBlockOperationsService } from "../../services/block-operations/IBlockOperationsService";

export class AddBlockButton extends BaseUIComponent {

    private readonly blockOperationsService: IBlockOperationsService;

    constructor(blockOperationsService: IBlockOperationsService) {

        super({});

        this.blockOperationsService = blockOperationsService;
        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("button");
        htmlElement.title = "Add a new block";

        htmlElement.classList.add("add-block", "block-operation");

        const svg = new SVGIcon("icon-add-block", "1.5rem", "1.5rem");

        htmlElement.appendChild(svg.htmlElement);

        return htmlElement;
    }

    attachEvents(): void {

        this.htmlElement.addEventListener("click", () => {
            this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK, false);
        });
    }
}