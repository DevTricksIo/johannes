import BaseUIComponent from "../../common/BaseUIComponent";

class GroupButton extends BaseUIComponent {

    display: string;

    constructor() {

        super({});

        this.display = "block";
        // this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("item");
        htmlElement.style.marginLeft = "10px";
        htmlElement.style.marginRight = "10px";

        return htmlElement;
    }

}

export default GroupButton;