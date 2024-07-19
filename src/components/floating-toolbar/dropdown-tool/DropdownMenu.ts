import BaseUIComponent from "../../common/BaseUIComponent";
import DropdownMenuButton from "./DropdownMenuButton";
import DropdownMenuList from "./DropdownMenuList";

class DropdownMenu extends BaseUIComponent {

    display: string;

    dropdownButton: DropdownMenuButton;
    dropdownList: DropdownMenuList;

    constructor(button: DropdownMenuButton, dropdownList: DropdownMenuList) {

        super({});

        this.display = 'block';

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

export default DropdownMenu;