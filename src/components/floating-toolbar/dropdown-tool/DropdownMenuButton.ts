import SVGIcon from "../../common/SVGIcon";
import BaseUIComponent from "../../common/BaseUIComponent";
import DropdownMenuList from "./DropdownMenuList";

class DropdownMenuButton extends BaseUIComponent {

    display: string;
    dropdownList: DropdownMenuList;

    constructor(id: string, title: string | HTMLElement, dropdownList: DropdownMenuList, includeChevronIcon: boolean = true) {

        super({
            id: id,
            title: title,
            dropdownList: dropdownList,
            includeChevronIcon: includeChevronIcon
        });

        this.display = "block";
        this.dropdownList = dropdownList;

        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement: HTMLButtonElement = document.createElement('button');
        htmlElement.id = this.props.id;
        // htmlElement.title = this.props.title
        htmlElement.role = "button";
        htmlElement.classList.add("button-reset", "text-formatting-select-button", "text-formatting-operation", "option-hover");
        htmlElement.tabIndex = 1;
        htmlElement.setAttribute("aria-controls", this.props.dropdownList.htmlElement.id);

        if (typeof this.props.title === "string") {
            const span = document.createElement('span');
            span.textContent = this.props.title;
            htmlElement.appendChild(span);
        } else {
            htmlElement.appendChild(this.props.title);
        }

        if (this.props.includeChevronIcon) {
            const svg = new SVGIcon("icon-wordpress-chevron-down");
            htmlElement.appendChild(svg.htmlElement);
        }

        return htmlElement;
    }

    attachEvents(): void {

        this.htmlElement.addEventListener("click", () => {
            if (this.dropdownList.isVisible) {
                this.dropdownList.hide();
            } else {
                this.dropdownList.show();
            }
        });

    }
}

export default DropdownMenuButton;