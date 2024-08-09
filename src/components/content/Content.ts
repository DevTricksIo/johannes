import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { BaseUIComponent } from "../common/BaseUIComponent";
import { CustomEvents } from "@/common/CustomEvents";
import { Commands } from "@/commands/Commands";
import { ICommandEventDetail } from "@/commands/ICommandEventDetail";
import { DependencyContainer } from "@/core/DependencyContainer";
import { IQuickMenu } from "../quick-menu/IQuickMenu";
import { IShortcutListeners } from "@/core/IShortcutListeners";
import { ITableListeners } from "@/core/listeners/ITableListeners";
import { ITableContextFloatingToolbar } from "../floating-toolbar/ITableContextFloatingToolbar";

export class Content extends BaseUIComponent {
    constructor() {

        super({});

        this.attachEvent();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("content");

        if (window.editorConfig?.includeFirstParagraph || true) {
            htmlElement.append(ElementFactoryService.blockParagraph());
        }

        return htmlElement;
    }

    /**
    * Clears text selection when initiating a drag from elements with the `.drag-handler` class.
    * This function attaches a `mousedown` event listener to the entire document. When a mousedown
    * event occurs on an element that is a child of a `.drag-handler` or on the `.drag-handler` itself,
    * it checks if the target or its parent is a designated drag handler. If true, it clears any current text selections.
    * This prevents text from being accidentally selected during drag-and-drop interactions, enhancing UX in draggable interfaces.
    * 
    * @function clearSelectionOnDrag
    */
    clearSelectionOnDrag() {
        document.addEventListener("mousedown", (event) => {
            const element = event.target as HTMLElement;
            let parent: Element | null;

            if (element) {
                if (element.nodeType == Node.TEXT_NODE) {
                    parent = element.parentElement;
                } else {
                    parent = element;
                }

                if (parent && parent.closest(".drag-handler")) {
                    window.getSelection()?.removeAllRanges();
                }
            }
        });
    }

    attachEvent(): void {

        this.clearSelectionOnDrag();
        this.reRenderPlaceholder();

        document.addEventListener("copiedText", () => {
            const copyElementItem = document.querySelector("#copyOption .text-option span") as HTMLSpanElement;
            if (copyElementItem) {

                copyElementItem.textContent = "Copied!";

                setTimeout(() => {
                    copyElementItem.textContent = "Copy";
                }, 1500);
            }
        });

        //Focus on P when load
        document.addEventListener('DOMContentLoaded', function () {
            const editor = document.querySelector('.johannes-editor');

            if (editor) {
                let blocks = editor.querySelectorAll('.block');

                if (blocks.length == 1) {

                    const p = blocks[0].querySelector('.johannes-content-element') as HTMLElement;
                    if (p.innerText == '') {
                        p.focus();
                    }
                }
            }
        });




        this.htmlElement.addEventListener("keydown", async (event) => {

            const quickMenu = DependencyContainer.Instance.resolve<IQuickMenu>("IQuickMenu");
            const tableToolbar = DependencyContainer.Instance.resolve<ITableContextFloatingToolbar>("ITableContextFloatingToolbar");

            if (event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            if (event.key === 'Enter' && !quickMenu.isVisible && !tableToolbar.isVisible) {
                // Create a default block when press Enter
                event.preventDefault();
                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.insertNew,
                    }
                }));
            } else if (event.key === 'Backspace') {
                const target = event.target as HTMLElement;

                if (target.classList.contains('johannes-content-element') && target.textContent?.trim() === '') {

                    document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                        detail: {
                            command: Commands.focusOnPreviousBlock,
                        }
                    }));

                    document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                        detail: {
                            command: Commands.focusOnPreviousBlock,
                        }
                    }));
                } else if (target.classList.contains('johannes-content-element') && target.textContent?.trim() !== '') {
                    //TODO: Replace the delete and focus by merge
                }

            } else if (event.key === 'Delete') {
                const target = event.target as HTMLElement;

                if (target.classList.contains('johannes-content-element') && target.textContent?.trim() === '') {
                    // this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_NEXT, false);
                } else if (target.classList.contains('johannes-content-element') && target.textContent?.trim() !== '') {
                    //TODO: Replace the delete and focus by merge
                }
            } else if (event.key === 'ArrowRight' && Content.isCursorAtEnd(event.target as HTMLElement)) {
                // this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_NEXT, false);
            } else if (event.key === 'ArrowLeft' && Content.isCursorAtStart(event.target as HTMLElement)) {
                // this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_PREVIOUS, false);
            } else if (event.key === 'ArrowDown' && Content.isCursorOnLastLine()) {
                // this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_NEXT, false);
            } else if (event.key === 'ArrowUp' && Content.isCursorOnFirstLine()) {
                // this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_PREVIOUS, false);
            }
        });
    }



    /**
    * Adds an input event listener to the entire document to handle placeholder behavior for contentEditable elements.
    * This workaround is specifically designed to address a known issue in Firefox where contentEditable elements
    * do not properly reset their placeholders after the content is deleted by the user.
    * 
    * The event listener checks if the target of the input event is a contentEditable element and whether it has a
    * custom 'data-placeholder' attribute. If the element's content is empty (ignoring white spaces), the function
    * resets the 'data-placeholder' to ensure it displays correctly, and clears any residual text content that might
    * interfere with the placeholder display.
    * 
    * @example
    * // To utilize this workaround, ensure your contentEditable elements have a 'data-placeholder' attribute.
    * // <div contentEditable="true" data-placeholder="Enter text here..."></div>
    * 
    * @param {Event} event - The input event triggered by user interaction with the document's input-capable elements.
    */
    reRenderPlaceholder() {
        document.addEventListener('input', function (event: Event) {
            if (event.target instanceof HTMLElement) {
                const editableElement = event.target;

                if (editableElement.isContentEditable) {
                    if (editableElement.hasAttribute('data-placeholder')) {
                        const customPlaceholder = editableElement.getAttribute('data-placeholder');

                        if (editableElement.textContent?.trim() === '') {
                            editableElement.setAttribute('data-placeholder', customPlaceholder || '');
                            editableElement.textContent = '';
                        }
                    }
                }
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

    static getInstance(): Content {

        const shortcutListener = DependencyContainer.Instance.resolve<IShortcutListeners>("IShortcutListeners");
        const tableListeners = DependencyContainer.Instance.resolve<ITableListeners>("ITableListeners");
        return new Content();
    }
}