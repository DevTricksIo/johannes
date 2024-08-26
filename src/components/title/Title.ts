import { BaseUIComponent } from "../common/BaseUIComponent";
import { CustomEvents } from "@/common/CustomEvents";

export class Title extends BaseUIComponent {

    constructor(value: string | undefined) {

        super({
            value: value
        });
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("title");

        const h1 = document.createElement("h1");
        h1.setAttribute("contentEditable", "true");
        h1.setAttribute("data-placeholder", "Untitled");

        if (this.props.value) {
            h1.textContent = this.props.value;
        }

        htmlElement.appendChild(h1);

        return htmlElement;
    }

    static create(value: string | undefined): Title {
        return new Title(value);
    }
}