import IBlockOperationsService from "./IBlockOperationsService";
import IElementFactoryService from "../element-factory/IElementFactoryService";

class BlockOperationsService implements IBlockOperationsService {

    commandName: string;
    elementFactoryService: IElementFactoryService;

    execCommand(): boolean {

        const element = BlockOperationsService.getDraggableElementFromSelection();
        const tagName = BlockOperationsService.getTagNameByCommandName(this.commandName);

        this.formatBlock(element, tagName);

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

    constructor(commandName: string, elementFactoryService: IElementFactoryService) {

        this.commandName = commandName;
        this.elementFactoryService = elementFactoryService;
    }

    formatBlock(element: HTMLElement, contentType: string): void {

        let contentElement = element.querySelector('.swittable') as HTMLElement;
        let content = contentElement.innerText;

        let newContentBlock = this.elementFactoryService.create(contentType, content);

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

    static getTagNameByCommandName(commandName: string) {
        switch (commandName) {
            case "turnIntoParagraph":
                return "p";
            case "turnIntoH1":
                return "h1";
            case "turnIntoH2":
                return "h2";
            case "turnIntoH3":
                return "h3";
            case "turnIntoH4":
                return "h4";
            case "turnIntoH5":
                return "h5";
            case "turnIntoH6":
                return "h6";

            default:
                throw Error("Error");
        }
    }

}

export const BlockOperations = {
    TurnIntoParagraph: "turnIntoParagraph",
    TurnIntoH1: "turnIntoH1",
    TurnIntoH2: "turnIntoH2",
    TurnIntoH3: "turnIntoH3",
    TurnIntoH4: "turnIntoH4",
    TurnIntoH5: "turnIntoH5",
    TurnIntoH6: "turnIntoH6",
} as const;

export default BlockOperationsService;