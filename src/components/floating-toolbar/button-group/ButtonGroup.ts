import { BaseUIComponent } from "../../common/BaseUIComponent";

export class ButtonGroup extends BaseUIComponent {

    constructor() {

        super({});
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("item");
        // htmlElement.style.marginLeft = "10px";
        // htmlElement.style.marginRight = "10px";

        return htmlElement;
    }

}