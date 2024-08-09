import { IBlockOperationsService } from "./IBlockOperationsService";
import { IElementFactoryService } from "../element-factory/IElementFactoryService";
import { ElementFactoryService } from "../element-factory/ElementFactoryService";
import { ContentTypes } from "@/common/ContentTypes";
import { DOMUtils } from "@/utilities/DOMUtils";
import { CustomEvents } from "@/common/CustomEvents";
import { DependencyContainer } from "@/core/DependencyContainer";
import { IFocusStack } from "@/core/IFocusStack";
import { IMemento } from "@/core/IMemento";
import { Utils } from "@/utilities/Utils";

export class BlockOperationsService implements IBlockOperationsService {

    private static instance: BlockOperationsService;

    private elementFactoryService: IElementFactoryService;
    private memento: IMemento;
    private focusStack: IFocusStack;

    static BLOCK_OPERATIONS = {
        TURN_INTO: "turnInto",
        CREATE_DEFAULT_BLOCK: "CreateDefaultBlock",
        DELETE_FOCUS_ON_PREVIOUS: "DeleteAndFocusOnPrevious",
        DELETE_FOCUS_ON_NEXT: "DeleteAndFocusOnNext",
        FOCUS_ON_FIRST: "FocusOnFirst",
        FOCUS_ON_PREVIOUS: "FocusOnPrevious",
        FOCUS_ON_NEXT: "FocusOnNext",
        DELETE: "delete",
        DUPLICATE: "duplicate",
        COPY: "copy",
        PASTE: "pates",
        CUT: "cut",
        REMOVE_FORMAT: "removeFormat",
        TRANSFORM_BLOCK: "transformBlock"
    };

    private constructor(
        elementFactoryService: IElementFactoryService,
        focusStack: IFocusStack,
        memento: IMemento) {

        if (BlockOperationsService.instance) {
            throw new Error("Use BlockOperationsService.getInstance() to get instance.");
        }

        this.elementFactoryService = elementFactoryService;
        this.focusStack = focusStack;
        this.memento = memento;

        BlockOperationsService.instance = this;
    }

    execCommand(command: string, showUI: boolean, value: string | null = null): boolean {

        if (command == BlockOperationsService.BLOCK_OPERATIONS.COPY) {

            if (document.getSelection && navigator.clipboard && navigator.clipboard.writeText) {
                const selection = document.getSelection();

                if (selection && selection.toString().length > 0) {
                    const selectedText = selection.toString();

                    navigator.clipboard.writeText(selectedText).then(() => {

                        const copiedEvent = new CustomEvent('copiedText', {
                            bubbles: true,
                            cancelable: true
                        });

                        document.dispatchEvent(copiedEvent);

                        return true;

                    }).catch((err: any) => {
                        console.error('Error when copy text', err);
                    });
                }
            }

            return false;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.CUT) {

            if (document.getSelection && navigator.clipboard && navigator.clipboard.writeText) {
                const selection = document.getSelection();

                if (selection && selection.toString().length > 0) {
                    const selectedText = selection.toString();

                    selection.deleteFromDocument();

                    // const hideEvent = new CustomEvent( 'requestHideFloatingToolbar', {
                    //     bubbles: true,
                    //     cancelable: true
                    // });

                    // document.dispatchEvent(hideEvent);

                    navigator.clipboard.writeText(selectedText).then(() => {

                        return true;

                    }).catch((err: any) => {
                        console.error('Error when cut text: ', err);
                    });
                }
            }

            return false;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.PASTE) {
            if (navigator.clipboard && navigator.clipboard.readText) {
                navigator.clipboard.readText().then((pastedText: string) => {
                    const selection = document.getSelection();

                    if (selection && selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        range.deleteContents();
                        range.insertNode(document.createTextNode(pastedText));

                        const selectionEvent = new CustomEvent('requestUpdateFloatingToolbar', {
                            bubbles: true,
                            cancelable: true
                        });

                        document.dispatchEvent(selectionEvent);

                        return true;
                    } else {
                        console.error('No text selected or clipboard empty.');
                    }
                }).catch((err: any) => {
                    console.error('Error when pasting text: ', err);
                });
            }

            return false;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK) {

            const block = this.getCurrentSelectedBlock() as HTMLElement;
            if (block && value) {
                this.transformBlock(value);
            }
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.REMOVE_FORMAT) {
            return document.execCommand(BlockOperationsService.BLOCK_OPERATIONS.REMOVE_FORMAT, false);
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.DELETE) {

            this.deleteAndFocusOnNext();

            const hideEvent = new CustomEvent(CustomEvents.blockDeleted, {
                bubbles: true,
                cancelable: true
            });

            document.dispatchEvent(hideEvent);

            return true;
        }

        if (command == BlockOperationsService.BLOCK_OPERATIONS.DUPLICATE) {

            this.duplicateSelectedBlock();

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

        // if (command == BlockOperationsService.BLOCK_OPERATIONS.TURN_INTO) {

        //     if (!value) {
        //         throw new Error();
        //     }

        //     const element = BlockOperationsService.getDraggableElementFromSelection();

        //     this.formatBlock(element, value);
        // }

        // const selectionEvent = new CustomEvent('requestHideFloatingToolbar', {
        //     bubbles: true,
        //     cancelable: true
        // });

        // document.dispatchEvent(selectionEvent);

        return true;
    }

    queryCommandState(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    static getInstance(): BlockOperationsService {

        const elementFactoryService = DependencyContainer.Instance.resolve<IElementFactoryService>("IElementFactoryService");
        const focusStack = DependencyContainer.Instance.resolve<IFocusStack>("IFocusStack");
        const memento = DependencyContainer.Instance.resolve<IMemento>("IMemento");

        if (!this.instance) {
            this.instance = new BlockOperationsService(elementFactoryService, focusStack, memento);
        }

        return this.instance;
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

    // formatBlock(element: HTMLElement, contentType: string)
    transformBlock(type: string, element?: HTMLElement | null) {

        let blockElement: Element | null;

        if (element) {
            blockElement = element.closest(".block");
        } else {
            blockElement = this.focusStack.peek()?.closest(".block") || null;
        }

        let contentElement = blockElement!.querySelector('.swittable') as HTMLElement;

        this.focusStack.peek()?.focus();

        DOMUtils.removeFilterText();

        this.memento.saveState();

        let content = contentElement?.innerText;


        let newContentBlock;

        switch (type) {
            case ElementFactoryService.ELEMENT_TYPES.PARAGRAPH:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.PARAGRAPH);
                    newContentBlock.innerText = content;
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.HEADER_1:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.HEADER_1);
                    newContentBlock.innerText = content;
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.HEADER_2:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.HEADER_2);
                    newContentBlock.innerText = content;
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.HEADER_3:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.HEADER_3);
                    newContentBlock.innerText = content;
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.HEADER_4:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.HEADER_4);
                    newContentBlock.innerText = content;
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.HEADER_5:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.HEADER_5);
                    newContentBlock.innerText = content;
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.HEADER_6:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.HEADER_6);
                    newContentBlock.innerText = content;
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.CODE:
                newContentBlock = document.createElement('pre');
                const code = document.createElement('code');
                code.innerText = content;
                newContentBlock.appendChild(code);
                break;
            case 'image':
                newContentBlock = document.createElement('img');
                newContentBlock.src = content;
                newContentBlock.alt = "Descriptive text";
                break;
            case ElementFactoryService.ELEMENT_TYPES.QUOTE:
                {
                    // newContentBlock = factory.createNewQuoteElement(content);

                    break;
                }

            case ElementFactoryService.ELEMENT_TYPES.BULLETED_LIST:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.BULLETED_LIST, content);

                    break;
                }

            case ElementFactoryService.ELEMENT_TYPES.NUMBERED_LIST:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.NUMBERED_LIST, content);

                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.CHECK_LIST:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.CHECK_LIST, content);

                    break;
                }

            case 'separator':
                {
                    // newContentBlock = factory.createNewSeparatorElement();
                    break;
                }
            case ElementFactoryService.ELEMENT_TYPES.TABLE:
                {
                    newContentBlock = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.TABLE, ",,");
                    break;
                }

            default:
                console.error('Unsupported type');
                return;
        }

        if (!newContentBlock) {
            return;
        }

        blockElement!.replaceChild(newContentBlock, contentElement);

        const focusable = (newContentBlock.closest('.focusable') || blockElement!.querySelector('.focusable')) as HTMLElement;
        if (focusable) {
            focusable.focus();
            DOMUtils.placeCursorAtEndOfEditableElement(focusable);
        }



        //'requestHideFloatingToolbar'
        // const selectionEvent = new CustomEvent(CustomEvents.blockTypeChanged, {
        //     bubbles: true,
        //     cancelable: true
        // });

        // document.dispatchEvent(selectionEvent);
    }

    //NOW THE formatBlock AND transformBlock IS THE SAME. formatBlock IS DEPRECETED USE transformBlock INSTED
    // formatBlock(element: HTMLElement, contentType: string): void {

    //     let contentElement = element.querySelector('.swittable') as HTMLElement;
    //     let content = contentElement.innerText;

    //     let newContentBlock = this.elementFactoryService.create(contentType, content);

    //     element.replaceChild(newContentBlock, contentElement);

    //     const focusable = newContentBlock.closest('.focusable') || element.querySelector('.focusable');

    //     // focusOnTheEndOfTheText(focusable);
    // }



    createNewElement(event: Event) {

        this.memento.saveState();

        const element = event.target as Element;

        const contentElement = element.closest('.johannes-content-element') as HTMLElement;

        if (contentElement && contentElement.classList.contains('list')) {
            this.createListItem(contentElement);
        } else {
            this.createDefaultBlock(contentElement);
        }
    }

    createListItem(element: HTMLElement): void {

        this.memento.saveState();

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

    /**
    * Creates a new content element (paragraph or list item) based on the content type of the active element and splits the content accordingly.
    * This function is triggered by pressing 'Enter' in an editable content area, facilitating dynamic content creation and organization
    * within the document. It supports different content types including checklists, bulleted lists, numbered lists, and general text blocks.
    *
    * @returns {boolean} Always returns true to indicate successful execution, regardless of the path taken.
    *
    * @example
    * // Typically called within an event handler for keypress events
    * document.addEventListener('keypress', (event) => {
    *     if (event.key === 'Enter') {
    *         createNewElementAndSplitContent();
    *     }
    * });
    *
    * @description
    * The function operates under several conditions based on the content type:
    * - For list items (checklist, bulleted, and numbered):
    *   1. Finds the closest list item ancestor of the active element.
    *   2. If the list item contains text, it clones this item and splits the content between the original and the clone.
    *   3. If the list item is empty and is the only item, it removes the entire block after creating a new paragraph.
    * - For other blocks (like paragraphs):
    *   1. Clones the current block and rearranges content between the original and the new clone.
    *   2. Sets the focus to the start of the new element to continue editing.
    *
    * This method ensures that the document structure remains coherent while providing a seamless user experience in text editing environments.
    */
    createNewElementAndSplitContent(): boolean {

        this.memento.saveState();

        const contentType = DOMUtils.getContentTypeFromActiveElement();

        if (contentType == ContentTypes.Table) {
            return false;
        } else if (
            contentType == ContentTypes.CheckList ||
            contentType == ContentTypes.BulletedList ||
            contentType == ContentTypes.NumberedList) {

            const currentItem = DOMUtils.findClosestAncestorOfActiveElementByClass("list-item");

            if (currentItem && DOMUtils.hasTextContent(currentItem)) {
                const clone = DOMUtils.cloneAndInsertAfter(currentItem);
                if (clone) {
                    const contentCurrent = currentItem.querySelector(".focusable") as Node;
                    const contentClone = clone.querySelector(".focusable") as Node;
                    DOMUtils.rearrangeContentAfterSplit(contentCurrent, contentClone);
                }
            } else if (currentItem) {

                const parentBlock = currentItem.closest(".block");

                if (parentBlock) {
                    const counter = parentBlock.querySelectorAll(".list-item").length;
                    const newParagraph = ElementFactoryService.blockParagraph();

                    DOMUtils.insertAfter(newParagraph, parentBlock);

                    currentItem.remove();
                    if (counter == 1) {
                        parentBlock.remove();
                    }

                    const focusable = (newParagraph as HTMLElement).querySelector("p") as HTMLElement;
                    DOMUtils.placeCursorAtStartOfEditableElement(focusable as HTMLElement);
                }
            }

        } else {
            const currentBlock = DOMUtils.findClosestAncestorOfActiveElementByClass("block");

            if (currentBlock) {
                const clonedBlock = DOMUtils.cloneAndInsertAfter(currentBlock);

                if (clonedBlock) {
                    const contentCurrent = currentBlock.querySelector(".focusable") as Node;
                    const contentClone = clonedBlock.querySelector(".focusable") as Node;
                    DOMUtils.rearrangeContentAfterSplit(contentCurrent, contentClone);

                    if (!DOMUtils.hasTextContent(clonedBlock!)) {
                        this.transformBlock(ContentTypes.Paragraph, clonedBlock);
                    }
                }

                const focusable = (clonedBlock as HTMLElement).querySelector(".focusable") as HTMLElement;

                DOMUtils.placeCursorAtStartOfEditableElement(focusable as HTMLElement);
            }
        }

        return true;
    }

















    // splitContentAtCursor(): void {
    //     const selection = window.getSelection();
    //     if (!selection || selection.rangeCount === 0) return;

    //     const range = selection.getRangeAt(0);
    //     const container = range.startContainer;

    //     // Criando range para o conteúdo antes do cursor
    //     const rangeBefore = document.createRange();
    //     rangeBefore.selectNodeContents(container);
    //     rangeBefore.setEnd(range.startContainer, range.startOffset);

    //     // Criando range para o conteúdo depois do cursor
    //     const rangeAfter = document.createRange();
    //     rangeAfter.selectNodeContents(container);
    //     rangeAfter.setStart(range.endContainer, range.endOffset);

    //     // Exemplo: Isolando o texto de cada parte
    //     const textBefore = rangeBefore.toString();
    //     const textAfter = rangeAfter.toString();

    //     console.log('Texto antes do cursor:', textBefore);
    //     console.log('Texto depois do cursor:', textAfter);

    //     // Aqui você pode manipular o DOM como necessário, por exemplo:
    //     // inserir novos elementos, modificar o texto, etc.
    // }


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

        let currentActiveElement = this.getCurrentSelectedBlock() || DOMUtils.getCurrentActiveBlock();

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
                    DOMUtils.placeCursorAtEndOfEditableElement(focusedElement);
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
                    DOMUtils.placeCursorAtEndOfEditableElement(focusedElement);
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
                    DOMUtils.placeCursorAtEndOfEditableElement(focusedElement);
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
                    DOMUtils.placeCursorAtStartOfEditableElement(focusedElement);
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
                    DOMUtils.placeCursorAtStartOfEditableElement(focusedElement);
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
                    DOMUtils.placeCursorAtStartOfEditableElement(focusedElement);
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


    // focusOnTheEndOfTheText(contentBlock: HTMLElement) {

    //     requestAnimationFrame(() => {

    //         const range = document.createRange();
    //         const selection = window.getSelection()!;

    //         range.selectNodeContents(contentBlock);

    //         let lastChild = contentBlock;

    //         while (lastChild.lastChild && lastChild.lastChild.nodeType === Node.ELEMENT_NODE) {
    //             lastChild = lastChild.lastChild as HTMLElement;
    //         }
    //         if (lastChild.lastChild) {
    //             lastChild = lastChild.lastChild as HTMLElement;
    //         }

    //         range.setEnd(lastChild, lastChild.textContent!.length);
    //         range.collapse(false);

    //         selection.removeAllRanges();
    //         selection.addRange(range);

    //         contentBlock.focus();
    //     });
    // }

    // focusOnTheStartOfTheText(contentBlock: HTMLElement) {

    //     setTimeout(() => {
    //         const range = document.createRange();
    //         const selection = window.getSelection()!;

    //         range.selectNodeContents(contentBlock);
    //         range.collapse(true);
    //         selection.removeAllRanges();
    //         selection.addRange(range);

    //         contentBlock.focus();
    //     }, 10);
    // }




    getCurrentSelectedFocusable(): Element | null {
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

    getCurrentSelectedBlock(): Element | null {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return null;

        const range = selection.getRangeAt(0);
        let container: Node | null = range.commonAncestorContainer;

        if (container.nodeType === Node.TEXT_NODE) {
            container = container.parentNode;
        }

        const focusableParent = (container as HTMLElement).closest(".block");

        return focusableParent;
    }


    duplicateSelectedBlock(): Node | null {

        let element = this.getCurrentSelectedBlock() || DOMUtils.getCurrentActiveBlock();

        if (!element || !element.parentNode) {
            console.error('O elemento fornecido é inválido ou não está no DOM.');
            return null;
        }

        const clone = element.cloneNode(true);

        const nextElement = element.nextSibling;

        element.parentNode.insertBefore(clone, nextElement);

        return clone;
    }

}