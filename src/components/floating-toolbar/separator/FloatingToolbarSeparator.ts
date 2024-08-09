import { BaseUIComponent } from "../../common/BaseUIComponent";

export class FloatingToolbarSeparator extends BaseUIComponent {

    id: string;

    constructor(id: string) {
        super({id: id});

        this.id = id;
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");
        htmlElement.id = this.props.id;
        htmlElement.style.height = "24px";
        htmlElement.style.width = "1px";
        htmlElement.style.borderRight = "1px solid #d0d0d0";
        htmlElement.style.margin = "auto 6px";

        return htmlElement;
    }
}