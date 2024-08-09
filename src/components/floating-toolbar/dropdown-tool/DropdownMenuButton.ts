import { SVGIcon } from "../../common/SVGIcon";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { DropdownMenuList } from "./DropdownMenuList";
import { Sizes } from "@/common/Sizes";

export class DropdownMenuButton extends BaseUIComponent {

    dropdownList: DropdownMenuList;
    svgIcon?: SVGIcon;

    constructor(id: string, title: string | HTMLElement, dropdownList: DropdownMenuList, includeChevronIcon: boolean = true) {

        const svgIcon = new SVGIcon("icon-wordpress-chevron-down", Sizes.medium);

        super({
            id: id,
            title: title,
            dropdownList: dropdownList,
            svgIcon: includeChevronIcon ? svgIcon : null
        });

        this.dropdownList = dropdownList;
        this.svgIcon = svgIcon;
        this.attachEvents();

        dropdownList.setParentDropdownMenuButton(this);
    }

    init(): HTMLElement {

        const htmlElement: HTMLButtonElement = document.createElement('button');
        htmlElement.id = this.props.id;
        // htmlElement.title = this.props.title
        htmlElement.role = "button";
        htmlElement.classList.add("button-reset", "text-formatting-select-button", "text-formatting-operation", "option-hover");
        htmlElement.tabIndex = 1;
        htmlElement.style.position = "relative";
        htmlElement.setAttribute("aria-controls", this.props.dropdownList.htmlElement.id);

        if (typeof this.props.title === "string") {
            const span = document.createElement('span');
            span.textContent = this.props.title;
            htmlElement.appendChild(span);
        } else {
            htmlElement.appendChild(this.props.title);
        }

        if (this.props.svgIcon) {
            htmlElement.appendChild(this.props.svgIcon.htmlElement);
        }

        return htmlElement;
    }

    attachEvents(): void {

        this.htmlElement.addEventListener("click", () => {
            if (!this.dropdownList.isVisible) {
                this.dropdownList.show();
            }else{
                this.dropdownList.hide();
            }
        });

    }


    get display(): string {
        return 'block';
    }
}