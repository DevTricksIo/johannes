import { BaseUIComponent } from "../common/BaseUIComponent";
import { AddBlockButton } from "./AddBlockButton";

export class AddBlockWrapper extends BaseUIComponent {

    private readonly button: AddBlockButton;

    private constructor(button: AddBlockButton) {

        super({
            button: button
        });

        this.button = button;
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");

        htmlElement.classList.add("add-block-wrapper");

        htmlElement.appendChild(this.props.button.htmlElement);

        return htmlElement;
    }

    static create(button: AddBlockButton): AddBlockWrapper {
        return new AddBlockWrapper(button);
    }
}