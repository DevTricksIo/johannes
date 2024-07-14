import IBlockOperationsService from "./IBlockOperationsService";
import IElementFactoryService from "../element-factory/IElementFactoryService";
import ElementFactoryService, { ELEMENT_FACTORY_TYPES } from "../element-factory/ElementFactoryService";

class BlockOperationsService implements IBlockOperationsService {

    private readonly _elementFactoryService: IElementFactoryService;
    private static _instance: BlockOperationsService;

    execCommand(command: string, value: string | null = null): boolean {

        if (command == BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK) {
            this.createDefaultBlock(null);
        }

        if (command == BLOCK_OPERATIONS.TURN_INTO) {

            if (!value) {
                throw new Error();
            }

            const element = BlockOperationsService.getDraggableElementFromSelection();

            this.formatBlock(element, value);
        }

        const selectionEvent = new CustomEvent('blockFormatted', {
            bubbles: true,
            cancelable: true
        });

        document.dispatchEvent(selectionEvent);

        return true;
    }

    queryCommandState(): boolean {
        throw new Error("Method not implemented.");
    }

    private constructor(elementFactoryService: IElementFactoryService) {

        if (BlockOperationsService._instance) {
            throw new Error("Use BlockOperationsService.getInstance() para obter a instância.");
        }

        this._elementFactoryService = elementFactoryService;
        BlockOperationsService._instance = this;
    }

    static getInstance(elementFactoryService: IElementFactoryService | null = null): BlockOperationsService {

        if (!this._instance) {
            this._instance = new BlockOperationsService(elementFactoryService || new ElementFactoryService());
        }

        return this._instance;
    }

    formatBlock(element: HTMLElement, contentType: string): void {

        let contentElement = element.querySelector('.swittable') as HTMLElement;
        let content = contentElement.innerText;

        let newContentBlock = this._elementFactoryService.create(contentType, content);

        element.replaceChild(newContentBlock, contentElement);

        const focusable = newContentBlock.closest('.focusable') || element.querySelector('.focusable');

        // focusOnTheEndOfTheText(focusable);
    }

    static getDraggableElementFromSelection(): HTMLElement {
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let element: Node | null = range.commonAncestorContainer;

            if (element.nodeType === Node.TEXT_NODE) {
                element = element.parentNode as HTMLElement;
            }

            while (element && !(element instanceof HTMLElement)) {
                element = element.parentNode as HTMLElement | null;
            }

            if (element) {
                const draggable = element.closest('.draggable-block') as HTMLElement;
                return draggable;
            }
        }

        // Retornar null se nenhuma seleção válida for encontrada ou nenhum elemento correspondente
        throw new Error();
    }

    // static getTagNameByCommandName(commandName: string) {
    //     switch (commandName) {
    //         case "turnIntoParagraph":
    //             return "p";
    //         case "turnIntoH1":
    //             return "h1";
    //         case "turnIntoH2":
    //             return "h2";
    //         case "turnIntoH3":
    //             return "h3";
    //         case "turnIntoH4":
    //             return "h4";
    //         case "turnIntoH5":
    //             return "h5";
    //         case "turnIntoH6":
    //             return "h6";

    //         default:
    //             throw Error("Error");
    //     }
    // }




















    createNewElement(event: Event) {

        const element = event.target as Element;

        const contentElement = element.closest('.johannes-content-element') as HTMLElement;

        if (contentElement && contentElement.classList.contains('list')) {
            this.createListItem(contentElement);
        } else {
            this.createDefaultBlock(contentElement);
        }
    }

    createListItem(element: HTMLElement): void {

        let newContentElement = null;

        let activeElement = document.activeElement;
        let contentElement = element.closest('.johannes-content-element') as HTMLElement;

        if (contentElement.classList.contains('checkbox-list')) {
            newContentElement = this._elementFactoryService.create("checkboxItem", "");
        } else if (contentElement.classList.contains('list')) {
            newContentElement = this._elementFactoryService.create("listItem", "");
        } else {
            // newContentElement = createNewDraggableParagraphElement();
        }

        // let parentBlock = null;

        // if (contentElement.classList.contains('list')) {

        //     parentBlock = contentElement;

        //     const textContent = activeElement.textContent.trim();

        //     if (textContent === '') {

        //         parentBlock = element.closest('.draggable-block');

        //         element.closest('.deletable').remove();

        //         newContentElement = createNewDraggableParagraphElement();
        //         parentBlock.insertAdjacentElement('afterend', newContentElement);

        //     } else {
        //         const activeElement = document.activeElement.closest('.list-item');
        //         activeElement.insertAdjacentElement('afterend', newContentElement);
        //     }

        // } else {
        //     parentBlock = element.closest('.draggable-block');

        //     if (parentBlock) {
        //         if (parentBlock.nextSibling) {
        //             parentBlock.parentNode.insertBefore(newContentElement, parentBlock.nextSibling);
        //         } else {
        //             parentBlock.parentNode.appendChild(newContentElement);
        //         }
        //     }
        // }

        // focusOnTheEndOfTheText(newContentElement);
    }


    createDefaultBlock(eventParagraph: HTMLElement | null): void {

        const newBlock = this._elementFactoryService.create(ELEMENT_FACTORY_TYPES.BLOCK_PARAGRAPH, "");

        if (eventParagraph && eventParagraph.closest('.draggable-block')) {
            const sibling = eventParagraph.closest('.draggable-block')!;
            sibling.insertAdjacentElement('afterend', newBlock);
        } else {
            document.querySelector("#johannesEditor .content")!.appendChild(newBlock);
        }

        const focusable = newBlock.querySelector('.johannes-content-element');
        // focusable.focus();

        // focusOnTheEndOfTheText(focusable);
    }

}

export const BLOCK_OPERATIONS = {
    TURN_INTO: "turnInto",
    CREATE_DEFAULT_BLOCK: "CreateDefaultBlock"
} as const;

export default BlockOperationsService;