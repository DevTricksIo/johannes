import BaseUIComponent from "../../common/BaseUIComponent";

class InputLinkBox extends BaseUIComponent {

    display: string;

    constructor() {
        super({});

        this.display = "block";

    }

    init(): HTMLElement {

        const htmlElement = document.createElement("input");

        htmlElement.id = "linkBoxInput";
        htmlElement.type = "url";
        htmlElement.placeholder = "Paste or type a link...";

        return htmlElement;
    }
}

export default InputLinkBox;