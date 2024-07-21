import { QuickMenuSection } from './QuickMenuSection';
import {QuickMenuEmpty} from './QuickMenuEmpty';
import { QuickMenuItem } from './QuickMenuItem';
import {BaseUIComponent} from '../common/BaseUIComponent';
import {CircularDoublyLinkedList} from '../../common/CircularDoublyLinkedList';
import { IBlockOperationsService } from '../../services/block-operations/IBlockOperationsService';
import {JNode} from "../../common/JNode";
import { ServiceProvider } from "../../services/service-provider/ServiceProvider";

export class QuickMenu extends BaseUIComponent {

    display: string;

    private readonly blockOperationsService: IBlockOperationsService;

    private currentFocusedMenuItem: JNode<QuickMenuItem> | null;
    private htmlFocusedElementBeforeOpenQuickMenu: HTMLElement | null;
    private menuSections: CircularDoublyLinkedList<QuickMenuSection>;
    private quickMenuEmpty: QuickMenuEmpty;
    private filterInput: string;

    private static instance: QuickMenu | null;

    constructor() {

        super({});

        this.display = 'block';

        this.blockOperationsService = ServiceProvider.getInstance().getInstanceOf("IBlockOperationsService");
        this.currentFocusedMenuItem = null;
        this.htmlFocusedElementBeforeOpenQuickMenu = null;
        this.menuSections = new CircularDoublyLinkedList<QuickMenuSection>();
        this.quickMenuEmpty = new QuickMenuEmpty();

        let blockOptions = this.htmlElement.querySelector('.block-options') as HTMLElement;

        this.quickMenuEmpty.documentAppendTo(blockOptions);
        this.attachEvents();

        this.filterInput = "";
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('div');
        htmlElement.id = 'quickMenu';

        htmlElement.classList.add('block-options-wrapper', 'soft-box-shadow');
        htmlElement.style.display = 'none';

        const blockOptions = document.createElement('div');
        blockOptions.classList.add('block-options');
        blockOptions.style.position = 'relative';

        htmlElement.appendChild(blockOptions);

        return htmlElement;
    }

    append(menuItem: QuickMenuSection): void {
        this.menuSections.append(menuItem);
        this.htmlElement.querySelector('.block-options')!.appendChild(menuItem.htmlElement);
    }

    public static getInstance(): QuickMenu {
        if (!QuickMenu.instance) {
            QuickMenu.instance = new QuickMenu();
        }

        return QuickMenu.instance;
    }

    switchVisualFocus(item: JNode<QuickMenuItem>): void {

        if (this.currentFocusedMenuItem == item) {
            return;
        }

        if (this.currentFocusedMenuItem) {
            this.currentFocusedMenuItem.value.removeFocus();
        }

        this.currentFocusedMenuItem = item;
        this.currentFocusedMenuItem.value.focus();

        this.htmlFocusedElementBeforeOpenQuickMenu?.focus();
    }

    focusOnTheFirstVisibleItem(): void {

        const firstSectionNode: JNode<QuickMenuSection> | null = this.menuSections.getFirst();

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

        if (this.currentFocusedMenuItem) {
            previousVisibleItem = this.currentFocusedMenuItem.getPreviousSatisfying(item => item.isVisible);
            if (!previousVisibleItem) {

                let previousVisibleSectionNode: JNode<QuickMenuSection> | null = this.menuSections.find(this.currentFocusedMenuItem.value.quickMenuSectionInstance)!.getPreviousSatisfying(section => section.isVisible);

                if (!previousVisibleSectionNode) {
                    return;
                }
                previousVisibleItem = previousVisibleSectionNode.value.menuItems.findLast(item => item.isVisible);
            }
        } else {
            let lastVisibleSectionNode: JNode<QuickMenuSection> | null = this.menuSections.findLast(section => section.isVisible);

            if (!lastVisibleSectionNode) {
                return;
            }
            previousVisibleItem = lastVisibleSectionNode.value.menuItems.findLast(item => item.isVisible);
        }
        this.switchVisualFocus(previousVisibleItem!);
    }

    focusNextVisibleItem(): void {

        let nextVisibleItem: JNode<QuickMenuItem> | null;

        if (this.currentFocusedMenuItem) {
            nextVisibleItem = this.currentFocusedMenuItem.getNextSatisfying(item => item.isVisible);
            if (!nextVisibleItem) {

                let nextVisibleSectionNode: JNode<QuickMenuSection> | null = this.menuSections.find(this.currentFocusedMenuItem.value.quickMenuSectionInstance)!.getNextSatisfying(section => section.isVisible);

                if (!nextVisibleSectionNode) {
                    return;
                }
                nextVisibleItem = nextVisibleSectionNode.value.menuItems.findFirst(item => item.isVisible);
            }

        } else {
            let firstVisibleSectionNode: null | JNode<QuickMenuSection> = this.menuSections.findFirst(section => section.isVisible);
            if (!firstVisibleSectionNode) {
                return;
            }
            nextVisibleItem = firstVisibleSectionNode.value.menuItems.findFirst(item => item.isVisible);
        }

        this.switchVisualFocus(nextVisibleItem!);
    }

    filterItems(): void {

        this.menuSections.forEach(section => {
            section.filterSection(this.filterInput);
        });

        if (!this.menuSections.any(section => section.isVisible)) {
            this.quickMenuEmpty.show();
        } else {
            this.quickMenuEmpty.hide();
        }

        this.focusOnTheFirstVisibleItem();
    }

    show() {


        setTimeout(() => {

            this.htmlFocusedElementBeforeOpenQuickMenu = document.activeElement as HTMLElement;

            if (!this.htmlFocusedElementBeforeOpenQuickMenu) {
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
            this.htmlFocusedElementBeforeOpenQuickMenu.focus();

        }, 10);

    }

    restore(): void {
        this.filterInput = "";

        this.menuSections.forEach(section => {
            section.restore();
        });
    }

    hide() {

        this.restore();
        this.htmlFocusedElementBeforeOpenQuickMenu?.focus();

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

                if (this.filterInput == "") {
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

                let dataType = this.currentFocusedMenuItem!.value.htmlElement.getAttribute('data-type');

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

                const blockType = this.currentFocusedMenuItem?.value.blockType;

                if (blockType) {
                    this.transformHtmlFocusedElementBeforeOpenQuickMenu(blockType);
                }
            }

        });
    }

    transformHtmlFocusedElementBeforeOpenQuickMenu(blockType: string): void {

        let element = this.htmlFocusedElementBeforeOpenQuickMenu?.closest('.block') as HTMLElement;

        if (element && blockType) {
            this.blockOperationsService.formatBlock(element, blockType);
        }

        this.hide();
    }

    private concatFilterInput(stg: string): void {
        this.filterInput += stg.toLowerCase();
    }

    private removeLastFilterInputCharacter(): void {
        if (this.filterInput.length > 0) {
            this.filterInput = this.filterInput.slice(0, -1);
        }
    }
}