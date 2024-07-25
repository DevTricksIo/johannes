import { BlockOperationsService } from "@/services/block-operations/BlockOperationsService";
import { BaseUIComponent } from "../common/BaseUIComponent";
import { IBlockOperationsService } from "@/services/block-operations/IBlockOperationsService";

export class Title extends BaseUIComponent {

    blockOperationsService: IBlockOperationsService;

    constructor(blockOperationsService: IBlockOperationsService) {

        super({});
        this.blockOperationsService = blockOperationsService;
        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("title");

        const h1 = document.createElement("h1");
        h1.setAttribute("contentEditable", "true");
        h1.setAttribute("data-placeholder", "Untitled");

        if (window.editorConfig?.title) {
            h1.textContent = window.editorConfig?.title
        }

        htmlElement.appendChild(h1);

        return htmlElement;
    }

    attachEvents() {
        this.htmlElement.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                event.preventDefault();

                this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_FIRST, false);
            }
        });
    }
}