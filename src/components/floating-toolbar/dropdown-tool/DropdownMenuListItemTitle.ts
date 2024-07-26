import { BaseUIComponent } from "../../common/BaseUIComponent";
import { DropdownMenuList } from "./DropdownMenuList";
import { IDropdownMenuItem } from "./IDropdownMenuItem";

export class DropdownMenuListItemTitle extends BaseUIComponent implements IDropdownMenuItem {


    parentDropdownMenuList: DropdownMenuList;

    constructor(parentDropdownMenuList: DropdownMenuList, title: string) {

        super({
            title: title
        });

        this.parentDropdownMenuList = parentDropdownMenuList;
    }

    performAction(): void {
        throw new Error("Method not implemented.");
    }

    removeFocus(): void {
        throw new Error("Method not implemented.");
    }

    focus(): void {
        throw new Error("Method not implemented.");
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('li');

        const title = document.createElement('h3');
        title.innerText = this.props.title;

        htmlElement.appendChild(title);

        return htmlElement;
    }
}