import BaseUIComponent from "../../common/BaseUIComponent";
import TextFormattingBarButton from "./DropdownMenuButton";
import DropdownMenuList from "./DropdownMenuList";

class DropdownMenu extends BaseUIComponent {

    display: string;

    constructor(button: TextFormattingBarButton, dropdownList: DropdownMenuList) {

        super({});

        this.display = 'block';

        //add validation that verify if the arial target from button equals to id dropdown list

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