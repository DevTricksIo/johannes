import { BaseUIComponent } from "../../common/BaseUIComponent";
import { InputLinkBox } from "./InputLinkBox";

export class InputLinkBoxWrapper extends BaseUIComponent {

    inputLinkBox: InputLinkBox;

    constructor() {
        const inputLinkBox = new InputLinkBox();

        super({
            inputLinkBox: inputLinkBox
        });

        this.inputLinkBox = inputLinkBox;

    }

    init(): HTMLElement {
        const htmlElement = document.createElement("div");

        htmlElement.id = "linkBox";
        htmlElement.style.display = "none";
        htmlElement.classList.add("dependent-box");

        htmlElement.appendChild(this.props.inputLinkBox.htmlElement);

        return htmlElement;
    }
}