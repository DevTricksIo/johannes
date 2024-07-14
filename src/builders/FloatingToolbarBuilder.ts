import DropdownMenu from "../components/floating-toolbar/dropdown-tool/DropdownMenu";
import FloatingToolbar from "../components/floating-toolbar/FloatingToolbar";
import DropdownMenuList from "../components/floating-toolbar/dropdown-tool/DropdownMenuList";
import DropdownMenuListItem from "../components/floating-toolbar/dropdown-tool/DropdownMenuListItem";
import SVGIcon from "../components/common/SVGIcon";
import FloatingToolbarSeparator from "../components/floating-toolbar/separator/FloatingToolbarSeparator";
import GroupButton from "../components/floating-toolbar/group-button/GroupButton";
import GroupedButton from "../components/floating-toolbar/group-button/GroupedButton";
import ColorIcon from "../components/floating-toolbar/dropdown-tool/ColorIcon";
import TextOperationService from "../services/text-operations/TextOperationService";
import ElementFactoryService from "../services/element-factory/ElementFactoryService";
import DropdownMenuButton from "../components/floating-toolbar/dropdown-tool/DropdownMenuButton";
import BlockOperationsService, { BLOCK_OPERATIONS } from "../services/block-operations/BlockOperationsService";

class FloatingToolbarBuilder {

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

        const turnIntoBarList = new DropdownMenuList("turnIntoSelect", "Turn into");
        const turnIntoBarButton = new DropdownMenuButton("turnIntoButton", "Text", turnIntoBarList);
        const turnIntoDropdown = new DropdownMenu(turnIntoBarButton, turnIntoBarList);

        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "p", null, SVGIcons.paragraph.htmlElement, "Text"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "bulleted-list", null, SVGIcons.b_list.htmlElement, "Bulleted list"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "numbered-list", null, SVGIcons.n_list.htmlElement, "Numbered list"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(),"code", null, SVGIcons.code.htmlElement, "Code"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "quote", null, SVGIcons.quote.htmlElement, "Quote"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "h1", null, SVGIcons.head1.htmlElement, "Heading 1"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "h2", null, SVGIcons.head2.htmlElement, "Heading 2"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "h3", null, SVGIcons.head3.htmlElement, "Heading 3"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "h4", null, SVGIcons.head4.htmlElement, "Heading 4"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "h5", null, SVGIcons.head5.htmlElement, "Heading 5"));
        turnIntoBarList.append(new DropdownMenuListItem(turnIntoBarList, BlockOperationsService.getInstance(), "h6", null, SVGIcons.head6.htmlElement, "Heading 6"));

        return turnIntoDropdown;
    }

    static separator(): FloatingToolbarSeparator {
        return new FloatingToolbarSeparator();
    }

    static groupButton(): GroupButton {

        const groupButton = new GroupButton();

        new GroupedButton(TextOperationService.getInstance(),"link", "Link", "icon-material-link").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "bold", "Bold", "icon-wordpress-bold").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "italic", "Italic", "icon-material-italic").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "underline", "Underline", "icon-material-underline").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "copy", "Code", "icon-wordpress-code-mark").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "strikeThrough", "Strike-through", "icon-wordpress-strike-through").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(TextOperationService.getInstance(), "copy", "Equation", "icon-wordpress-equation-mark").documentAppendTo(groupButton.htmlElement);

        return groupButton;
    }

    static colorDropdown(): DropdownMenu {

        const colorDropdownList = new DropdownMenuList("colorTextOptionSelect", "Background");
        const colorButton = new DropdownMenuButton("colorTextButton", new ColorIcon("#FAF4D1").htmlElement, colorDropdownList);
        const colorDropdown = new DropdownMenu(colorButton, colorDropdownList);

        colorDropdownList.append(new DropdownMenuListItem(colorDropdownList, BlockOperationsService.getInstance(), "hiliteColor", "#FDDEDE", new ColorIcon("#FDDEDE").htmlElement, "Red"));
        colorDropdownList.append(new DropdownMenuListItem(colorDropdownList, BlockOperationsService.getInstance(), "hiliteColor", "#D7F7DC", new ColorIcon("#D7F7DC").htmlElement, "Green"));
        colorDropdownList.append(new DropdownMenuListItem(colorDropdownList, BlockOperationsService.getInstance(), "hiliteColor", "#D9EDF6", new ColorIcon("#D9EDF6").htmlElement, "Blue"));
        colorDropdownList.append(new DropdownMenuListItem(colorDropdownList, BlockOperationsService.getInstance(), "hiliteColor", "#FAF4D1", new ColorIcon("#FAF4D1").htmlElement, "Yellow"));
        colorDropdownList.append(new DropdownMenuListItem(colorDropdownList, BlockOperationsService.getInstance(), "hiliteColor", "#E1E0E0", new ColorIcon("#E1E0E0").htmlElement, "Grey"));
        colorDropdownList.append(new DropdownMenuListItem(colorDropdownList, BlockOperationsService.getInstance(), "hiliteColor", "transparent", new ColorIcon("transparent").htmlElement, "None"));

        return colorDropdown;
    }

    static moreOptionsDropdown(): DropdownMenu {

        const icon = new SVGIcon("icon-material-more", "24", "24");

        const moreOptionsList = new DropdownMenuList("moreTextOptionSelect", "More options");
        const moreOptionsButton = new DropdownMenuButton("moreTextOptionButton", icon.htmlElement, moreOptionsList, false);
        const moreOptionsDropdown = new DropdownMenu(moreOptionsButton, moreOptionsList);

        moreOptionsList.append(new DropdownMenuListItem(moreOptionsList, BlockOperationsService.getInstance(), "duplicate", null, SVGIcons.duplicate.htmlElement, "Duplicate"));
        moreOptionsList.append(new DropdownMenuListItem(moreOptionsList, BlockOperationsService.getInstance(), "delete", null, SVGIcons.delete.htmlElement, "Delete"));

        return moreOptionsDropdown;
    }
}

const SVGIcons: any = {

    paragraph: new SVGIcon("icon-wordpress-paragraph", "22", "22"),
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
    delete: new SVGIcon("icon-material-trash", "22", "22"),
}

export default FloatingToolbarBuilder;