import ITextOperationService from "../../../services/text-operations/ITextOperationService";
import BaseUIComponent from "../../common/BaseUIComponent";

class DropdownMenuListItem extends BaseUIComponent {

    private readonly _textOperationService: ITextOperationService;

    display: string;
    command: string;

    constructor(textOperationService: ITextOperationService, command: string, leftIcon: HTMLElement | SVGElement, title: string, dataType: string) {
        super({
            leftIcon: leftIcon,
            title: title,
            dataType: dataType,
            // dataBlockOperationAttribute: dataBlockOperationAttribute,
        });

        this.display = 'block';
        this._textOperationService = textOperationService;
        this.command = command;

        this.attachEvent();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('li');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');
        // htmlElement.setAttribute('data-block-operation', this.props.dataBlockOperationAttribute);
        htmlElement.setAttribute('data-type', this.props.dataType);
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

                this._textOperationService.execCommand(this.command);

            }, 10);
        });
    }

}

export default DropdownMenuListItem;