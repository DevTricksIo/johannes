import { IBlockOperationsService } from "./IBlockOperationsService";
import { IElementFactoryService } from "../element-factory/IElementFactoryService";
import { ElementFactoryService } from "../element-factory/ElementFactoryService";

export class BlockOperationsService implements IBlockOperationsService {

    private readonly elementFactoryService: IElementFactoryService;
    private static instance: BlockOperationsService;

    static BLOCK_OPERATIONS = {
        TURN_INTO: "turnInto",
        CREATE_DEFAULT_BLOCK: "CreateDefaultBlock",
        DELETE_FOCUS_ON_PREVIOUS: "DeleteAndFocusOnPrevious",
        DELETE_FOCUS_ON_NEXT: "DeleteAndFocusOnNext",
        FOCUS_ON_FIRST: "FocusOnFirst",
        FOCUS_ON_PREVIOUS: "FocusOnPrevious",
        FOCUS_ON_NEXT: "FocusOnNext",
        DELETE: "delete",
        DUPLICATE: "duplicate"
    };

    private constructor(elementFactoryService: IElementFactoryService) {

        if (BlockOperationsService.instance) {
            throw new Error("Use BlockOperationsService.getInstance() to get instance.");
        }

        this.elementFactoryService = elementFactoryService;

        BlockOperationsService.instance = this;
    }

    execCommand(command: string, value: string | null = null): boolean {

        if (command == BlockOperationsService.BLOCK_OPERATIONS.DELETE) {

            const currentActiveElement = this.getCurrentEEEE();

            if(currentActiveElement){
                this.deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentActiveElement);
                return true;
            }

            return false;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.DUPLICATE) {

            alert("duplicate");

            return true;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK) {
            const element = document.activeElement || null;

            this.createDefaultBlock(element);
            return true;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_FIRST) {

            const element = document.querySelector(".focusable");

            if (element) {
                (element as HTMLElement).focus();
                return true;
            }

            return false;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_PREVIOUS) {
            this.deleteAndFocusOnPrevious();
            return true;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_NEXT) {
            this.deleteAndFocusOnNext();
            return true;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_PREVIOUS) {
            const element = document.activeElement;

            if (element) {
                this.focusOnPrevious(element);
                return true;
            }
            return false;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_NEXT) {
            const element = document.activeElement;

            if (element) {
                this.focusOnNext(element);
                return true;
            }
            return false;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.TURN_INTO) {

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

    static getInstance(elementFactoryService: IElementFactoryService | null = null): BlockOperationsService {

        if (!this.instance) {
            this.instance = new BlockOperationsService(elementFactoryService || ElementFactoryService.getInstance());
        }

        return this.instance;
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
                const draggable = element.closest('.block') as HTMLElement;
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

















    // applySelectedBlockType(draggableBlock: HTMLElement, newBlockType: string) {

    //     // const draggableBlock = realFocusedElement.closest('.block');
    //     // const newBlockType = event.target.closest('.option') ?
    //     //     event.target.closest('.option').getAttribute('data-type') :
    //     //     currentFakeFocusedOption.getAttribute('data-type');

    //     const lastSlashIndex = realFocusedElement.innerText.lastIndexOf('/');
    //     realFocusedElement.innerText = lastSlashIndex !== -1 ? realFocusedElement.innerText.slice(0, lastSlashIndex) : realFocusedElement.innerText;


    //     transformBlock(draggableBlock, newBlockType);

    //     hideAndClearBlockOptions();
    //     hideAllDependentBox();
    //     hidefloatingToolbar();
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
            newContentElement = this.elementFactoryService.create("checkboxItem", "");
        } else if (contentElement.classList.contains('list')) {
            newContentElement = this.elementFactoryService.create("listItem", "");
        } else {
            // newContentElement = createNewDraggableParagraphElement();
        }

        // let parentBlock = null;

        // if (contentElement.classList.contains('list')) {

        //     parentBlock = contentElement;

        //     const textContent = activeElement.textContent.trim();

        //     if (textContent === '') {

        //         parentBlock = element.closest('.block');

        //         element.closest('.deletable').remove();

        //         newContentElement = createNewDraggableParagraphElement();
        //         parentBlock.insertAdjacentElement('afterend', newContentElement);

        //     } else {
        //         const activeElement = document.activeElement.closest('.list-item');
        //         activeElement.insertAdjacentElement('afterend', newContentElement);
        //     }

        // } else {
        //     parentBlock = element.closest('.block');

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


    createDefaultBlock(eventParagraph: Element | null): void {

        const newBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.BLOCK_PARAGRAPH, "");

        if (eventParagraph && eventParagraph.closest('.block')) {
            const sibling = eventParagraph.closest('.block')!;
            sibling.insertAdjacentElement('afterend', newBlock);
        } else {
            document.querySelector("#johannesEditor .content")!.appendChild(newBlock);
        }

        const focusable = newBlock.querySelector('.johannes-content-element') as HTMLElement;
        focusable.focus();

        // focusOnTheEndOfTheText(focusable);
    }


    private deleteAndFocusOnPrevious(): void {

        const currentActiveElement = document.activeElement!;

        this.focusOnPrevious(currentActiveElement);
        this.deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentActiveElement);
    }

    private deleteAndFocusOnNext() {

        const currentActiveElement = document.activeElement;

        if (!currentActiveElement) {
            return;
        }

        this.focusOnNext(currentActiveElement);
        this.deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentActiveElement);
    }

    private focusOnPrevious(actualElement: Element, position: number | null = null): void {

        let tag = actualElement.tagName.toUpperCase();
        let focusedElement = null;

        if (tag === 'LI') {
            let previousElement = actualElement.previousElementSibling;

            if (!previousElement) {
                return;
            }

            if (previousElement && previousElement.classList.contains('focusable')) {
                focusedElement = previousElement as HTMLElement;
                if (position) {
                    this.applyCursorXEndPosition(focusedElement, position);
                } else {
                    this.focusOnTheEndOfTheText(focusedElement);
                }
                // return focusedElement;
                return;
            }
        }

        if ((actualElement.parentNode as HTMLElement).tagName.toUpperCase() === 'LI' /* focusable SPAN inside LI*/) {

            let previousElement = actualElement.closest('li')?.previousElementSibling?.querySelector('.focusable');

            if (previousElement && previousElement.classList.contains('focusable')) {
                focusedElement = previousElement as HTMLElement;
                if (position) {
                    this.applyCursorXEndPosition(focusedElement, position);
                } else {
                    this.focusOnTheEndOfTheText(focusedElement);
                }
                // return focusedElement;
                return;
            }
        }

        let parent = actualElement.closest('.block');

        if (!parent) {
            return;
        }
        let sibling = parent.previousElementSibling;

        while (sibling) {
            let focusableCandidates = sibling.querySelectorAll('.focusable');
            if (focusableCandidates.length > 0) {
                focusedElement = focusableCandidates[focusableCandidates.length - 1] as HTMLElement;
                if (position) {
                    this.applyCursorXEndPosition(focusedElement, position);
                } else {
                    this.focusOnTheEndOfTheText(focusedElement);
                }
                // return focusedElement;
                return;
            }

            sibling = sibling.previousElementSibling;
        }

        // return focusedElement;
        return;
    }

    private focusOnNext(actualElement: Element, position: number | null = null) {
        let tag = actualElement.tagName.toUpperCase();
        let focusedElement = null;

        if (tag === 'LI') {
            let nextElement = actualElement.nextElementSibling;

            if (nextElement && nextElement.classList.contains('focusable')) {
                focusedElement = nextElement as HTMLElement;

                if (position) {
                    this.applyCursorXStartPosition(focusedElement, position);
                } else {
                    this.focusOnTheStartOfTheText(focusedElement);
                }
                return focusedElement;
            }
        }

        if ((actualElement.parentNode as HTMLElement).tagName.toUpperCase() === 'LI' /* focusable SPAN inside LI*/) {
            let nextElement = actualElement.closest('li')?.nextElementSibling?.querySelector('.focusable');

            if (nextElement && nextElement.classList.contains('focusable')) {
                focusedElement = nextElement as HTMLElement;
                if (position) {
                    this.applyCursorXStartPosition(focusedElement, position);
                } else {
                    this.focusOnTheStartOfTheText(focusedElement);
                }
                return focusedElement;
            }
        }

        let parent = actualElement.closest('.block');

        if (!parent) {
            return;
        }

        let sibling = parent.nextElementSibling;

        while (sibling) {
            let focusableCandidates = sibling.querySelectorAll('.focusable');
            if (focusableCandidates.length > 0) {
                focusedElement = focusableCandidates[0] as HTMLElement;
                if (position) {
                    this.applyCursorXStartPosition(focusedElement, position);
                } else {
                    this.focusOnTheStartOfTheText(focusedElement);
                }
                return focusedElement;
            }

            sibling = sibling.nextElementSibling;
        }

        return focusedElement;
    }



    deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentElement: Element) {

        const parentBlock = currentElement.closest('.block');
        const actual = currentElement.closest('.deletable');

        actual?.remove();

        if (parentBlock && parentBlock.querySelectorAll('.editable').length == 0) {
            parentBlock.remove();
        }
    }




    applyCursorXEndPosition(element: HTMLElement, xPosition: number) {

        const selection = window.getSelection()!;
        const range = document.createRange();

        let currentNode = element.lastChild;
        let result = null;

        while (currentNode) {
            if (currentNode.nodeType === Node.TEXT_NODE) {
                result = this.adjustCursorOffset(currentNode, xPosition);
                break;
            } else if (currentNode.nodeName.toUpperCase() === 'BR') {
                currentNode = currentNode.previousSibling;
                continue;
            }
            currentNode = currentNode.previousSibling;
        }

        if (result && result.closestNode) {
            range.setStart(result.closestNode, result.closestOffset);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            element.focus();
        } else {
            range.selectNodeContents(element);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            element.focus();
        }
    }

    applyCursorXStartPosition(element: HTMLElement, xPosition: number) {
        const selection = window.getSelection()!;
        const range = document.createRange();

        let currentNode = element.firstChild;
        let result = null;

        while (currentNode) {
            if (currentNode.nodeType === Node.TEXT_NODE) {
                result = this.adjustCursorOffset(currentNode, xPosition);
                break;
            }
            currentNode = currentNode.nextSibling;
        }

        if (result && result.closestNode) {
            range.setStart(result.closestNode, result.closestOffset);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            element.focus();
        } else {
            range.selectNodeContents(element);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            element.focus();
        }
    }

    adjustCursorOffset(node: Node, xPosition: number) {
        let range = document.createRange();
        let closestNode = node;
        let closestOffset = 0;
        let closestDiff = Infinity;

        for (let i = 0; i < node.textContent!.length; i++) {
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            const rect = range.getBoundingClientRect();
            const leftDiff = Math.abs(rect.left - xPosition);
            const rightDiff = Math.abs(rect.right - xPosition);

            if (leftDiff < closestDiff || rightDiff < closestDiff) {
                closestDiff = Math.min(leftDiff, rightDiff);
                closestOffset = i + (rightDiff < leftDiff ? 1 : 0);
            }
        }

        if (xPosition > range.getBoundingClientRect().right) {
            closestOffset = node.textContent!.length;
        }

        return { closestNode, closestOffset };
    }


    focusOnTheEndOfTheText(contentBlock: HTMLElement) {

        setTimeout(() => {

            const range = document.createRange();
            const selection = window.getSelection()!;

            range.selectNodeContents(contentBlock);

            let lastChild = contentBlock;

            while (lastChild.lastChild && lastChild.lastChild.nodeType === Node.ELEMENT_NODE) {
                lastChild = lastChild.lastChild as HTMLElement;
            }
            if (lastChild.lastChild) {
                lastChild = lastChild.lastChild as HTMLElement;
            }

            range.setEnd(lastChild, lastChild.textContent!.length);
            range.collapse(false);

            selection.removeAllRanges();
            selection.addRange(range);

            contentBlock.focus();
        }, 10);
    }

    focusOnTheStartOfTheText(contentBlock: HTMLElement) {

        setTimeout(() => {
            const range = document.createRange();
            const selection = window.getSelection()!;

            range.selectNodeContents(contentBlock);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);

            contentBlock.focus();
        }, 10);
    }



    getCurrentEEEE(): Element | null {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return null;

        const range = selection.getRangeAt(0);
        let container: Node | null = range.commonAncestorContainer;

        if (container.nodeType === Node.TEXT_NODE) {
            container = container.parentNode;
        }

        const focusableParent = (container as HTMLElement).closest(".focusable");

        return focusableParent;
    }

}