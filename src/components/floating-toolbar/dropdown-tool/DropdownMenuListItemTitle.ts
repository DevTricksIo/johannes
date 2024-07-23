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

    init(): HTMLElement {

        const htmlElement = document.createElement('li');
        // htmlElement.classList.add('option', 'option-hover', 'block-operation');
        

        const title = document.createElement('h3');
        title.innerText = this.props.title;
        title.style.marginLeft = '5px';

        htmlElement.appendChild(title);

        return htmlElement;
    }
}