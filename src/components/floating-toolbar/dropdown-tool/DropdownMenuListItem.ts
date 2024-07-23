import { ICommand } from "../../../services/common/ICommand";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { DropdownMenuList } from "./DropdownMenuList";

export class DropdownMenuListItem extends BaseUIComponent {

    private readonly commandService: ICommand;
    private readonly command: string;
    private readonly value: string | null;

    parentDropdownMenuList: DropdownMenuList;

    constructor(parentDropdownMenuList: DropdownMenuList, commandService: ICommand, command: string, value: string | null, leftIcon: HTMLElement | SVGElement, title: string) {
        super({
            leftIcon: leftIcon,
            title: title
        });

        this.command = command;
        this.value = value;
        this.commandService = commandService;
        this.parentDropdownMenuList = parentDropdownMenuList;

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

        return htmlElement;
    }

    attachEvent(): void {
        this.htmlElement.addEventListener("click", () => {

            setTimeout(() => {

                this.commandService.execCommand(this.command, this.value);

                // const selectionEvent = new CustomEvent('selectionChangeAfterExecCommand', {
                //     detail: { message: 'selectionChangeAfterExecCommand' },
                //     bubbles: true,
                //     cancelable: true
                // });

                // document.dispatchEvent(selectionEvent);

                this.parentDropdownMenuList.hide();

            }, 10);
        });
    }
}