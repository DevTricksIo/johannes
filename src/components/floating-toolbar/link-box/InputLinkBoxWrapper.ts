import BaseUIComponent from "../../common/BaseUIComponent";
import InputLinkBox from "./InputLinkBox";

class InputLinkBoxWrapper extends BaseUIComponent {

    display: string;
    inputLinkBox: InputLinkBox;

    constructor() {
        const inputLinkBox = new InputLinkBox();

        super({
            inputLinkBox: inputLinkBox
        });

        this.display = "block";
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

export default InputLinkBoxWrapper;