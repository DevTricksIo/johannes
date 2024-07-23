import { BaseUIComponent } from "../../common/BaseUIComponent";;

export class ColorIcon extends BaseUIComponent {

    constructor(color: string) {
        super({
            color: color
        });
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");

        htmlElement.style.width = "20px";
        htmlElement.style.height = "20px";
        htmlElement.style.borderRadius = "50%";
        htmlElement.style.backgroundColor = this.props.color;
        htmlElement.style.border = "1px solid #d0d0d0";

        return htmlElement;
    }

}