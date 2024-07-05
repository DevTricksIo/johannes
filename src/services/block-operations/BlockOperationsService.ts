import IBlockOperationsService from "./IBlockOperationsService";
import IElementFactoryService from "../element-factory/IElementFactoryService";

class BlockOperationsService implements IBlockOperationsService {

    elementFactoryService: IElementFactoryService;

    constructor(elementFactoryService: IElementFactoryService) {
        this.elementFactoryService = elementFactoryService;
    }

    transformBlock(element: HTMLElement, contentType: string): void {

        let contentElement = element.querySelector('.swittable') as HTMLElement;
        let content = contentElement.innerText;

        let newContentBlock = this.elementFactoryService.create(contentType, content);

        element.replaceChild(newContentBlock, contentElement);

        const focusable = newContentBlock.closest('.focusable') || element.querySelector('.focusable');

        // focusOnTheEndOfTheText(focusable);
    }
}

export default BlockOperationsService;