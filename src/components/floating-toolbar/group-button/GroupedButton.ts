import SVGIcon from "../../common/SVGIcon";
import BaseUIComponent from "../../common/BaseUIComponent";

class GroupedButton extends BaseUIComponent {

    display: string;

    constructor(title: string, svgUseHref: string) {

        super({
            title: title,
            svgUseHref: svgUseHref
        });

        this.display = "block";
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("button");

        htmlElement.role = "button";
        htmlElement.classList.add("entry", "button-reset", "text-formatting-operation", "option-hover");
        htmlElement.title = this.props.title;
        htmlElement.tabIndex = 1;

        new SVGIcon(this.props.svgUseHref, "22", "22").documentAppendTo(htmlElement);

        return htmlElement;
    }
}

export default GroupedButton;