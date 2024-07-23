import { IElementFactoryService } from "@/services/element-factory/IElementFactoryService";
import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { BaseUIComponent } from "../common/BaseUIComponent";
import { IBlockOperationsService } from "@/services/block-operations/IBlockOperationsService";
import { BlockOperationsService } from "@/services/block-operations/BlockOperationsService";

export class Content extends BaseUIComponent {

    blockOperationsService: IBlockOperationsService;

    constructor(
        elementFactoryService: IElementFactoryService,
        blockOperationsService: IBlockOperationsService) {

        super({
            elementFactoryService: elementFactoryService,
            blockOperationsService: blockOperationsService
        });

        this.blockOperationsService = blockOperationsService;

        this.attachEvent();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("content");

        if (window.editorConfig?.includeFirstParagraph || true) {

            const blockParagraph = this.props.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.BLOCK_PARAGRAPH);

            htmlElement.append(blockParagraph);
        }

        return htmlElement;
    }

    attachEvent(): void {

        this.htmlElement.addEventListener("keydown", (event) => {
            if (!event.ctrlKey && !event.shiftKey && !event.altKey && event.key === 'Backspace') {
                const target = event.target as HTMLElement;

                if (target.classList.contains('johannes-content-element') && target.textContent?.trim() === '') {
                    this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_PREVIOUS);
                } else if (target.classList.contains('johannes-content-element') && target.textContent?.trim() !== '') {
                    // alert("merge with previous");
                    //TODO: Replace the delete and focus by merge
                }

            } else if (!event.ctrlKey && !event.shiftKey && !event.altKey && event.key === 'Delete') {
                const target = event.target as HTMLElement;

                if (target.classList.contains('johannes-content-element') && target.textContent?.trim() === '') {
                    this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_NEXT);
                } else if (target.classList.contains('johannes-content-element') && target.textContent?.trim() !== '') {
                    // alert("merge with next");
                    //TODO: Replace the delete and focus by merge
                }
            }
        });

        




    }
}