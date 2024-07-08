import BaseUIComponent from "../../common/BaseUIComponent";
import TextFormattingBarToolbarButton from "./GroupedButton";

class GroupButton extends BaseUIComponent {

    display: string;

    constructor() {

        super({});

        this.display = "block";
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("item");
        htmlElement.style.marginLeft = "10px";
        htmlElement.style.marginRight = "10px";

        return htmlElement;
    }

    append(toolButton: TextFormattingBarToolbarButton): void {
        //create a data structure to store the dom node element
        this.htmlElement.appendChild(toolButton.htmlElement);
    }
}

export default GroupButton;