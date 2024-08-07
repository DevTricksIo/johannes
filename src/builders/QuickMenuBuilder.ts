import { QuickMenu } from "../components/quick-menu/QuickMenu";
import { QuickMenuSection } from "../components/quick-menu/QuickMenuSection";
import { QuickMenuItem } from "../components/quick-menu/QuickMenuItem";
import { ElementFactoryService } from "../services/element-factory/ElementFactoryService";

export class QuickMenuBuilder {

    static build(): QuickMenu {

        const quickMenu: QuickMenu = QuickMenu.getInstance();

        const basicBlocksSection: QuickMenuSection = new QuickMenuSection({ quickMenuInstance: quickMenu, title: 'Basic blocks', classList: 'basic-section' });

        basicBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(basicBlocksSection, 'Text', 'Start writing in plain text.', 'icon-material-format', ElementFactoryService.ELEMENT_TYPES.PARAGRAPH, "paragraph text p"),
            new QuickMenuItem(basicBlocksSection, 'Image', 'Upload image.', 'icon-material-aperture', 'image', "image figure photo illustration picture "),
            new QuickMenuItem(basicBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list', "bulleted list unordered list ul"),
            new QuickMenuItem(basicBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list', "numbered list number list sequential list ol enumerated list ordered list"),
            new QuickMenuItem(basicBlocksSection, 'Code', 'Include code snippet.', 'icon-wordpress-code-mark', 'code', "code script source markup"),
            new QuickMenuItem(basicBlocksSection, 'Quote', 'Highlight text as a quote.', 'icon-wordpress-quote', 'quote', "quote blockquote citation quotation"),
            new QuickMenuItem(basicBlocksSection, 'Heading 2', 'Medium header for sections.', 'icon-julia-head-2', ElementFactoryService.ELEMENT_TYPES.HEADER_2, "header 2 heading 2 h2"),
            new QuickMenuItem(basicBlocksSection, 'Heading 3', 'Small header for subsections.', 'icon-julia-head-2', ElementFactoryService.ELEMENT_TYPES.HEADER_3, "header 3 heading 3 h3"),
            new QuickMenuItem(basicBlocksSection, 'Separator', 'Visually divide blocks.', 'icon-wordpress-separator', 'separator', "separator divider rule line")
        ]);

        quickMenu.append(basicBlocksSection);

        const headingBlocksSection = new QuickMenuSection({ quickMenuInstance: quickMenu, title: 'Heading', classList: 'heading-section' });

        headingBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(headingBlocksSection, 'Heading 1', 'Large header for main topics.', 'icon-julia-head-1', ElementFactoryService.ELEMENT_TYPES.HEADER_1, "header 1 heading 1 h1"),
            new QuickMenuItem(headingBlocksSection, 'Heading 2', 'Medium header for sections.', 'icon-julia-head-2', ElementFactoryService.ELEMENT_TYPES.HEADER_2, "header 2 heading 2 h2"),
            new QuickMenuItem(headingBlocksSection, 'Heading 3', 'Small header for subsections.', 'icon-julia-head-3', ElementFactoryService.ELEMENT_TYPES.HEADER_3, "header 3 heading 3 h3"),
            new QuickMenuItem(headingBlocksSection, 'Heading 4', 'Detailed header for subtopics.', 'icon-julia-head-4', ElementFactoryService.ELEMENT_TYPES.HEADER_4, "header 4 heading 4 h4"),
            new QuickMenuItem(headingBlocksSection, 'Heading 5', 'Minor header for specifics.', 'icon-julia-head-5', ElementFactoryService.ELEMENT_TYPES.HEADER_5, "header 5 heading 5 h5"),
            new QuickMenuItem(headingBlocksSection, 'Heading 6', 'Smallest header for fine details.', 'icon-julia-head-6', ElementFactoryService.ELEMENT_TYPES.HEADER_6, "header 6 heading 6 h6"),
        ]);

        quickMenu.append(headingBlocksSection);


        const listBlocksSection = new QuickMenuSection({ quickMenuInstance: quickMenu, title: 'List', classList: 'list-section' });

        listBlocksSection.appendQuickMenuItems([
            new QuickMenuItem(listBlocksSection, 'Todo list', 'Track tasks with checkboxes.', 'icon-material-check-list-2', 'todo-list', "todo list task list checklist"),
            new QuickMenuItem(listBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list', "bulleted list unordered list ul"),
            new QuickMenuItem(listBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list', "numbered list number list sequential list ol enumerated list ordered list")
        ]);

        quickMenu.append(listBlocksSection);

        return quickMenu;
    }
}