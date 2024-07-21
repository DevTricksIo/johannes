import { BaseUIComponent } from "../common/BaseUIComponent";

export class Title extends BaseUIComponent {

    display: string;

    constructor() {

        super({});

        this.display = "block";
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("title");

        const h1 = document.createElement("h1");
        h1.contentEditable;
        h1.setAttribute("data-placeholder", "Untitled");

        htmlElement.appendChild(h1);

        return htmlElement;
    }
}