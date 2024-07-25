import { TextOperationService } from "@/services/text-operations/TextOperationService";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { InputLinkBoxWrapper } from "./InputLinkBoxWrapper";

export class InputLinkBox extends BaseUIComponent {

    parentWrapper?: InputLinkBoxWrapper;

    constructor() {

        super({})
        this.attachEvent();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("input");

        htmlElement.id = "linkBoxInput";
        htmlElement.type = "url";
        htmlElement.placeholder = "Paste or type a link...";

        htmlElement.style.position = "relative";

        return htmlElement;
    }

    setParentWrapper(parentWrapper: InputLinkBoxWrapper): void {
        this.parentWrapper = parentWrapper;
    }

    attachEvent(): void {

        document.addEventListener("keydown", (event) => {

            if (event.key == "Enter" && this.isVisible) {

                event.preventDefault();
                event.stopPropagation();

                const url = (this.htmlElement as HTMLInputElement).value;

                setTimeout(() => {
                    TextOperationService.getInstance().execCommand(TextOperationService.QUERY_TEXT_OPERATIONS.CREATE_LINK, false, url);
                }, 10);

                (this.htmlElement as HTMLInputElement).value = "";

                this.parentWrapper?.hide();
            }

            if (event.key == "Escape" && this.isVisible) {
                (this.htmlElement as HTMLInputElement).value = "";
                this.parentWrapper?.hide();
            }
        });

        document.addEventListener('click', (event) => {
            if (this.canHide && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`) && !(event.target! as HTMLElement).closest("#floatingToolbar")) {
                this.parentWrapper?.hide();
            }
        });

        this.htmlElement.addEventListener("keydown", (event) => {
            if (event.key == "/") {
                event.stopPropagation();
            }
        });


    }
}