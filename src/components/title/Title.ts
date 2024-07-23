import { BaseUIComponent } from "../common/BaseUIComponent";

export class Title extends BaseUIComponent {

    constructor() {

        super({});
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.classList.add("title");

        const h1 = document.createElement("h1");
        h1.setAttribute("contentEditable", "true");
        h1.setAttribute("data-placeholder", "Untitled");

        if (window.editorConfig?.title) {
            h1.textContent = window.editorConfig?.title
        }

        htmlElement.appendChild(h1);

        return htmlElement;
    }
}