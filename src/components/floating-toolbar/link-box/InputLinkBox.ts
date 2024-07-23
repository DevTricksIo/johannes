import { BaseUIComponent } from "../../common/BaseUIComponent";

export class InputLinkBox extends BaseUIComponent {

    constructor() {
        super({});
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("input");

        htmlElement.id = "linkBoxInput";
        htmlElement.type = "url";
        htmlElement.placeholder = "Paste or type a link...";

        return htmlElement;
    }
}