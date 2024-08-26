import { BaseUIComponent } from "../common/BaseUIComponent";
import { SVGIcon } from "../common/SVGIcon";
import { IBlockOperationsService } from "../../services/block-operations/IBlockOperationsService";
import { DependencyContainer } from "@/core/DependencyContainer";
import { Commands } from "@/commands/Commands";

export class AddBlockButton extends BaseUIComponent {

    private readonly blockOperationsService: IBlockOperationsService;
    private readonly icon: SVGIcon;

    constructor(blockOperationsService: IBlockOperationsService, icon: SVGIcon) {

        super({
            icon: icon
        });

        this.blockOperationsService = blockOperationsService;
        this.icon = icon;
        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("button");
        htmlElement.title = "Add a new block";

        htmlElement.classList.add("add-block", "block-operation", "pointer");

        htmlElement.appendChild(this.props.icon.htmlElement);

        return htmlElement;
    }

    attachEvents(): void {

        this.htmlElement.addEventListener("click", () => {

            //TODO: Use command dispatcher
            this.blockOperationsService.execCommand(Commands.createDefaultBlock, false);
        });
    }

    static create(icon: SVGIcon): AddBlockButton {

        const blockOperationsService = DependencyContainer.Instance.resolve<IBlockOperationsService>("IBlockOperationsService");

        return new AddBlockButton(blockOperationsService, icon);
    }
}