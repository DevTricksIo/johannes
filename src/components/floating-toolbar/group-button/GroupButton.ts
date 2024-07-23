import { BaseUIComponent } from "../../common/BaseUIComponent";

export class GroupButton extends BaseUIComponent {

    constructor() {

        super({});

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