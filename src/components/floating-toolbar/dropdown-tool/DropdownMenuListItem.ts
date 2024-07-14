import ICommand from "../../../services/common/ICommand";
import BaseUIComponent from "../../common/BaseUIComponent";
import DropdownMenuList from "./DropdownMenuList";

class DropdownMenuListItem extends BaseUIComponent {

    private readonly _commandService: ICommand;
    private readonly _command: string;
    private readonly _value: string | null;

    parentDropdownMenuList: DropdownMenuList;

    display: string;

    constructor(parentDropdownMenuList: DropdownMenuList, commandService: ICommand, command: string, value: string | null, leftIcon: HTMLElement | SVGElement, title: string) {
        super({
            leftIcon: leftIcon,
            title: title
        });

        this.display = 'block';
        this._command = command;
        this._value = value;
        this._commandService = commandService;
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

                this._commandService.execCommand(this._command, this._value);

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

export default DropdownMenuListItem;