import BaseUIComponent from "../common/BaseUIComponent";
import SVGIcon from "../common/SVGIcon";
import { BLOCK_OPERATIONS } from "../../services/block-operations/BlockOperationsService";
import IBlockOperationsService from "../../services/block-operations/IBlockOperationsService";
import ServiceProvider from "../../services/service-provider/ServiceProvider";

class AddBlockButton extends BaseUIComponent {

    private readonly blockOperationsService: IBlockOperationsService;

    display: string;

    constructor() {
        super({});
        this.display = "block";
        this.blockOperationsService = ServiceProvider.getInstance().getInstanceOf("IBlockOperationsService");
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
            this.blockOperationsService.execCommand(BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK);
        })
    }
}

export default AddBlockButton;