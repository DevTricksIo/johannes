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

        this.htmlElement.addEventListener("keydown", async (event) => {

            if (event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            if (event.key === 'Enter') {
                event.preventDefault();
                this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK);
            } else if (event.key === 'Backspace') {
                const target = event.target as HTMLElement;

                if (target.classList.contains('johannes-content-element') && target.textContent?.trim() === '') {
                    this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_PREVIOUS);
                } else if (target.classList.contains('johannes-content-element') && target.textContent?.trim() !== '') {
                    //TODO: Replace the delete and focus by merge
                }

            } else if (event.key === 'Delete') {
                const target = event.target as HTMLElement;

                if (target.classList.contains('johannes-content-element') && target.textContent?.trim() === '') {
                    this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_NEXT);
                } else if (target.classList.contains('johannes-content-element') && target.textContent?.trim() !== '') {
                    //TODO: Replace the delete and focus by merge
                }
            } else if (event.key === 'ArrowRight' && Content.isCursorAtEnd(event.target as HTMLElement)) {
                this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_NEXT);
            } else if (event.key === 'ArrowLeft' && Content.isCursorAtStart(event.target as HTMLElement)) {
                this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_PREVIOUS);
            } else if (event.key === 'ArrowDown' && Content.isCursorOnLastLine()) {
                this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_NEXT);
            } else if (event.key === 'ArrowUp' && Content.isCursorOnFirstLine()) {
                this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_PREVIOUS);
            }
        });
    }



    static isCursorAtEnd(target: HTMLElement): boolean {
        const focusableParent = target.closest('.focusable');
        if (!focusableParent) return false;

        const selection = window.getSelection()!;
        if (!selection.rangeCount) return false;

        const range = selection.getRangeAt(0);
        let endNode: Node | null = range.endContainer;
        if (endNode.nodeType === Node.TEXT_NODE) {
            endNode = endNode.parentNode;
        }
        return range.collapsed && endNode === focusableParent && range.endOffset === (range.endContainer.textContent || '').length;
    }

    static isCursorAtStart(target: HTMLElement): boolean {
        const focusableParent = target.closest('.focusable');
        if (!focusableParent) return false;

        const selection = window.getSelection()!;
        if (!selection.rangeCount) return false;

        const range = selection.getRangeAt(0);

        let startNode: Node | null = range.startContainer;
        if (startNode.nodeType === Node.TEXT_NODE) {
            startNode = startNode.parentNode;
        }
        return range.collapsed && startNode === focusableParent && range.startOffset === 0;
    }

    static isAtFirstVisibleLine(element: HTMLElement) {
        const selection = window.getSelection()!;
        if (!selection.rangeCount) return false;
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        range.setStart(element, 0);
        const rangeTop = range.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;

        return rangeTop === elementTop;
    }

    static isAtLastVisibleLine(element: HTMLElement) {
        const selection = window.getSelection()!;
        if (!selection.rangeCount) return false;
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(false);
        range.setEnd(element, element.childNodes.length);
        const rangeBottom = range.getBoundingClientRect().bottom;
        const elementBottom = element.getBoundingClientRect().bottom;

        return rangeBottom === elementBottom;
    }


    static didCursorMove(event: KeyboardEvent): Promise<boolean> {
        const selection = window.getSelection()!;
        if (!selection.rangeCount) return Promise.resolve(false);

        const originalRange = selection.getRangeAt(0).cloneRange();
        const originalRect = originalRange.getBoundingClientRect();

        return new Promise<boolean>(resolve => {
            setTimeout(() => {
                const newRange = selection.getRangeAt(0).cloneRange();
                const newRect = newRange.getBoundingClientRect();

                const didMove = !(originalRect.top === newRect.top && originalRect.left === newRect.left);
                if (!didMove) {
                    event.preventDefault();
                }
                resolve(didMove);
            }, 0);
        });
    }



    static isCursorOnFirstLine(): boolean {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;
      
        const range = selection.getRangeAt(0);
      
        return range.startOffset === 0 && range.startContainer === range.commonAncestorContainer;
      }

    static isCursorOnLastLine(): boolean {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;
      
        const range = selection.getRangeAt(0);
      
        return range.endOffset === range.endContainer.textContent?.length && range.endContainer === range.commonAncestorContainer;
      }
}