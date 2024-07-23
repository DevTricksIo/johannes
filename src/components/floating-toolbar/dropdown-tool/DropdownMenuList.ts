import { BaseUIComponent } from "../../common/BaseUIComponent";
import { CircularDoublyLinkedList } from "../../../common/CircularDoublyLinkedList";
import { DropdownMenuListItem } from "./DropdownMenuListItem";

export class DropdownMenuList extends BaseUIComponent {

    dropdownItems: CircularDoublyLinkedList<DropdownMenuListItem>;

    constructor(id: string, title: string) {
        super({
            id: id,
            title: title
        });

        this.dropdownItems = new CircularDoublyLinkedList<DropdownMenuListItem>();

        this.attachEvents();
    }

    get display(): string {
        return 'flex';
    }

    init(): HTMLElement {

        const htmlElement: HTMLUListElement = document.createElement('ul');
        htmlElement.id = this.props.id;
        htmlElement.setAttribute('name', 'block-type');
        htmlElement.style.display = 'none';
        htmlElement.classList.add('soft-box-shadow', 'dependent-box', 'checkable-items');

        const title = document.createElement('h3');
        title.innerText = this.props.title;
        title.style.marginLeft = '5px';

        htmlElement.appendChild(title);

        return htmlElement;
    }

    append(dropdownItem: DropdownMenuListItem): void {

        this.dropdownItems.append(dropdownItem);
        this.htmlElement.appendChild(dropdownItem.htmlElement)
    }

    attachEvents(): void {

        document.addEventListener('click', (event) => {
            if (this.canHide && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`)) {

                this.hide();
            }
        });
    }
}