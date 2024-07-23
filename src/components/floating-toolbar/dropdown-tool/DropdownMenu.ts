import { BaseUIComponent } from "../../common/BaseUIComponent";
import { DropdownMenuButton } from "./DropdownMenuButton";
import { DropdownMenuList } from "./DropdownMenuList";

export class DropdownMenu extends BaseUIComponent {

    dropdownButton: DropdownMenuButton;
    dropdownList: DropdownMenuList;

    constructor(button: DropdownMenuButton, dropdownList: DropdownMenuList) {

        super({});

        this.dropdownButton = button;
        this.dropdownList = dropdownList;


        button.documentAppendTo(this.htmlElement);
        dropdownList.documentAppendTo(this.htmlElement);
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("select-wrapper");

        return htmlElement;
    }
}