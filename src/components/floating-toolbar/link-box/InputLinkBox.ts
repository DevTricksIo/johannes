import { TextOperationsService } from "@/services/text-operations/TextOperationsService";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { InputLinkBoxWrapper } from "./InputLinkBoxWrapper";
import { Commands } from "@/commands/Commands";

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
                    TextOperationsService.getInstance().execCommand(Commands.toggleLink, false, url);
                }, 10);

                (this.htmlElement as HTMLInputElement).value = "";

                this.parentWrapper?.hide();
            }

            if (event.key == "Escape" && this.isVisible) {
                (this.htmlElement as HTMLInputElement).value = "";
                this.parentWrapper?.hide();
            }
        });

        //TODO check the floaring id here
        document.addEventListener('click', (event) => {
            if (this.canHide && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`) && !(event.target! as HTMLElement).closest("#textFloatingToolbar")) {
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