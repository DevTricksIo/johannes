import DropdownMenu from "../components/floating-toolbar/dropdown-tool/DropdownMenu";
import DropdownMenuToggleButton from "../components/floating-toolbar/dropdown-tool/DropdownMenuButton";
import FloatingToolbar from "../components/floating-toolbar/FloatingToolbar";
import DropdownMenuList from "../components/floating-toolbar/dropdown-tool/DropdownMenuList";
import DropdownMenuListItem from "../components/floating-toolbar/dropdown-tool/DropdownMenuListItem";
import SVGIcon from "../components/common/SVGIcon";
import Separator from "../components/floating-toolbar/separator/Separator";
import GroupButton from "../components/floating-toolbar/group-button/GroupButton";
import GroupedButton from "../components/floating-toolbar/group-button/GroupedButton";
import ColorIcon from "../components/floating-toolbar/dropdown-tool/ColorIcon";
import TextOperationService from "../services/text-operations/TextOperationService";

class FloatingToolbarBuilder {

    static build(): FloatingToolbar {

        const textFormattingBar = new FloatingToolbar();

        textFormattingBar.appendDropdown(FloatingToolbarBuilder.turnIntoDropdown());
        textFormattingBar.appendSeparator(FloatingToolbarBuilder.separator());
        textFormattingBar.appendSeparator(FloatingToolbarBuilder.groupButton());
        textFormattingBar.appendDropdown(FloatingToolbarBuilder.colorDropdown());
        textFormattingBar.appendSeparator(FloatingToolbarBuilder.separator());
        textFormattingBar.appendSeparator(FloatingToolbarBuilder.moreOptionsDropdown());

        return textFormattingBar;
    }

    static turnIntoDropdown(): DropdownMenu {

        const textOperationService = new TextOperationService("bold");

        const turnIntoBarList = new DropdownMenuList("turnIntoSelect", "Turn into");
        const turnIntoBarButton = new DropdownMenuToggleButton("turnIntoButton", "Text", turnIntoBarList);
        const turnIntoDropdown = new DropdownMenu(turnIntoBarButton, turnIntoBarList);

        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.paragraph.htmlElement, "Text", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.b_list.htmlElement, "Bulleted list", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.n_list.htmlElement, "Numbered list", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.code.htmlElement, "Code", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.quote.htmlElement, "Quote", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.head1.htmlElement, "Heading 1", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.head2.htmlElement, "Heading 2", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.head3.htmlElement, "Heading 3", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.head4.htmlElement, "Heading 4", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.head5.htmlElement, "Heading 5", "p"));
        turnIntoBarList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.head6.htmlElement, "Heading 6", "p"));

        return turnIntoDropdown;
    }

    static separator(): Separator {
        return new Separator();
    }

    static groupButton(): GroupButton {

        const groupButton = new GroupButton();

        new GroupedButton(new TextOperationService("copy"), "Link", "icon-material-link").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(new TextOperationService("bold"), "Bold", "icon-wordpress-bold").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(new TextOperationService("italic"), "Italic", "icon-material-italic").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(new TextOperationService("underline"), "Underline", "icon-material-underline").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(new TextOperationService("copy"), "Code", "icon-wordpress-code-mark").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(new TextOperationService("strikeThrough"), "Strike-through", "icon-wordpress-strike-through").documentAppendTo(groupButton.htmlElement);
        new GroupedButton(new TextOperationService("copy"), "Equation", "icon-wordpress-equation-mark").documentAppendTo(groupButton.htmlElement);

        return groupButton;
    }

    static colorDropdown(): DropdownMenu {

        const colorDropdownList = new DropdownMenuList("colorTextOptionSelect", "Background");
        const colorButton = new DropdownMenuToggleButton("colorTextButton", new ColorIcon("#FAF4D1").htmlElement, colorDropdownList);
        const colorDropdown = new DropdownMenu(colorButton, colorDropdownList);

        colorDropdownList.append(new DropdownMenuListItem(new TextOperationService("hiliteColor", "#FDDEDE"), "useCSS", new ColorIcon("#FDDEDE").htmlElement, "Red", "p"));
        colorDropdownList.append(new DropdownMenuListItem(new TextOperationService("hiliteColor", "#D7F7DC"), "useCSS", new ColorIcon("#D7F7DC").htmlElement, "Green", "p"));
        colorDropdownList.append(new DropdownMenuListItem(new TextOperationService("hiliteColor", "#D9EDF6"), "useCSS", new ColorIcon("#D9EDF6").htmlElement, "Blue", "p"));
        colorDropdownList.append(new DropdownMenuListItem(new TextOperationService("hiliteColor", "#FAF4D1"), "useCSS", new ColorIcon("#FAF4D1").htmlElement, "Yellow", "p"));
        colorDropdownList.append(new DropdownMenuListItem(new TextOperationService("hiliteColor", "#E1E0E0"), "useCSS", new ColorIcon("#E1E0E0").htmlElement, "Grey", "p"));
        colorDropdownList.append(new DropdownMenuListItem(new TextOperationService("hiliteColor", "transparent"), "useCSS", new ColorIcon("transparent").htmlElement, "None", "p"));

        return colorDropdown;
    }

    static moreOptionsDropdown(): DropdownMenu {

        const icon = new SVGIcon("icon-material-more", "24", "24");

        const textOperationService = new TextOperationService("bold");
        const moreOptionsList = new DropdownMenuList("moreTextOptionSelect", "More options");
        const moreOptionsButton = new DropdownMenuToggleButton("moreTextOptionButton", icon.htmlElement, moreOptionsList, false);
        const moreOptionsDropdown = new DropdownMenu(moreOptionsButton, moreOptionsList);

        moreOptionsList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.duplicate.htmlElement, "Duplicate", "p"));
        moreOptionsList.append(new DropdownMenuListItem(textOperationService, "", SVGIcons.delete.htmlElement, "Delete", "p"));

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