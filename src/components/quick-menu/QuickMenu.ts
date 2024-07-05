import QuickMenuSection from './QuickMenuSection';
import QuickMenuEmpty from './QuickMenuEmpty';
import QuickMenuItem from './QuickMenuItem';
import BaseUIComponent from '../common/BaseUIComponent';
import CircularDoublyLinkedList from '../../common/CircularDoublyLinkedList';
import IBlockOperationsService from '../../services/block-operations/IBlockOperationsService';
import JNode from 'common/JNode';

class QuickMenu extends BaseUIComponent {

    display: string;

    private static instance: QuickMenu | null = null;

    private readonly blockOperations: IBlockOperationsService;

    private currentFocusedMenuItem: JNode<QuickMenuItem> | null = null;


    private htmlFocusedElementBeforeOpenQuickMenu: HTMLElement | null = null;

    private menuSections: CircularDoublyLinkedList<QuickMenuSection>;
    private quickMenuEmpty: QuickMenuEmpty;
    private filterInput: string;

    private constructor(blockOperations: IBlockOperationsService) {

        super({});

        this.blockOperations = blockOperations;

        this.display = 'block';

        this.menuSections = new CircularDoublyLinkedList<QuickMenuSection>();
        this.attachEvents();

        let blockOptions = this.htmlElement.querySelector('.block-options') as HTMLElement;

        this.filterInput = "";

        this.menuSections.append(this.initBasicSection(blockOptions));
        this.menuSections.append(this.initHeadingSection(blockOptions));
        this.menuSections.append(this.initListSection(blockOptions));

        this.quickMenuEmpty = new QuickMenuEmpty();
        this.quickMenuEmpty.documentAppendTo(blockOptions);
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

    private initBasicSection(parent: HTMLElement): QuickMenuSection {

        const basicBlocksSection = new QuickMenuSection(this, 'Basic blocks', 'basic-section');

        basicBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(basicBlocksSection, 'Paragraph', 'Just start writing with plain text.', 'icon-wordpress-paragraph', 'p'),
            new QuickMenuItem(basicBlocksSection, 'Image', 'Just start writing with plain text.', 'icon-wordpress-paragraph', 'image'),
            new QuickMenuItem(basicBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list'),
            new QuickMenuItem(basicBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list'),
            new QuickMenuItem(basicBlocksSection, 'Code', 'Insert code snippets with syntax highlighting.', 'icon-wordpress-code-mark', 'code'),
            new QuickMenuItem(basicBlocksSection, 'Quote', 'Highlight text as a significant quote.', 'icon-wordpress-quote', 'quote'),
            new QuickMenuItem(basicBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', 'h2'),
            new QuickMenuItem(basicBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-2', 'h3'),
            new QuickMenuItem(basicBlocksSection, 'Separator', 'Visually divide blocks.', 'icon-wordpress-separator', 'separator')
        ]);

        basicBlocksSection.documentAppendTo(parent);

        return basicBlocksSection;
    }

    private initHeadingSection(parent: HTMLElement): QuickMenuSection {
        const headingBlocksSection = new QuickMenuSection(this, 'Heading', 'heading-section');

        headingBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(headingBlocksSection, 'Heading 1', 'Large header to organize content.', 'icon-julia-head-1', 'h1'),
            new QuickMenuItem(headingBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', 'h2'),
            new QuickMenuItem(headingBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-3', 'h3'),
            new QuickMenuItem(headingBlocksSection, 'Heading 4', 'Small header for detailed sections.', 'icon-julia-head-4', 'h4'),
            new QuickMenuItem(headingBlocksSection, 'Heading 5', 'Small header for detailed sections.', 'icon-julia-head-5', 'h5'),
            new QuickMenuItem(headingBlocksSection, 'Heading 6', 'Small header for detailed sections.', 'icon-julia-head-6', 'h6'),
        ]);

        headingBlocksSection.documentAppendTo(parent);

        return headingBlocksSection;
    }

    private initListSection(parent: HTMLElement): QuickMenuSection {
        const listBlocksSection = new QuickMenuSection(this, 'List', 'list-section');

        listBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(listBlocksSection, 'Todo list', 'Organize items with bullet points.', 'icon-material-check-list', 'todo-list'),
            new QuickMenuItem(listBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list'),
            new QuickMenuItem(listBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list')
        ]);

        listBlocksSection.documentAppendTo(parent);

        return listBlocksSection;
    }

    public static getInstance(blockOperations: IBlockOperationsService): QuickMenu {
        if (!QuickMenu.instance) {
            QuickMenu.instance = new QuickMenu(blockOperations);
        }

        return QuickMenu.instance;
    }

    changeFocus(item: JNode<QuickMenuItem>): void {

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

    moveTheFocusToThePreviousItem(): void {

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
        this.changeFocus(previousVisibleItem!);
    }

    moveTheFocusToTheNextItem(): void {

        let nextVisibleItem: JNode<QuickMenuItem> | null;

        if (this.currentFocusedMenuItem) {
            nextVisibleItem = this.currentFocusedMenuItem.getNextSatisfying(item => item.isVisible);
            if (!nextVisibleItem) {

                let nextVisibleSectionNode: JNode<QuickMenuSection> | null = this.menuSections.find(this.currentFocusedMenuItem.value.quickMenuSectionInstance)!.getPreviousSatisfying(section => section.isVisible);

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

        this.changeFocus(nextVisibleItem!);
    }

    getMenuElement(): HTMLElement {
        return this.htmlElement;
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
    }

    closeMenu() {
        this.filterInput = "";
        this.htmlFocusedElementBeforeOpenQuickMenu?.focus();
        this.hideMenu();
    }

    openMenu() {

        // The timeout in necessary to wait the browser process the selection before show Quick Menu. 
        setTimeout(() => {

            this.htmlFocusedElementBeforeOpenQuickMenu = document.activeElement as HTMLElement;

            if (!this.htmlFocusedElementBeforeOpenQuickMenu) {
                throw new Error('Ops Isso não deveria acontecer');
            }

            this.show();

            this.htmlFocusedElementBeforeOpenQuickMenu.focus();

        }, 10);
    }

    show() {

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
    }

    private hideMenu() {

        super.hide();
    }

    private attachEvents() {

        document.addEventListener('keydown', (event: KeyboardEvent) => {

            if (!this.isVisible && event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.openMenu();
            } else if (this.isVisible && event.key === 'ArrowLeft' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                event.stopPropagation();
            } else if (this.isVisible && event.key === 'ArrowRight' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (this.isVisible && event.key === 'ArrowDown' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                this.moveTheFocusToTheNextItem();
            } else if (this.isVisible && event.key === 'ArrowUp' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                this.moveTheFocusToThePreviousItem();
            } else if (this.isVisible && /^[a-z0-9]$/i.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.concatFilterInput(event.key);
                this.filterItems();
            } else if (this.isVisible && event.key === 'Backspace') {

                if (this.filterInput == "") {
                    this.closeMenu();
                } else {
                    this.removeLastFilterInputCharacter();
                    this.filterItems();
                }
            } else if (this.isVisible && event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.closeMenu();
            } else if (event.key === 'Enter' && this.isVisible && !event.ctrlKey && !event.shiftKey && !event.altKey) {

                event.preventDefault();
                event.stopPropagation();

                let dataType = this.currentFocusedMenuItem!.value.htmlElement.getAttribute('data-type');
                let element = this.htmlFocusedElementBeforeOpenQuickMenu?.closest('.draggable-block') as HTMLElement;

                if (element && dataType) {
                    this.blockOperations.transformBlock(element, dataType);
                }

                this.closeMenu();
            }

        });
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

export default QuickMenu;