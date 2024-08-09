import { SVGIcon } from "../../common/SVGIcon";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { Colors } from "../../../common/Colors";
import { CustomEvents } from "@/common/CustomEvents";
import { ICommandEventDetail } from "@/commands/ICommandEventDetail";
import { Commands } from "@/commands/Commands";
import { CustomUIEvents } from "@/common/CustomUIEvents";
import { IUIEventDetail } from "@/commands/IUIEventDetail";
import { ChangeColor } from "@/commands/UIActions/ChangeColor";

export class ButtonGroupItem extends BaseUIComponent {

    private id: string;
    private readonly command: string;
    private readonly showUI: boolean;
    private readonly icon: SVGIcon;

    constructor(id: string, command: string, title: string, icon: SVGIcon) {

        super({
            id: id,
            title: title,
            icon: icon
        });

        this.id = id;
        this.command = command;
        this.showUI = command == Commands.toggleLink;
        this.icon = icon;
        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("button");

        htmlElement.classList.add("entry", "button-reset", "text-formatting-operation", "option-hover");
        htmlElement.title = this.props.title;
        htmlElement.tabIndex = 1;

        htmlElement.appendChild(this.props.icon.htmlElement);

        return htmlElement;
    }

    attachEvents(): void {

        this.htmlElement.addEventListener("click", async () => {
            document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                detail: {
                    command: this.command,
                    showUI: this.showUI,

                }
            }));
        });

        // document.addEventListener(CustomEvents.textFormatChanged, (event: Event) => {

        //     const customEvent = event as CustomEvent<IFormatCommand>;
        //     const states = customEvent.detail;

        //     if (states[this.command as keyof IFormatCommand]) {
        //         this.icon.changeColor(Colors.IconActiveBlue);
        //     } else {
        //         this.icon.changeColor(Colors.IconDefaultBlack);
        //     }
        // });

        document.addEventListener(CustomUIEvents.ColorChangeRequest, (event: Event) => {

            const customEvent = event as CustomEvent<IUIEventDetail>;
            const details = customEvent.detail;

            if(this.id == details.targetId){
                this.icon.changeColor((details.action as ChangeColor).color)

                // if (details[this.command as keyof IFormatCommand]) {
                //     this.icon.changeColor(Colors.IconActiveBlue);
                // } else {
                //     this.icon.changeColor(Colors.IconDefaultBlack);
                // }
            }
        });
    }

    static create(id: string, command: string, title: string, icon: SVGIcon): ButtonGroupItem {
        return new ButtonGroupItem(id, command, title, icon);
    }
}