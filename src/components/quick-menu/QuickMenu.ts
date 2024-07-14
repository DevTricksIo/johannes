import QuickMenuSection from './QuickMenuSection';
import QuickMenuEmpty from './QuickMenuEmpty';
import QuickMenuItem from './QuickMenuItem';
import BaseUIComponent from '../common/BaseUIComponent';
import CircularDoublyLinkedList from '../../common/CircularDoublyLinkedList';
import IBlockOperationsService from '../../services/block-operations/IBlockOperationsService';
import JNode from "../../common/JNode";

class QuickMenu extends BaseUIComponent {

    display: string;

    private readonly _blockOperationsService: IBlockOperationsService;

    private _currentFocusedMenuItem: JNode<QuickMenuItem> | null;
    private _htmlFocusedElementBeforeOpenQuickMenu: HTMLElement | null;
    private _menuSections: CircularDoublyLinkedList<QuickMenuSection>;
    private _quickMenuEmpty: QuickMenuEmpty;
    private _filterInput: string;

    private static _instance: QuickMenu | null;

    constructor(blockOperationsService: IBlockOperationsService) {

        super({});

        this.display = 'block';

        this._blockOperationsService = blockOperationsService;
        this._currentFocusedMenuItem = null;
        this._htmlFocusedElementBeforeOpenQuickMenu = null;
        this._menuSections = new CircularDoublyLinkedList<QuickMenuSection>();
        this._quickMenuEmpty = new QuickMenuEmpty();

        let blockOptions = this.htmlElement.querySelector('.block-options') as HTMLElement;

        this._quickMenuEmpty.documentAppendTo(blockOptions);
        this.attachEvents();

        this._filterInput = "";
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('div');
        htmlElement.id = 'blockOptionsWrapper';

        htmlElement.classList.add('block-options-wrapper', 'soft-box-shadow');
        htmlElement.style.display = 'none';

        const blockOptions = document.createElement('div');
        blockOptions.classList.add('block-options');
        blockOptions.style.position = 'relative';

        htmlElement.appendChild(blockOptions);

        return htmlElement;
    }

    append(menuItem: QuickMenuSection): void {
        this._menuSections.append(menuItem);
        this.htmlElement.querySelector('.block-options')!.appendChild(menuItem.htmlElement);
    }

    public static getInstance(blockOperations: IBlockOperationsService): QuickMenu {
        if (!QuickMenu._instance) {
            QuickMenu._instance = new QuickMenu(blockOperations);
        }

        return QuickMenu._instance;
    }

    switchVisualFocus(item: JNode<QuickMenuItem>): void {

        if (this._currentFocusedMenuItem == item) {
            return;
        }

        if (this._currentFocusedMenuItem) {
            this._currentFocusedMenuItem.value.removeFocus();
        }

        this._currentFocusedMenuItem = item;
        this._currentFocusedMenuItem.value.focus();

        this._htmlFocusedElementBeforeOpenQuickMenu?.focus();
    }

    focusOnTheFirstVisibleItem(): void {

        const firstSectionNode: JNode<QuickMenuSection> | null = this._menuSections.getFirst();

        let currentSectionNode: JNode<QuickMenuSection> | null = firstSectionNode;

        while (currentSectionNode) {

            const itemNode: JNode<QuickMenuItem> | null = currentSectionNode.value.menuItems.findFirst(item => item.isVisible);

            if (itemNode) {
                this.switchVisualFocus(itemNode);
                return;
            }

            currentSectionNode = currentSectionNode.nextNode;

            if (currentSectionNode == firstSectionNode) {
                return;
            }
        }
    }

    focusPreviousVisibleItem(): void {

        let previousVisibleItem: JNode<QuickMenuItem> | null;

        if (this._currentFocusedMenuItem) {
            previousVisibleItem = this._currentFocusedMenuItem.getPreviousSatisfying(item => item.isVisible);
            if (!previousVisibleItem) {

                let previousVisibleSectionNode: JNode<QuickMenuSection> | null = this._menuSections.find(this._currentFocusedMenuItem.value.quickMenuSectionInstance)!.getPreviousSatisfying(section => section.isVisible);

                if (!previousVisibleSectionNode) {
                    return;
                }
                previousVisibleItem = previousVisibleSectionNode.value.menuItems.findLast(item => item.isVisible);
            }
        } else {
            let lastVisibleSectionNode: JNode<QuickMenuSection> | null = this._menuSections.findLast(section => section.isVisible);

            if (!lastVisibleSectionNode) {
                return;
            }
            previousVisibleItem = lastVisibleSectionNode.value.menuItems.findLast(item => item.isVisible);
        }
        this.switchVisualFocus(previousVisibleItem!);
    }

    focusNextVisibleItem(): void {

        let nextVisibleItem: JNode<QuickMenuItem> | null;

        if (this._currentFocusedMenuItem) {
            nextVisibleItem = this._currentFocusedMenuItem.getNextSatisfying(item => item.isVisible);
            if (!nextVisibleItem) {

                let nextVisibleSectionNode: JNode<QuickMenuSection> | null = this._menuSections.find(this._currentFocusedMenuItem.value.quickMenuSectionInstance)!.getPreviousSatisfying(section => section.isVisible);

                if (!nextVisibleSectionNode) {
                    return;
                }
                nextVisibleItem = nextVisibleSectionNode.value.menuItems.findFirst(item => item.isVisible);
            }

        } else {
            let firstVisibleSectionNode: null | JNode<QuickMenuSection> = this._menuSections.findFirst(section => section.isVisible);
            if (!firstVisibleSectionNode) {
                return;
            }
            nextVisibleItem = firstVisibleSectionNode.value.menuItems.findFirst(item => item.isVisible);
        }

        this.switchVisualFocus(nextVisibleItem!);
    }

    filterItems(): void {

        this._menuSections.forEach(section => {
            section.filterSection(this._filterInput);
        });

        if (!this._menuSections.any(section => section.isVisible)) {
            this._quickMenuEmpty.show();
        } else {
            this._quickMenuEmpty.hide();
        }

        this.focusOnTheFirstVisibleItem();
    }

    show() {


        setTimeout(() => {

            this._htmlFocusedElementBeforeOpenQuickMenu = document.activeElement as HTMLElement;

            if (!this._htmlFocusedElementBeforeOpenQuickMenu) {
                throw new Error("Failed to capture the focused element before displaying the QuickMenu. Ensure an element is focused.");
            }


            const range = document.getSelection()!.getRangeAt(0);
            const cursorPos = range.getBoundingClientRect();

            const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const menuWidth = 19 * remSize;

            let xPosition = cursorPos.right;
            let yPosition = cursorPos.bottom + window.scrollY;

            const margin = remSize * 1.25;

            let blockWidth = this.htmlElement.offsetWidth;

            if (xPosition + blockWidth + margin > window.innerWidth) {
                xPosition = cursorPos.left - menuWidth;
                if (xPosition < 0) xPosition = 0;
            }

            this.htmlElement.style.left = `${xPosition}px`;
            this.htmlElement.style.top = `${yPosition}px`;

            super.show();




            this.focusOnTheFirstVisibleItem();
            this._htmlFocusedElementBeforeOpenQuickMenu.focus();

        }, 10);

    }

    restore(): void {
        this._filterInput = "";

        this._menuSections.forEach(section => {
            section.restore();
        });
    }

    hide() {

        this.restore();
        this._htmlFocusedElementBeforeOpenQuickMenu?.focus();

        super.hide();
    }

    private attachEvents() {

        document.addEventListener('keydown', (event: KeyboardEvent) => {

            if (!this.isVisible && event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.show();
            } else if (this.isVisible && event.key === 'ArrowLeft' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                event.stopPropagation();
            } else if (this.isVisible && event.key === 'ArrowRight' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (this.isVisible && event.key === 'ArrowDown' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                this.focusNextVisibleItem();
            } else if (this.isVisible && event.key === 'ArrowUp' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                this.focusPreviousVisibleItem();
            } else if (this.isVisible && /^[a-z0-9 ]$/i.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.concatFilterInput(event.key);
                this.filterItems();
            } else if (this.isVisible && event.key === 'Backspace') {

                if (this._filterInput == "") {
                    this.hide();
                } else {
                    this.removeLastFilterInputCharacter();
                    this.filterItems();
                }
            } else if (this.isVisible && event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.hide();
            } else if (event.key === 'Enter' && this.isVisible && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();
                event.stopPropagation();

                let dataType = this._currentFocusedMenuItem!.value.htmlElement.getAttribute('data-type');

                if (dataType) {
                    this.transformHtmlFocusedElementBeforeOpenQuickMenu(dataType);
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (this.isVisible && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`)) {
                this.hide();
            }
        });

        document.addEventListener('keydown', (event) => {

            if (event.key === 'Enter' && this.isVisible) {

                const blockType = this._currentFocusedMenuItem?.value.blockType;

                if (blockType) {
                    this.transformHtmlFocusedElementBeforeOpenQuickMenu(blockType);
                }
            }

        });
    }

    transformHtmlFocusedElementBeforeOpenQuickMenu(blockType: string): void {

        let element = this._htmlFocusedElementBeforeOpenQuickMenu?.closest('.draggable-block') as HTMLElement;

        if (element && blockType) {
            this._blockOperationsService.formatBlock(element, blockType);
        }

        this.hide();
    }

    private concatFilterInput(stg: string): void {
        this._filterInput += stg.toLowerCase();
    }

    private removeLastFilterInputCharacter(): void {
        if (this._filterInput.length > 0) {
            this._filterInput = this._filterInput.slice(0, -1);
        }
    }
}

export default QuickMenu;