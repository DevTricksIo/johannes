import BaseUIComponent from "../../common/BaseUIComponent";

class Separator extends BaseUIComponent {

    display: string;

    constructor() {

        super({});

        this.display = "block";
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");

        htmlElement.style.height = "24px";
        htmlElement.style.width = "1px";
        htmlElement.style.borderRight = "1px solid #d0d0d0";
        htmlElement.style.margin = "auto 6px";

        return htmlElement;
    }
}

export default Separator;