import { DropdownMenu } from "../components/floating-toolbar/dropdown-tool/DropdownMenu";
import { FloatingToolbar } from "../components/floating-toolbar/FloatingToolbar";
import { DropdownMenuList } from "../components/floating-toolbar/dropdown-tool/DropdownMenuList";
import { DropdownMenuListItem } from "../components/floating-toolbar/dropdown-tool/DropdownMenuListItem";
import { SVGIcon } from "../components/common/SVGIcon";
import { FloatingToolbarSeparator } from "../components/floating-toolbar/separator/FloatingToolbarSeparator";
import { GroupButton } from "../components/floating-toolbar/group-button/GroupButton";
import { GroupedButton } from "../components/floating-toolbar/group-button/GroupedButton";
import { ColorIcon } from "../components/floating-toolbar/dropdown-tool/ColorIcon";
import { TextOperationService } from "../services/text-operations/TextOperationService";
import { DropdownMenuButton } from "../components/floating-toolbar/dropdown-tool/DropdownMenuButton";
import { BlockOperationsService } from "../services/block-operations/BlockOperationsService";
import { DropdownMenuListItemTitle } from "@/components/floating-toolbar/dropdown-tool/DropdownMenuListItemTitle";
import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";

export class FloatingToolbarBuilder {

    static build(): FloatingToolbar {

        const floatingBar = new FloatingToolbar();

        floatingBar.appendDropdown(FloatingToolbarBuilder.turnIntoDropdown());
        floatingBar.appendSeparator(FloatingToolbarBuilder.separator());
        floatingBar.appendSeparator(FloatingToolbarBuilder.groupButton());
        floatingBar.appendDropdown(FloatingToolbarBuilder.colorDropdown());
        floatingBar.appendSeparator(FloatingToolbarBuilder.separator());
        floatingBar.appendDropdown(FloatingToolbarBuilder.moreOptionsDropdown());

        return floatingBar;
    }

    static turnIntoDropdown(): DropdownMenu {

        const turnIntoBarList = new DropdownMenuList("turnIntoSelect");
        const turnIntoBarButton = new DropdownMenuButton("turnIntoButton", "Text", turnIntoBarList);
        const turnIntoDropdown = new DropdownMenu(turnIntoBarButton, turnIntoBarList);


        turnIntoBarList.append(new DropdownMenuListItemTitle(turnIntoBarList, "Turn into"));

        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionText", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.PARAGRAPH, SVGIcons.paragraph.htmlElement, "Text"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionTodoList", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.CHECKBOX_ITEM, SVGIcons.todo_list.htmlElement, "Todo list", "Ctrl+1"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionBulletedList", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.BULLETED_LIST, SVGIcons.b_list.htmlElement, "Bulleted list", "Ctrl+."));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionNumberedList", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.NUMBERED_LIST, SVGIcons.n_list.htmlElement, "Numbered list", "Ctrl+/"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionBlockCode", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, "code", SVGIcons.code.htmlElement, "Block Code"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionQuote", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, "quote", SVGIcons.quote.htmlElement, "Quote"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading1", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_1, SVGIcons.head1.htmlElement, "Heading 1", "Ctrl+Alt+1"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading2", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_2, SVGIcons.head2.htmlElement, "Heading 2", "Ctrl+Alt+2"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading3", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_3, SVGIcons.head3.htmlElement, "Heading 3", "Ctrl+Alt+3"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading4", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_4, SVGIcons.head4.htmlElement, "Heading 4", "Ctrl+Alt+4"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading5", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_5, SVGIcons.head5.htmlElement, "Heading 5", "Ctrl+Alt+5"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading6", turnIntoBarList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_6, SVGIcons.head6.htmlElement, "Heading 6", "Ctrl+Alt+6"));

        return turnIntoDropdown;
    }

    static separator(): FloatingToolbarSeparator {
        return new FloatingToolbarSeparator();
    }

    static groupButton(): GroupButton {

        const groupButton = new GroupButton();

        new GroupedButton(TextOperationService.getInstance(), TextOperationService.QUERY_TEXT_OPERATIONS.CREATE_LINK, "Link", "icon-material-link").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "bold", "Bold", "icon-wordpress-bold").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "italic", "Italic", "icon-material-italic").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), TextOperationService.QUERY_TEXT_OPERATIONS.UNDERLINE, "Underline", "icon-material-underline").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), TextOperationService.QUERY_TEXT_OPERATIONS.INLINE_CODE, "Code", "icon-wordpress-code-mark").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "strikeThrough", "Strike-through", "icon-wordpress-strike-through").documentAppendTo(groupButton.htmlElement);
        // new GroupedButton(TextOperationService.getInstance(), "copy", "Equation", "icon-wordpress-equation-mark").documentAppendTo(groupButton.htmlElement);

        return groupButton;
    }

    static colorDropdown(): DropdownMenu {

        const colorDropdownList = new DropdownMenuList("colorTextOptionSelect");
        const colorButton = new DropdownMenuButton("colorTextButton", new ColorIcon("#FAF4D1").htmlElement, colorDropdownList);
        const colorDropdown = new DropdownMenu(colorButton, colorDropdownList);

        colorDropdownList.append(new DropdownMenuListItemTitle(colorDropdownList, "Background"));

        const textOperationService = TextOperationService.getInstance();
        
        colorDropdownList.append(new DropdownMenuListItem("backgroundOptionRed", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR, "#FDDEDE", new ColorIcon("#FDDEDE").htmlElement, "Red"));
        colorDropdownList.append(new DropdownMenuListItem("backgroundOptionGreen", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR, "#D7F7DC", new ColorIcon("#D7F7DC").htmlElement, "Green"));
        colorDropdownList.append(new DropdownMenuListItem("backgroundOptionBlue", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR, "#D9EDF6", new ColorIcon("#D9EDF6").htmlElement, "Blue"));
        colorDropdownList.append(new DropdownMenuListItem("backgroundOptionYellow", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR, "#FAF4D1", new ColorIcon("#FAF4D1").htmlElement, "Yellow"));
        colorDropdownList.append(new DropdownMenuListItem("backgroundOptionGrey", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR, "#E1E0E0", new ColorIcon("#E1E0E0").htmlElement, "Grey"));
        colorDropdownList.append(new DropdownMenuListItem("backgroundOptionNone", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR, "transparent", new ColorIcon("transparent").htmlElement, "None"));

        
        colorDropdownList.append(new DropdownMenuListItemTitle(colorDropdownList, "Color"));

        colorDropdownList.append(new DropdownMenuListItem("colorOptionRed",colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR, "#D44C47", new SVGIcon("icon-material-format", "22", "22").htmlElement, "Red"));
        colorDropdownList.append(new DropdownMenuListItem("colorOptionGreen", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR, "#448361", new SVGIcon("icon-material-format", "22", "22").htmlElement, "Green"));
        colorDropdownList.append(new DropdownMenuListItem("colorOptionBlue", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR, "#337EA9", new SVGIcon("icon-material-format", "22", "22").htmlElement, "Blue"));
        colorDropdownList.append(new DropdownMenuListItem("colorOptionYellow", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR, "#CB912F", new SVGIcon("icon-material-format", "22", "22").htmlElement, "Yellow"));
        colorDropdownList.append(new DropdownMenuListItem("colorOptionGrey", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR, "#787774", new SVGIcon("icon-material-format", "22", "22").htmlElement, "Grey"));
        colorDropdownList.append(new DropdownMenuListItem("colorOptionNone", colorDropdownList, textOperationService, TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR, "initial", new SVGIcon("icon-material-format", "22", "22").htmlElement, "None"));
        
        return colorDropdown;
    }

    static moreOptionsDropdown(): DropdownMenu {

        const icon = new SVGIcon("icon-material-more", "24", "24");

        const moreOptionsList = new DropdownMenuList("moreTextOptionSelect");
        const moreOptionsButton = new DropdownMenuButton("moreTextOptionButton", icon.htmlElement, moreOptionsList, false);
        const moreOptionsDropdown = new DropdownMenu(moreOptionsButton, moreOptionsList);

        moreOptionsList.append(new DropdownMenuListItemTitle(moreOptionsList, "More options"));

        moreOptionsList.append(new DropdownMenuListItem("copyOption", moreOptionsList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.COPY, null, SVGIcons.copy.htmlElement, "Copy", "Ctrl+C"));
        moreOptionsList.append(new DropdownMenuListItem("cutOption", moreOptionsList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.CUT, null, SVGIcons.cut.htmlElement, "Cut", "Ctrl+X"));
        moreOptionsList.append(new DropdownMenuListItem("pasteOption", moreOptionsList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.PASTE, null, SVGIcons.paste.htmlElement, "Replace", "Ctrl+V"));
        moreOptionsList.append(new DropdownMenuListItem("duplicateOption", moreOptionsList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.DUPLICATE, null, SVGIcons.duplicate.htmlElement, "Clone Block", "Ctrl+D"));
        moreOptionsList.append(new DropdownMenuListItem("resetOption", moreOptionsList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.REMOVE_FORMAT, null, SVGIcons.eraser.htmlElement, "Reset Style", "Ctrl+\\"));
        moreOptionsList.append(new DropdownMenuListItem("deleteOption", moreOptionsList, BlockOperationsService.getInstance(), BlockOperationsService.BLOCK_OPERATIONS.DELETE, null, SVGIcons.delete.htmlElement, "Delete Block", "Shift+Del"));

        return moreOptionsDropdown;
    }
}

const SVGIcons: any = {

    paragraph: new SVGIcon("icon-wordpress-paragraph", "22", "22"),
    todo_list: new SVGIcon("icon-material-check-list", "22", "22"),
    b_list: new SVGIcon("icon-wordpress-bulleted-list", "22", "22"),
    n_list: new SVGIcon("icon-wordpress-numbered-list", "22", "22"),
    code: new SVGIcon("icon-wordpress-numbered-list", "22", "22"),
    quote: new SVGIcon("icon-wordpress-quote", "22", "22"),
    head1: new SVGIcon("icon-julia-head-1", "22", "22"),
    head2: new SVGIcon("icon-julia-head-2", "22", "22"),
    head3: new SVGIcon("icon-julia-head-3", "22", "22"),
    head4: new SVGIcon("icon-julia-head-4", "22", "22"),
    head5: new SVGIcon("icon-julia-head-5", "22", "22"),
    head6: new SVGIcon("icon-julia-head-6", "22", "22"),
    duplicate: new SVGIcon("icon-material-duplicate", "22", "22"),
    delete: new SVGIcon("icon-material-trash", "18", "18"),
    eraser: new SVGIcon("icon-material-clear", "22", "22"),
    copy: new SVGIcon("icon-material-copy", "22", "22"),
    cut: new SVGIcon("icon-material-cut", "22", "22"),
    paste: new SVGIcon("icon-material-paste", "22", "22"),
}