import { ITextOperationService } from "@/services/text-operations/ITextOperationService";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { DropdownMenuList } from "./DropdownMenuList";
import { SVGIcon } from "@/components/common/SVGIcon";
import { TextOperationService } from "@/services/text-operations/TextOperationService";

export class DropdownMenuListItem extends BaseUIComponent {

    private readonly textOperationService: ITextOperationService;
    private readonly command: string;
    private readonly value: string | null;
    private readonly activeIcon?: SVGIcon;

    parentDropdownMenuList: DropdownMenuList;

    constructor(parentDropdownMenuList: DropdownMenuList, textOperationsService: ITextOperationService, command: string, value: string | null, leftIcon: HTMLElement | SVGElement, title: string) {

        const icon = new SVGIcon("icon-material-small-check");
        icon.htmlElement.style.display = "none";

        super({
            leftIcon: leftIcon,
            title: title,
            icon: icon
        });

        this.command = command;
        this.value = value;
        this.textOperationService = textOperationsService;
        this.parentDropdownMenuList = parentDropdownMenuList;
        this.activeIcon = icon;

        this.attachEvent();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('li');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');
        // htmlElement.setAttribute('data-type', this.props.dataType);
        htmlElement.tabIndex = 2;

        const textOption = document.createElement('div');
        textOption.classList.add('text-option');

        textOption.appendChild(this.props.leftIcon);

        const span = document.createElement('span');
        span.innerText = this.props.title;

        textOption.appendChild(span);

        htmlElement.appendChild(textOption);
        htmlElement.appendChild(this.props.icon.htmlElement);

        return htmlElement;
    }

    attachEvent(): void {
        this.htmlElement.addEventListener("click", () => {

            setTimeout(() => {

                this.textOperationService.execCommand(this.command, this.value);

                this.parentDropdownMenuList.hide();

            }, 10);
        });


        document.addEventListener("selectionchange", () => {

            if (this.command == TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR) {

                setTimeout(() => {

                    const value = this.textOperationService.queryCommandState(this.command, this.value);

                    if (value) {

                        this.activeIcon?.show();
                    } else {
                        this.activeIcon?.hide();
                    }

                }, 10);
            }

        });
    }
}