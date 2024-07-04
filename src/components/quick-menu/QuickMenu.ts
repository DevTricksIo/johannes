import QuickMenuSection from './QuickMenuSection';
import QuickMenuItem from './QuickMenuItem';
import JCircularLinkedList from '../../common/JCircularLinkedList';

class QuickMenu {

    private static instance: QuickMenu | null = null;

    htmlElement: HTMLElement;
    menuSections: JCircularLinkedList<QuickMenuSection>;

    isShowing: boolean;
    currentFocusedMenuItem: QuickMenuItem | null = null;
    realFocusedElement: HTMLElement | null = null;
    filterText: string = "";

    private constructor() {

        this.htmlElement = document.createElement('div');
        this.htmlElement.id = 'blockOptionsWrapper';

        this.isShowing = false;

        this.menuSections = new JCircularLinkedList<QuickMenuSection>();

        this.htmlElement.classList.add('block-options-wrapper', 'soft-box-shadow');
        this.htmlElement.style.display = 'none';

        const blockOptions = document.createElement('div');
        blockOptions.classList.add('block-options');
        blockOptions.style.position = 'relative';

        this.htmlElement.appendChild(blockOptions);

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

        this.menuSections.append(basicBlocksSection);
        blockOptions.appendChild(basicBlocksSection.htmlElement);


        const headingBlocksSection = new QuickMenuSection(this, 'Heading', 'heading-section');

        headingBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(headingBlocksSection, 'Heading 1', 'Large header to organize content.', 'icon-julia-head-1', 'h1'),
            new QuickMenuItem(headingBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', 'h2'),
            new QuickMenuItem(headingBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-3', 'h3'),
            new QuickMenuItem(headingBlocksSection, 'Heading 4', 'Small header for detailed sections.', 'icon-julia-head-4', 'h4'),
            new QuickMenuItem(headingBlocksSection, 'Heading 5', 'Small header for detailed sections.', 'icon-julia-head-5', 'h5'),
            new QuickMenuItem(headingBlocksSection, 'Heading 6', 'Small header for detailed sections.', 'icon-julia-head-6', 'h6'),
        ]);

        this.menuSections.append(headingBlocksSection);
        blockOptions.appendChild(headingBlocksSection.htmlElement);


        const listBlocksSection = new QuickMenuSection(this, 'List', 'list-section');

        listBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(listBlocksSection, 'Todo list', 'Organize items with bullet points.', 'icon-material-check-list', 'todo-list'),
            new QuickMenuItem(listBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list'),
            new QuickMenuItem(listBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list')
        ]);

        this.menuSections.append(listBlocksSection);
        blockOptions.appendChild(listBlocksSection.htmlElement);

        this.attachEvents();
    }

    public static getInstance(): QuickMenu {
        if (!QuickMenu.instance) {
            QuickMenu.instance = new QuickMenu();
        }

        return QuickMenu.instance;
    }

    changeFocus(item: QuickMenuItem): void {

        if (this.currentFocusedMenuItem == item) {
            return;
        }

        if (this.currentFocusedMenuItem) {
            this.currentFocusedMenuItem.removeFocus();
        }

        this.currentFocusedMenuItem = item;
        this.currentFocusedMenuItem.focus();

        this.realFocusedElement?.focus();
    }

    moveTheFocusToThePreviousItem(): void {

        let nextItem: QuickMenuItem | null;

        if (!this.currentFocusedMenuItem) {
            nextItem = this.menuSections.getLast()!.getLastMenuItem();
        } else {
            nextItem = this.currentFocusedMenuItem.previousNode;
            if (!nextItem) {
                nextItem = this.currentFocusedMenuItem.quickMenuSectionInstance!.previousNode!.getLastMenuItem();
            }
        }

        this.changeFocus(nextItem!);
    }

    moveTheFocusToTheNextItem(): void {

        let nextItem: QuickMenuItem | null;

        if (!this.currentFocusedMenuItem) {
            nextItem = this.menuSections.getFirst()!.getFirstMenuItem();
        } else {
            nextItem = this.currentFocusedMenuItem.nextNode;
            if (!nextItem) {
                nextItem = this.currentFocusedMenuItem.quickMenuSectionInstance!.nextNode!.getFirstMenuItem();
            }
        }

        this.changeFocus(nextItem!);
    }

    getMenuElement(): HTMLElement {
        return this.htmlElement;
    }

    attachEvents() {

        document.addEventListener('keydown', (event) => {
            if (!this.isShowing && event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.openMenu();
            } else if (this.isShowing && event.key === 'ArrowDown' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.moveTheFocusToTheNextItem();
            } else if (this.isShowing && event.key === 'ArrowUp' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.moveTheFocusToThePreviousItem();
            } else if (this.isShowing && /^[a-z0-9]$/i.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.concatFilter(event.key);
                this.filter();
            } else if (this.isShowing && event.key === 'Backspace') {

                this.removeLastFilterCharacter();

                if (this.filterText == "") {
                    this.closeMenu();
                } else {
                    this.filter();
                }
            } else if (this.isShowing && event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.closeMenu();
            }
        });
    }

    filter(): void {
        alert('filter');
    }

    closeMenu() {
        this.hideMenu();
    }

    openMenu() {

        // The timeout in necessary to wait the browser process the selection before show the Block Options
        setTimeout(() => {

            this.realFocusedElement = document.activeElement as HTMLElement;

            if (!this.realFocusedElement) {
                throw new Error('Ops Isso não deveria acontecer');
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

            this.showMenu(xPosition, yPosition);

        }, 10);
    }

    private showMenu(posLeft: number, postRight: number) {

        this.isShowing = true;

        this.htmlElement.style.display = 'block';
        this.htmlElement.style.left = `${posLeft}px`;
        this.htmlElement.style.top = `${postRight}px`;
    }

    private hideMenu() {
        this.isShowing = false;
        this.htmlElement.style.display = 'none';
    }

    private removeLastFilterCharacter(): void {
        if (this.filterText.length > 0) {
            this.filterText = this.filterText.slice(0, -1);
        }
    }

    private concatFilter(stg: string): void {
        this.filterText += stg.toLowerCase();
    }
}

export default QuickMenu;