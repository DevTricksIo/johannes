import QuickInsertMenuSection from './QuickInsertMenuSection';
import QuickInsertMenuItem from './QuickInsertMenuItem';
import JCircularLinkedList from '../../common/JCircularLinkedList';

class QuickInsertMenu {

    constructor() {

        /**
         * The QuickInsertMenu element of the component in the DOM.
         * @type {HTMLElement}
         */
        this.htmlElement = document.createElement('div');
        this.htmlElement.id = 'blockOptionsWrapper';

        this.isShowing = false;

        /**
         * The QuickInsertMenuItem current focused.
         * @type {QuickInsertMenuItem|null}
         */
        this.currentFocusedMenuItem = null;

        /**
         * The QuickInsertMenuSection elements in a CircularLinkedList.
         * @type {JCircularLinkedList}
         */
        this.menuSections = new JCircularLinkedList();

        this.htmlElement.classList.add('block-options-wrapper', 'soft-box-shadow');
        this.htmlElement.style.display = 'none';

        const blockOptions = document.createElement('div');
        blockOptions.classList.add('block-options');
        blockOptions.style.position = 'relative';

        this.htmlElement.appendChild(blockOptions);

        const basicBlocksSection = new QuickInsertMenuSection(this, 'Basic blocks', 'basic-section');

        basicBlocksSection.appendQuickInsertMenuItem([
            new QuickInsertMenuItem(basicBlocksSection, 'Paragraph', 'Just start writing with plain text.', 'icon-wordpress-paragraph', 'p'),
            new QuickInsertMenuItem(basicBlocksSection, 'Image', 'Just start writing with plain text.', 'icon-wordpress-paragraph', 'image'),
            new QuickInsertMenuItem(basicBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list'),
            new QuickInsertMenuItem(basicBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list'),
            new QuickInsertMenuItem(basicBlocksSection, 'Code', 'Insert code snippets with syntax highlighting.', 'icon-wordpress-code-mark', 'code'),
            new QuickInsertMenuItem(basicBlocksSection, 'Quote', 'Highlight text as a significant quote.', 'icon-wordpress-quote', 'quote'),
            new QuickInsertMenuItem(basicBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', 'h2'),
            new QuickInsertMenuItem(basicBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-2', 'h3'),
            new QuickInsertMenuItem(basicBlocksSection, 'Separator', 'Visually divide blocks.', 'icon-wordpress-separator', 'separator')
        ]);

        this.menuSections.append(basicBlocksSection);
        blockOptions.appendChild(basicBlocksSection.htmlElement);


        const headingBlocksSection = new QuickInsertMenuSection(this, 'Heading', 'heading-section');

        headingBlocksSection.appendQuickInsertMenuItem([
            new QuickInsertMenuItem(headingBlocksSection, 'Heading 1', 'Large header to organize content.', 'icon-julia-head-1', 'h1'),
            new QuickInsertMenuItem(headingBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', 'h2'),
            new QuickInsertMenuItem(headingBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-3', 'h3'),
            new QuickInsertMenuItem(headingBlocksSection, 'Heading 4', 'Small header for detailed sections.', 'icon-julia-head-4', 'h4'),
            new QuickInsertMenuItem(headingBlocksSection, 'Heading 5', 'Small header for detailed sections.', 'icon-julia-head-5', 'h5'),
            new QuickInsertMenuItem(headingBlocksSection, 'Heading 6', 'Small header for detailed sections.', 'icon-julia-head-6', 'h6'),
        ]);

        this.menuSections.append(headingBlocksSection);
        blockOptions.appendChild(headingBlocksSection.htmlElement);


        const listBlocksSection = new QuickInsertMenuSection(this, 'List', 'list-section');

        listBlocksSection.appendQuickInsertMenuItem([
            new QuickInsertMenuItem(listBlocksSection, 'Todo list', 'Organize items with bullet points.', 'icon-material-check-list', 'todo-list'),
            new QuickInsertMenuItem(listBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list'),
            new QuickInsertMenuItem(listBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list')
        ]);

        this.menuSections.append(listBlocksSection);
        blockOptions.appendChild(listBlocksSection.htmlElement);


        /**
        * Change the current fake focus and remove the current fake focus.
        * If the input is not a QuickInsertMenuItem or contains an item that is not a QuickInsertMenuItem, an error is thrown.
        *
        * @param {QuickInsertMenuItem} menuItems The item(s) to be focused.
        * @throws {TypeError} Throws an 'Expected an instance of QuickInsertMenuItem. if item is not a QuickInsertMenuItem.
        */
        this.changeFocus = (item) => {

            if (!(item instanceof QuickInsertMenuItem)) {
                throw new TypeError("Expected an instance of QuickInsertMenuItem.");
            }

            if (this.currentFocusedMenuItem == item) {
                return;
            }

            if (this.currentFocusedMenuItem) {
                this.currentFocusedMenuItem.removeFocus();
            }

            this.currentFocusedMenuItem = item;
            this.currentFocusedMenuItem.focus();
        }

        /**
        * Move the fake focus menu indication to the next element.
        * If no element is currently focused the first QuickInsertMenuItem is used.
        */
        this.moveTheFakeFocusToTheNextMenuItem = () => {

            let nextItem;

            if (!this.currentFocusedMenuItem) {

                nextItem = this.menuSections.getFirst().getFirstMenuItem();
            } else {

                nextItem = this.currentFocusedMenuItem.nextNode;

                if (!nextItem) {
                    nextItem = this.currentFocusedMenuItem.quickInsertMenuSectionInstance.nextNode.getFirstMenuItem();
                }
            }

            this.changeFocus(nextItem);
        }

        /**
        * Get the QuickInsertMenu HTML Element.
        * @returns {HTMLElement} htmlElement.
        */
        this.getMenuElement = () => {
            return this.htmlElement;
        }

        this.attachEvents = () => {

            document.addEventListener('keydown', (event) => {
                if (event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                    alert('show the Quick Insert Menu');
                }
            });
        }

        this.attachEvents();
    }


    showMenu() {

        // The timeout in necessary to wait the browser process the selection before show the Block Options
        setTimeout(() => {

            const realFocusedElement = document.activeElement;
            const currentDraggableBlock = realFocusedElement.closest('.draggable-block');
            const firstBlockOption = getTheFirstVisibleBlockOption();

            setRealFocusedElement(realFocusedElement);
            setCurrentDraggableBlock(currentDraggableBlock);
            setCurrentFakeFocusElement(firstBlockOption);

            applyVisualFakeFocus(realFocusedElement, firstBlockOption);


            //TODO: create a clear filter
            // removeDisplayNoneFromAllBlockOptions();

            const range = document.getSelection().getRangeAt(0);
            const cursorPos = range.getBoundingClientRect();

            const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const menuWidth = 19 * remSize;

            let xPosition = cursorPos.right;
            let yPosition = cursorPos.bottom + window.scrollY;

            const margin = remSize * 1.25;

            blockOptionsWrapper.style.display = 'block';

            let blockWidth = blockOptionsWrapper.offsetWidth;


            if (xPosition + blockWidth + margin > window.innerWidth) {
                xPosition = cursorPos.left - menuWidth;
                if (xPosition < 0) xPosition = 0;
            }

            blockOptionsWrapper.style.left = `${xPosition}px`;
            blockOptionsWrapper.style.top = `${yPosition}px`;


        }, 10);
    }




}

const instance = new QuickInsertMenu();
export default instance;