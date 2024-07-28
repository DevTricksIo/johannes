import { ITextOperationService } from "@/services/text-operations/ITextOperationService";
import { BaseUIComponent } from "../../common/BaseUIComponent";
import { DropdownMenuList } from "./DropdownMenuList";
import { SVGIcon } from "@/components/common/SVGIcon";
import { TextOperationService } from "@/services/text-operations/TextOperationService";
import { IDropdownMenuItem } from "./IDropdownMenuItem";
import { JNode } from "@/common/JNode";

export class DropdownMenuListItem extends BaseUIComponent implements IDropdownMenuItem {

    private readonly textOperationService: ITextOperationService;
    private readonly command: string;
    private readonly value: string | null;
    private readonly activeIcon?: SVGIcon;

    parentDropdownMenuList: DropdownMenuList;

    constructor(id: string, parentDropdownMenuList: DropdownMenuList, textOperationsService: ITextOperationService, command: string, value: string | null, leftIcon: HTMLElement | SVGElement, title: string, shortcut: string | null = null) {

        const icon = new SVGIcon("icon-material-small-check");
        icon.htmlElement.style.visibility = "hidden";

        if (value) {
            leftIcon.style.color = value;
        }

        super({
            id: id,
            leftIcon: leftIcon,
            title: title,
            icon: icon,
            shortcut: shortcut
        });

        this.command = command;
        this.value = value;
        this.textOperationService = textOperationsService;
        this.parentDropdownMenuList = parentDropdownMenuList;
        this.activeIcon = icon;

        this.attachEvent();
    }

    focus(): void {
        this.htmlElement.classList.add('option-focused');
    }

    removeFocus(): void {
        this.htmlElement.classList.remove('option-focused');
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('li');
        htmlElement.id = this.props.id;
        htmlElement.classList.add('option', 'option-hover', 'block-operation');
        htmlElement.tabIndex = 2;

        htmlElement.style.color = "#37352F";

        const textOption = document.createElement('div');
        textOption.classList.add('text-option');

        textOption.appendChild(this.props.leftIcon);

        const span = document.createElement('span');
        span.innerText = this.props.title;

        textOption.appendChild(span);

        htmlElement.appendChild(textOption);
        htmlElement.appendChild(this.props.icon.htmlElement);

        if (this.props.shortcut) {
            const shortCut = document.createElement("span");
            shortCut.innerText = this.props.shortcut;
            shortCut.style.color = "rgba(55, 53, 47, 0.5)"

            htmlElement.appendChild(shortCut);
        }

        return htmlElement;
    }

    performAction(): void {

        this.textOperationService.execCommand(this.command, false, this.value);

        requestAnimationFrame(() => {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            let container: Node | null = range.commonAncestorContainer;

            if (container?.nodeType === Node.TEXT_NODE) {
                container = container.parentNode;
            }

            const focusableParent = (container as HTMLElement).closest(".focusable");

            if (focusableParent) {
                this.normalizeAndMergeElements(focusableParent as HTMLElement);
            }
        });
    }

    attachEvent(): void {

        this.htmlElement.addEventListener('mousemove', () => {

            const node: JNode<IDropdownMenuItem> = this.parentDropdownMenuList.dropdownItems.find(this)!;

            this.parentDropdownMenuList.switchVisualFocus(node!);
        });

        this.htmlElement.addEventListener("click", () => {
            this.performAction();
        });


        document.addEventListener("selectionchange", () => {
            if (
                this.command == TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR ||
                this.command == TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR) {

                this.changeCheckIconVisibility();
            }
        });

        document.addEventListener("colorChange", () => {
            if (
                this.command == TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR ||
                this.command == TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR) {

                this.changeCheckIconVisibility();
            }
        });

    }

    normalizeAndMergeElements(element: HTMLElement | null): void {
        if (!element) return;

        let child = element.firstChild;
        while (child) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                this.normalizeAndMergeElements(child as HTMLElement);
            }

            let nextSibling = child.nextSibling;
            while (nextSibling && this.shouldMerge(child, nextSibling)) {
                (child as HTMLElement).innerHTML += (nextSibling as HTMLElement).innerHTML;
                const next = nextSibling.nextSibling;
                nextSibling.parentNode!.removeChild(nextSibling);
                nextSibling = next;
            }

            child = child.nextSibling;
        }

        element.normalize();
    }

    shouldMerge(node1: ChildNode, node2: ChildNode): boolean {
        if (node1?.nodeType !== Node.ELEMENT_NODE || node2?.nodeType !== Node.ELEMENT_NODE) return false;
        const elem1 = node1 as HTMLElement;
        const elem2 = node2 as HTMLElement;
        return elem1.tagName === elem2.tagName &&
            elem1.style.cssText === elem2.style.cssText &&
            window.getComputedStyle(elem1).color === window.getComputedStyle(elem2).color;
    }


    changeCheckIconVisibility(): void {
        requestAnimationFrame(() => {
            if (this.textOperationService.queryCommandState(this.command, this.value)) {
                this.activeIcon?.changeVisibilityToVisible();
            } else {
                this.activeIcon?.changeVisibilityToHidden();
            }
        });
    }
}