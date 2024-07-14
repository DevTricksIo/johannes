import BaseUIComponent from "../common/BaseUIComponent";
import AddBlockButton from "./AddBlockButton";

class AddBlock extends BaseUIComponent {

    display: string;

    constructor() {
        super({});
        this.display = "block"
    }

    init(): HTMLElement {
        const htmlElement = document.createElement("div");

        htmlElement.classList.add("add-block-wrapper");

        const button = new AddBlockButton();

        htmlElement.appendChild(button.htmlElement);

        return htmlElement;
    }

}

export default AddBlock;