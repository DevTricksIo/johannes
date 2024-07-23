import { BaseUIComponent } from "../common/BaseUIComponent";
import { AddBlockButton } from "./AddBlockButton";
import { IBlockOperationsService } from "@/services/block-operations/IBlockOperationsService";

export class AddBlock extends BaseUIComponent {

    constructor(blockOperationService: IBlockOperationsService) {

        super({
            blockOperationService: blockOperationService
        });
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");

        htmlElement.classList.add("add-block-wrapper");

        const button = new AddBlockButton(this.props.blockOperationService);

        htmlElement.appendChild(button.htmlElement);

        return htmlElement;
    }
}