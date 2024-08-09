import { DropdownMenu } from "../components/floating-toolbar/dropdown-tool/DropdownMenu";
import { DropdownMenuList } from "../components/floating-toolbar/dropdown-tool/DropdownMenuList";
import { DropdownMenuListItem } from "../components/floating-toolbar/dropdown-tool/DropdownMenuListItem";
import { SVGIcon } from "../components/common/SVGIcon";
import { FloatingToolbarSeparator } from "../components/floating-toolbar/separator/FloatingToolbarSeparator";
import { ButtonGroup } from "../components/floating-toolbar/button-group/ButtonGroup";
import { ButtonGroupItem } from "../components/floating-toolbar/button-group/ButtonGroupItem";
import { ColorIcon } from "../components/floating-toolbar/dropdown-tool/ColorIcon";
import { DropdownMenuButton } from "../components/floating-toolbar/dropdown-tool/DropdownMenuButton";
import { BlockOperationsService } from "../services/block-operations/BlockOperationsService";
import { DropdownMenuListItemTitle } from "@/components/floating-toolbar/dropdown-tool/DropdownMenuListItemTitle";
import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { Commands } from "@/commands/Commands";
import { Icons } from "@/common/Icons";
import { Sizes } from "@/common/Sizes";
import { Colors } from "@/common/Colors";
import { TextContextFloatingToolbar } from "@/components/floating-toolbar/TextContextFloatingToolbar";
import { ButtonIDs } from "@/core/ButtonIDs";
import { DropdownItemIDs } from "@/core/DropdownItemIDs";
import { DropdownListIDs } from "@/core/DropdownListIDs";
import { DropdownMenuIDs } from "@/core/DropdownMenuIDs";

export class TextContextFloatingToolbarBuilder {

    static build(): TextContextFloatingToolbar {

        const id = ""
        const floatingBar = TextContextFloatingToolbar.getInstance();

        floatingBar.appendDropdown(TextContextFloatingToolbarBuilder.turnIntoDropdown());
        floatingBar.appendSeparator(TextContextFloatingToolbarBuilder.separator("turnIntoSeparator"));
        floatingBar.appendButtonGroup(TextContextFloatingToolbarBuilder.buttonGroup());
        floatingBar.appendDropdown(TextContextFloatingToolbarBuilder.colorDropdown());
        floatingBar.appendSeparator(TextContextFloatingToolbarBuilder.separator("textOperationsSeparator"));
        floatingBar.appendDropdown(TextContextFloatingToolbarBuilder.moreOptionsDropdown());

        return floatingBar;
    }

    static turnIntoDropdown(): DropdownMenu {

        const turnIntoBarList = new DropdownMenuList("turnIntoSelect");
        const turnIntoBarButton = new DropdownMenuButton("turnIntoButton", "Text", turnIntoBarList);
        const turnIntoDropdown = new DropdownMenu("turnIntoMenu", turnIntoBarButton, turnIntoBarList);

        turnIntoBarList.append(new DropdownMenuListItemTitle(turnIntoBarList, "Turn into"));

        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionText", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.PARAGRAPH, SVGIcons.paragraph.htmlElement, "Text", "Ctrl+Shift+Enter"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionTodoList", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.CHECK_LIST, SVGIcons.todo_list.htmlElement, "Todo list", "Ctrl+1"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionBulletedList", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.BULLETED_LIST, SVGIcons.b_list.htmlElement, "Bulleted list", "Ctrl+."));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionNumberedList", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.NUMBERED_LIST, SVGIcons.n_list.htmlElement, "Numbered list", "Ctrl+/"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionBlockCode", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.CODE, SVGIcons.code.htmlElement, "Block code"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionQuote", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.QUOTE, SVGIcons.quote.htmlElement, "Quote"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading1", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_1, SVGIcons.head1.htmlElement, "Heading 1", "Ctrl+Alt+1"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading2", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_2, SVGIcons.head2.htmlElement, "Heading 2", "Ctrl+Alt+2"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading3", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_3, SVGIcons.head3.htmlElement, "Heading 3", "Ctrl+Alt+3"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading4", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_4, SVGIcons.head4.htmlElement, "Heading 4", "Ctrl+Alt+4"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading5", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_5, SVGIcons.head5.htmlElement, "Heading 5", "Ctrl+Alt+5"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionHeading6", turnIntoBarList, BlockOperationsService.BLOCK_OPERATIONS.TRANSFORM_BLOCK, ElementFactoryService.ELEMENT_TYPES.HEADER_6, SVGIcons.head6.htmlElement, "Heading 6", "Ctrl+Alt+6"));

        return turnIntoDropdown;
    }

    static separator(id: string): FloatingToolbarSeparator {
        return new FloatingToolbarSeparator(id);
    }

    static buttonGroup(): ButtonGroup {
        const groupButton = new ButtonGroup();

        ButtonGroupItem.create(ButtonIDs.Link, Commands.toggleLink, "Link", SVGIcon.create(Icons.Link, Sizes.large)).appendTo(groupButton);
        ButtonGroupItem.create(ButtonIDs.Bold, Commands.toggleBold, "Bold", SVGIcon.create(Icons.Bold, Sizes.large)).appendTo(groupButton);
        ButtonGroupItem.create(ButtonIDs.Italic, Commands.toggleItalic, "Italic", SVGIcon.create(Icons.Italic, Sizes.large)).appendTo(groupButton);
        ButtonGroupItem.create(ButtonIDs.Underline, Commands.toggleUnderline, "Underline", SVGIcon.create(Icons.Underline, Sizes.large)).appendTo(groupButton);
        ButtonGroupItem.create(ButtonIDs.InlineCode, Commands.toggleInlineCode, "Code", SVGIcon.create(Icons.InlineCode, Sizes.large)).appendTo(groupButton);
        ButtonGroupItem.create(ButtonIDs.Strikethrough, Commands.toggleStrikeThrough, "Strike-through", SVGIcon.create(Icons.StrikeThrough, Sizes.large)).appendTo(groupButton);

        return groupButton;
    }

    static colorDropdown(): DropdownMenu {

        const colorDropdownList = new DropdownMenuList(DropdownListIDs.ColorTextOptionSelect);
        const colorButton = new DropdownMenuButton("colorTextButton", new ColorIcon("#FAF4D1").htmlElement, colorDropdownList);
        const colorDropdown = new DropdownMenu(DropdownMenuIDs.ColorTextOptionsMenu, colorButton, colorDropdownList);

        colorDropdownList.append(new DropdownMenuListItemTitle(colorDropdownList, "Background"));

        const hiliteColorRed = new DropdownMenuListItem(DropdownItemIDs.BackgroundOptionRed, colorDropdownList, Commands.toggleHiliteColor, Colors.HiliteColorRed, new ColorIcon(Colors.HiliteColorRed).htmlElement, "Red");
        hiliteColorRed.addClass("hiliteColor");

        const HiliteColorGreen = new DropdownMenuListItem(DropdownItemIDs.BackgroundOptionGreen, colorDropdownList, Commands.toggleHiliteColor, Colors.HiliteColorGreen, new ColorIcon(Colors.HiliteColorGreen).htmlElement, "Green");
        HiliteColorGreen.addClass("hiliteColor");

        const hiliteColorBlue = new DropdownMenuListItem(DropdownItemIDs.BackgroundOptionBlue, colorDropdownList, Commands.toggleHiliteColor, Colors.HiliteColorBlue, new ColorIcon(Colors.HiliteColorBlue).htmlElement, "Blue");
        hiliteColorBlue.addClass("hiliteColor");

        const hiliteColorYellow = new DropdownMenuListItem(DropdownItemIDs.BackgroundOptionYellow, colorDropdownList, Commands.toggleHiliteColor, Colors.HiliteColorYellow, new ColorIcon(Colors.HiliteColorYellow).htmlElement, "Yellow");
        hiliteColorYellow.addClass("hiliteColor");

        const hiliteColorGrey = new DropdownMenuListItem(DropdownItemIDs.BackgroundOptionGrey, colorDropdownList, Commands.toggleHiliteColor, Colors.HiliteColorGrey, new ColorIcon(Colors.HiliteColorGrey).htmlElement, "Grey");
        hiliteColorGrey.addClass("hiliteColor");

        const hiliteColorNone = new DropdownMenuListItem(DropdownItemIDs.BackgroundOptionNone, colorDropdownList, Commands.toggleHiliteColor, Colors.HiliteColorNone, new ColorIcon(Colors.HiliteColorNone).htmlElement, "None");
        hiliteColorNone.addClass("hiliteColor");

        colorDropdownList.append(hiliteColorRed);
        colorDropdownList.append(HiliteColorGreen);
        colorDropdownList.append(hiliteColorBlue);
        colorDropdownList.append(hiliteColorYellow);
        colorDropdownList.append(hiliteColorGrey);
        colorDropdownList.append(hiliteColorNone);

        colorDropdownList.append(new DropdownMenuListItemTitle(colorDropdownList, "Color"));

        const foreColorRed = new DropdownMenuListItem("colorOptionRed", colorDropdownList, Commands.toggleForeColor, Colors.ForeColorRed, new SVGIcon("icon-material-format", Sizes.large).htmlElement, "Red");
        foreColorRed.addClass("foreColor");

        const foreColorGreen = new DropdownMenuListItem("colorOptionGreen", colorDropdownList, Commands.toggleForeColor, Colors.ForeColorGreen, new SVGIcon("icon-material-format", Sizes.large).htmlElement, "Green");
        foreColorGreen.addClass("foreColor");

        const foreColorBlue = new DropdownMenuListItem("colorOptionBlue", colorDropdownList, Commands.toggleForeColor, Colors.ForeColorBlue, new SVGIcon("icon-material-format", Sizes.large).htmlElement, "Blue");
        foreColorBlue.addClass("foreColor");

        const foreColorYellow = new DropdownMenuListItem("colorOptionYellow", colorDropdownList, Commands.toggleForeColor, Colors.ForeColorYellow, new SVGIcon("icon-material-format", Sizes.large).htmlElement, "Yellow");
        foreColorYellow.addClass("foreColor");

        const foreColorGrey = new DropdownMenuListItem("colorOptionGrey", colorDropdownList, Commands.toggleForeColor, Colors.ForeColorGrey, new SVGIcon("icon-material-format", Sizes.large).htmlElement, "Grey");
        foreColorGrey.addClass("foreColor");

        const foreColorNone = new DropdownMenuListItem("colorOptionNone", colorDropdownList, Commands.toggleForeColor, Colors.ForeColorInitial, new SVGIcon("icon-material-format", Sizes.large).htmlElement, "None");
        foreColorNone.addClass("foreColor");

        colorDropdownList.append(foreColorRed);
        colorDropdownList.append(foreColorGreen);
        colorDropdownList.append(foreColorBlue);
        colorDropdownList.append(foreColorYellow);
        colorDropdownList.append(foreColorGrey);
        colorDropdownList.append(foreColorNone);

        return colorDropdown;
    }

    static moreOptionsDropdown(): DropdownMenu {

        const icon = new SVGIcon("icon-material-more", Sizes.large);

        const moreOptionsList = new DropdownMenuList("moreTextOptionSelect");
        const moreOptionsButton = new DropdownMenuButton("moreTextOptionButton", icon.htmlElement, moreOptionsList, false);
        const moreOptionsDropdown = new DropdownMenu("moreTextOptionsMenu", moreOptionsButton, moreOptionsList);

        moreOptionsList.append(new DropdownMenuListItemTitle(moreOptionsList, "More options"));

        moreOptionsList.append(new DropdownMenuListItem("copyOption", moreOptionsList, BlockOperationsService.BLOCK_OPERATIONS.COPY, null, SVGIcons.copy.htmlElement, "Copy", "Ctrl+C"));
        moreOptionsList.append(new DropdownMenuListItem("cutOption", moreOptionsList, BlockOperationsService.BLOCK_OPERATIONS.CUT, null, SVGIcons.cut.htmlElement, "Cut", "Ctrl+X"));
        moreOptionsList.append(new DropdownMenuListItem("pasteOption", moreOptionsList, BlockOperationsService.BLOCK_OPERATIONS.PASTE, null, SVGIcons.paste.htmlElement, "Replace", "Ctrl+V"));
        moreOptionsList.append(new DropdownMenuListItem("duplicateOption", moreOptionsList, BlockOperationsService.BLOCK_OPERATIONS.DUPLICATE, null, SVGIcons.duplicate.htmlElement, "Clone Block", "Ctrl+D"));
        moreOptionsList.append(new DropdownMenuListItem("resetOption", moreOptionsList, BlockOperationsService.BLOCK_OPERATIONS.REMOVE_FORMAT, null, SVGIcons.eraser.htmlElement, "Reset Style", "Ctrl+\\"));

        const deleteItem = new DropdownMenuListItem("deleteOption", moreOptionsList, BlockOperationsService.BLOCK_OPERATIONS.DELETE, null, SVGIcons.delete.htmlElement, "Delete Block", "Shift+Del");
        deleteItem.addCssClass("danger-option");

        moreOptionsList.append(deleteItem);

        return moreOptionsDropdown;
    }
}

const SVGIcons: any = {

    paragraph: new SVGIcon("icon-material-format", "1.25rem"),
    todo_list: new SVGIcon("icon-material-check-list-2", Sizes.large),
    b_list: new SVGIcon("icon-wordpress-bulleted-list", Sizes.large),
    n_list: new SVGIcon("icon-wordpress-numbered-list", Sizes.large),
    code: new SVGIcon("icon-wordpress-code-mark", Sizes.large),
    quote: new SVGIcon("icon-wordpress-quote", Sizes.large),
    head1: new SVGIcon("icon-julia-head-1", Sizes.large),
    head2: new SVGIcon("icon-julia-head-2", Sizes.large),
    head3: new SVGIcon("icon-julia-head-3", Sizes.large),
    head4: new SVGIcon("icon-julia-head-4", Sizes.large),
    head5: new SVGIcon("icon-julia-head-5", Sizes.large),
    head6: new SVGIcon("icon-julia-head-6", Sizes.large),
    duplicate: new SVGIcon("icon-material-duplicate", Sizes.large),
    delete: new SVGIcon("icon-material-trash", Sizes.large),
    eraser: new SVGIcon("icon-material-clear", Sizes.large),
    copy: new SVGIcon("icon-material-copy", Sizes.large),
    cut: new SVGIcon("icon-material-cut", Sizes.large),
    paste: new SVGIcon("icon-material-paste", Sizes.large)
}