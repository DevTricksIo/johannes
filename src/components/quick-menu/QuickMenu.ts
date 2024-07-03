import QuickMenuSection from './QuickMenuSection';
import QuickMenuItem from './QuickMenuItem';
import JCircularLinkedList from '../../common/JCircularLinkedList';

class QuickMenu {

    private static instance: QuickMenu | null = null;

    htmlElement: HTMLElement;
    menuSections: JCircularLinkedList<QuickMenuSection>;

    isShowing: boolean;
    currentFocusedMenuItem: QuickMenuItem | null = null;

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

        // this.attachEvents();
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
    }


    moveTheFakeFocusToTheNextMenuItem(): void {

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

    attachEvents = () => {

        document.addEventListener('keydown', (event) => {
            if (event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                alert('show the Quick Insert Menu');
            }
        });
    }

    showMenu() {

        // The timeout in necessary to wait the browser process the selection before show the Block Options
        // setTimeout(() => {

        //     const realFocusedElement = document.activeElement;
        //     const currentDraggableBlock = realFocusedElement.closest('.draggable-block');
        //     const firstBlockOption = getTheFirstVisibleBlockOption();

        //     setRealFocusedElement(realFocusedElement);
        //     setCurrentDraggableBlock(currentDraggableBlock);
        //     setCurrentFakeFocusElement(firstBlockOption);

        //     applyVisualFakeFocus(realFocusedElement, firstBlockOption);


        //     //TODO: create a clear filter
        //     // removeDisplayNoneFromAllBlockOptions();

        //     const range = document.getSelection().getRangeAt(0);
        //     const cursorPos = range.getBoundingClientRect();

        //     const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        //     const menuWidth = 19 * remSize;

        //     let xPosition = cursorPos.right;
        //     let yPosition = cursorPos.bottom + window.scrollY;

        //     const margin = remSize * 1.25;

        //     blockOptionsWrapper.style.display = 'block';

        //     let blockWidth = blockOptionsWrapper.offsetWidth;


        //     if (xPosition + blockWidth + margin > window.innerWidth) {
        //         xPosition = cursorPos.left - menuWidth;
        //         if (xPosition < 0) xPosition = 0;
        //     }

        //     blockOptionsWrapper.style.left = `${xPosition}px`;
        //     blockOptionsWrapper.style.top = `${yPosition}px`;


        // }, 10);
    }

}

// const instance = new QuickMenu();
export default QuickMenu;