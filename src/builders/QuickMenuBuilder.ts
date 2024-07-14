import QuickMenu from "../components/quick-menu/QuickMenu";
import QuickMenuSection from "../components/quick-menu/QuickMenuSection";
import QuickMenuItem from "../components/quick-menu/QuickMenuItem";
import IBlockOperationsService from "../services/block-operations/IBlockOperationsService";
import { ELEMENT_TYPES } from "../services/element-factory/ElementFactoryService";

class QuickMenuBuilder {

    static build(blockOperationsService: IBlockOperationsService): QuickMenu {

        const quickMenu: QuickMenu = new QuickMenu(blockOperationsService);

        const basicBlocksSection: QuickMenuSection = new QuickMenuSection(quickMenu, 'Basic blocks', 'basic-section');

        basicBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(basicBlocksSection, 'Paragraph', 'Just start writing with plain text.', 'icon-wordpress-paragraph', ELEMENT_TYPES.PARAGRAPH, "paragraph text p"),
            new QuickMenuItem(basicBlocksSection, 'Image', 'Just start writing with plain text.', 'icon-wordpress-paragraph', 'image', "image figure photo illustration picture "),
            new QuickMenuItem(basicBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list', "bulleted list unordered list ul"),
            new QuickMenuItem(basicBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list', "numbered list number list sequential list ol enumerated list ordered list"),
            new QuickMenuItem(basicBlocksSection, 'Code', 'Insert code snippets with syntax highlighting.', 'icon-wordpress-code-mark', 'code', "code script source markup"),
            new QuickMenuItem(basicBlocksSection, 'Quote', 'Highlight text as a significant quote.', 'icon-wordpress-quote', 'quote', "quote blockquote citation quotation"),
            new QuickMenuItem(basicBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', ELEMENT_TYPES.HEADER_2, "header 2 heading 2 h2"),
            new QuickMenuItem(basicBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-2', ELEMENT_TYPES.HEADER_3, "header 3 heading 3 h3"),
            new QuickMenuItem(basicBlocksSection, 'Separator', 'Visually divide blocks.', 'icon-wordpress-separator', 'separator', "separator divider rule line")
        ]);

        quickMenu.append(basicBlocksSection);

        const headingBlocksSection = new QuickMenuSection(quickMenu, 'Heading', 'heading-section');

        headingBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(headingBlocksSection, 'Heading 1', 'Large header to organize content.', 'icon-julia-head-1', ELEMENT_TYPES.BLOCK_HEADER_1, "header 1 heading 1 h1"),
            new QuickMenuItem(headingBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', ELEMENT_TYPES.HEADER_2, "header 2 heading 2 h2"),
            new QuickMenuItem(headingBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-3', ELEMENT_TYPES.HEADER_3, "header 3 heading 3 h3"),
            new QuickMenuItem(headingBlocksSection, 'Heading 4', 'Small header for detailed sections.', 'icon-julia-head-4', ELEMENT_TYPES.HEADER_4, "header 4 heading 4 h4"),
            new QuickMenuItem(headingBlocksSection, 'Heading 5', 'Small header for detailed sections.', 'icon-julia-head-5', ELEMENT_TYPES.HEADER_5, "header 5 heading 5 h5"),
            new QuickMenuItem(headingBlocksSection, 'Heading 6', 'Small header for detailed sections.', 'icon-julia-head-6', ELEMENT_TYPES.HEADER_6, "header 6 heading 6 h6"),
        ]);

        quickMenu.append(headingBlocksSection);


        const listBlocksSection = new QuickMenuSection(quickMenu, 'List', 'list-section');

        listBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(listBlocksSection, 'Todo list', 'Organize items with bullet points.', 'icon-material-check-list', 'todo-list', "todo list task list checklist"),
            new QuickMenuItem(listBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list', "bulleted list unordered list ul"),
            new QuickMenuItem(listBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list', "numbered list number list sequential list ol enumerated list ordered list")
        ]);

        quickMenu.append(listBlocksSection);


        return quickMenu;
    }
}

export default QuickMenuBuilder;