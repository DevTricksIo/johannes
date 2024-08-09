import { BaseUIComponent } from "../../common/BaseUIComponent";
import { CircularDoublyLinkedList } from "../../../common/CircularDoublyLinkedList";
import { DropdownMenuListItem } from "./DropdownMenuListItem";
import { IDropdownMenuItem } from "./IDropdownMenuItem";
import { JNode } from "@/common/JNode";
import { DropdownMenuButton } from "./DropdownMenuButton";

export class DropdownMenuList extends BaseUIComponent {

    readonly id: string;
    private parentDropdownParentButton?: DropdownMenuButton;

    dropdownItems: CircularDoublyLinkedList<IDropdownMenuItem>;
    currentFocusedMenuItem: JNode<IDropdownMenuItem> | null;

    constructor(id: string) {

        super({
            id: id
        });

        this.id = id;
        this.dropdownItems = new CircularDoublyLinkedList<DropdownMenuListItem>();
        this.currentFocusedMenuItem = null;

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
        htmlElement.style.position = "absolute";
        htmlElement.style.maxHeight = "25vmax";
        htmlElement.style.overflowY = "auto";

        return htmlElement;
    }

    append(dropdownItem: IDropdownMenuItem): void {

        this.dropdownItems.append(dropdownItem);
        this.htmlElement.appendChild(dropdownItem.htmlElement)
    }

    setParentDropdownMenuButton(dropdownParentButton: DropdownMenuButton): void {
        this.parentDropdownParentButton = dropdownParentButton;
    }

    attachEvents(): void {

        document.addEventListener('keydown', (event) => {

            if (this.isVisible && this.currentFocusedMenuItem && event.key === "Enter") {
                this.currentFocusedMenuItem.value.emitCommandEvent();
            }
        });

        document.addEventListener('click', (event) => {
            if (this.clickedOutsideTheDropdownWhileDropdownIsVisible(event)) {
                this.hide();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (this.keyPressedOutsideTheDropdownWhileDropdownIsVisible(event)) {

                if (event.key == "ArrowDown") {
                    event.preventDefault();

                    this.focusNextVisibleItem();
                }

                if (event.key == "ArrowUp") {
                    event.preventDefault();
                    this.focusPreviousVisibleItem();
                }
            }
        });
    }

    show(): void {

        this.htmlElement.style.left = "0";
        this.htmlElement.style.right = "auto";

        if (this.doesElementOverflowScreen) {
            this.htmlElement.style.left = "auto";
            this.htmlElement.style.right = "0";
        }

        this.parentDropdownParentButton?.svgIcon?.setUseTo("icon-wordpress-chevron-up");
        super.show();

    }

    hide(): void {
        this.parentDropdownParentButton?.svgIcon?.setUseTo("icon-wordpress-chevron-down");
        this.currentFocusedMenuItem?.value.removeFocus();
        this.currentFocusedMenuItem = null;
        super.hide();
    }

    switchVisualFocus(item: JNode<IDropdownMenuItem>): void {

        if (this.currentFocusedMenuItem == item) {
            return;
        }

        if (this.currentFocusedMenuItem) {
            this.currentFocusedMenuItem.value.removeFocus();
        }

        this.currentFocusedMenuItem = item;
        this.currentFocusedMenuItem.value.focus();
    }

    private focusNextVisibleItem(): void {

        let nextVisibleItem: JNode<IDropdownMenuItem> | null;

        if (this.currentFocusedMenuItem) {
            nextVisibleItem = this.currentFocusedMenuItem.getNextSatisfying(item => item instanceof DropdownMenuListItem);
        } else {
            nextVisibleItem = this.dropdownItems.findFirst(item => item instanceof DropdownMenuListItem);
        }

        this.switchVisualFocus(nextVisibleItem!);
    }

    focusPreviousVisibleItem(): void {

        let previousVisibleItem: JNode<IDropdownMenuItem> | null;

        if (this.currentFocusedMenuItem) {
            previousVisibleItem = this.currentFocusedMenuItem.getPreviousSatisfying(item => item instanceof DropdownMenuListItem);
        } else {
            previousVisibleItem = this.dropdownItems.findFirst(item => item instanceof DropdownMenuListItem);
        }

        this.switchVisualFocus(previousVisibleItem!);
    }

    private clickedOutsideTheDropdownWhileDropdownIsVisible(event: MouseEvent): boolean {
        return this.canHide
            && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`)
            && !(event.target! as HTMLElement).closest(`#${this.parentDropdownParentButton?.htmlElement.id}`);
    }

    private keyPressedOutsideTheDropdownWhileDropdownIsVisible(event: KeyboardEvent): boolean {
        return this.canHide
            && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`)
            && !(event.target! as HTMLElement).closest(`#${this.parentDropdownParentButton?.htmlElement.id}`);
    }

}