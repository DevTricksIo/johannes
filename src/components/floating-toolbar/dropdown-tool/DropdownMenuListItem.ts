import { BaseUIComponent } from "../../common/BaseUIComponent";
import { DropdownMenuList } from "./DropdownMenuList";
import { SVGIcon } from "@/components/common/SVGIcon";
import { IDropdownMenuItem } from "./IDropdownMenuItem";
import { JNode } from "@/common/JNode";
import { Sizes } from "@/common/Sizes";
import { ICommandEventDetail } from "@/commands/ICommandEventDetail";
import { CustomEvents } from "@/common/CustomEvents";
import { CustomUIEvents } from "@/common/CustomUIEvents";
import { IUIEventDetail } from "@/commands/IUIEventDetail";
import { ShowHideActiveButton } from "@/commands/UIActions/ShowHideActiveButton";
import { DOMUtils } from "@/utilities/DOMUtils";
import { ChangeBlockToolbarLanguage } from "@/commands/UIActions/ChangeBlockToolbarLanguage";
import { DefaultJSEvents } from "@/common/DefaultJSEvents";

export class DropdownMenuListItem extends BaseUIComponent implements IDropdownMenuItem {

    id: string;
    private readonly command: string;
    readonly value: string | null;
    readonly activeIcon?: SVGIcon;
    private leftIcon?: SVGElement | HTMLElement | null;
    readonly title: string;

    private onFocusFunctionList: (() => void)[] = [];
    private onLoseFocusFunctionList: (() => void)[] = [];

    parentDropdownMenuList: DropdownMenuList;

    constructor(
        id: string,
        parentDropdownMenuList: DropdownMenuList,
        command: string,
        value: string | null,
        leftIcon: HTMLElement | SVGElement | null,
        title: string,
        shortcut: string | null = null) {

        const classList = ["list-item", "option", "option-hover", "block-operation", "no-list-style", "no-selection"];

        const icon = new SVGIcon("icon-material-small-check", Sizes.medium);
        icon.htmlElement.style.visibility = "hidden";

        if (value && leftIcon) {
            leftIcon.style.color = value;
        }

        super({
            id: id,
            classList: classList,
            leftIcon: leftIcon,
            title: title,
            icon: icon,
            shortcut: shortcut
        });

        this.id = id;
        this.classList = classList;
        this.leftIcon = leftIcon;
        this.command = command;
        this.value = value;
        this.title = title;
        this.parentDropdownMenuList = parentDropdownMenuList;
        this.activeIcon = icon;

        this.attachEvents();
    }

    // attachOnFocus(func: () => void): void {
    //     this.onFocusFunctionList.push(func);
    // }

    addClass(classKey: string) {
        this.classList.push(classKey);
        this.htmlElement.classList.add(classKey);
    }

    attachOnFocus<T extends any[]>(func: (...args: T) => void, ...args: T): void {
        this.onFocusFunctionList.push(() => func(...args));
    }

    attachOnLoseFocus<T extends any[]>(func: (...args: T) => void, ...args: T): void {
        this.onLoseFocusFunctionList.push(() => func(...args));
    }

    get display(): string {
        return 'flex';
    }

    focus(): void {
        this.htmlElement.classList.add('option-focused');
        this.onFocusFunctionList.forEach(func => func());
    }

    removeFocus(): void {
        this.htmlElement.classList.remove('option-focused');
        this.onLoseFocusFunctionList.forEach(func => func());
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('li');
        htmlElement.id = this.props.id;
        const classList = this.props.classList as string[];
        htmlElement.classList.add("pointer", ...classList);
        htmlElement.tabIndex = 2;

        htmlElement.style.color = "#37352F";

        const textOption = document.createElement('div');
        textOption.classList.add('text-option');

        if (this.props.leftIcon) {
            textOption.appendChild(this.props.leftIcon);
        }


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

    emitCommandEvent(event: Event): void {

        const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
            detail: {
                command: this.command,
                value: this.value,
                block: ( DOMUtils.getParentFromSelection(".block") || DOMUtils.getParentTargetBySelector(event as MouseEvent, ".block") ) as HTMLHtmlElement
            }
        });

        document.dispatchEvent(customEvent);


        // requestAnimationFrame(() => {
        //     const selection = window.getSelection();
        //     if (!selection || selection.rangeCount === 0) return;

        //     const range = selection.getRangeAt(0);
        //     let container: Node | null = range.commonAncestorContainer;

        //     if (container?.nodeType === Node.TEXT_NODE) {
        //         container = container.parentNode;
        //     }

        //     const focusableParent = (container as HTMLElement).closest(".focusable");

        //     if (focusableParent) {
        //         this.normalizeAndMergeElements(focusableParent as HTMLElement);
        //     }
        // });
    }

    attachEvents(): void {

        this.attachUIEvent();

        // Prevent focus change when clicking on this element
        this.htmlElement.addEventListener(DefaultJSEvents.Click, (event) => {
            event.preventDefault();
        });

        // Prevent focus change when clicking on this element
        this.htmlElement.addEventListener(DefaultJSEvents.Mousedown, (event) => {
            event.preventDefault();
        });

        this.htmlElement.addEventListener(DefaultJSEvents.Mousemove, async () => {

            const node: JNode<IDropdownMenuItem> = this.parentDropdownMenuList.dropdownItems.find(this)!;

            this.parentDropdownMenuList.switchVisualFocus(node!);
        });

        this.htmlElement.addEventListener(DefaultJSEvents.Click, (event) => {

            event.preventDefault();
            event.stopImmediatePropagation();
            this.emitCommandEvent(event);
        });


        // document.addEventListener(CustomEvents.textFormatChanged, (event: Event) => {

        //     const customEvent = event as CustomEvent<IFormatCommand>;
        //     const states = customEvent.detail;

        //     if (this.command == Commands.toggleHiliteColor) {

        //         if (!this.value) {
        //             throw new Error("A color value must be provided for the 'hiliteColor' command. Each 'ListMenuItem' must specify a color representing the text background color.");
        //         }

        //         if (states.hiliteColor[this.value]) {
        //             this.activeIcon?.changeVisibilityToVisible();
        //         } else {
        //             this.activeIcon?.changeVisibilityToHidden();
        //         }
        //     }

        //     if (this.command == Commands.toggleForeColor) {

        //         if (!this.value) {
        //             throw new Error("A color value must be provided for the 'coreColor' command. Each 'ListMenuItem' must specify a color representing the text color.");
        //         }

        //         if (states.foreColor[this.value]) {
        //             this.activeIcon?.changeVisibilityToVisible();
        //         } else {
        //             this.activeIcon?.changeVisibilityToHidden();
        //         }
        //     }

        //     if (this.command == Commands.toggleCellHiliteColor) {

        //         if (!this.value) {
        //             throw new Error("A color value must be provided for the 'coreColor' command. Each 'ListMenuItem' must specify a color representing the text color.");
        //         }

        //         if (states.cellHiliteColor[this.value]) {
        //             this.activeIcon?.changeVisibilityToVisible();
        //         } else {
        //             this.activeIcon?.changeVisibilityToHidden();
        //         }
        //     }

        // });

        // document.addEventListener(CustomEvents.tableCellChanged, (event: Event) => {

        //     const customEvent = event as CustomEvent<IFormatCommand>;
        //     const states = customEvent.detail;


        //     if (this.command == Commands.toggleCellHiliteColor) {

        //         if (!this.value) {
        //             throw new Error("A color value must be provided for the 'coreColor' command. Each 'ListMenuItem' must specify a color representing the text color.");
        //         }

        //         if (states.cellHiliteColor[this.value]) {
        //             this.activeIcon?.changeVisibilityToVisible();
        //         } else {
        //             this.activeIcon?.changeVisibilityToHidden();
        //         }
        //     }
        // });


        // private handleCommandEvent = (event: CustomEvent<ICommandEventDetail>): void => {
        //     const { command, showUI, value, targetBlockType } = event.detail;


        // document.addEventListener("selectionchange", async () => {
        //     if (
        //         this.command == TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR ||
        //         this.command == TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR) {

        //         await this.changeCheckIconVisibility();
        //     }
        // });

        // document.addEventListener("colorChange", async () => {
        //     if (
        //         this.command == TextOperationService.QUERY_TEXT_OPERATIONS.HILITE_COLOR ||
        //         this.command == TextOperationService.QUERY_TEXT_OPERATIONS.FORE_COLOR) {

        //         await this.changeCheckIconVisibility();
        //     }
        // });

        document.addEventListener(CustomUIEvents.ChangeBlockToolbarLanguage, this.handleChangeBlockToolbarLanguageEvent.bind(this));
    }

    handleChangeBlockToolbarLanguageEvent(event: Event) {
        const customEvent = event as CustomEvent<IUIEventDetail>;
        const details = customEvent.detail;

        if (details.targetClass && details.targetClass.includes("code-block-language-menu")) {

            const eventValues = (details.action as ChangeBlockToolbarLanguage);

            const block = this.htmlElement.closest(`#${eventValues.blockId}`);

            if (block) {

                if (this.value == eventValues.language) {
                    this.activeIcon?.changeVisibilityToVisible();
                } else {
                    this.activeIcon?.changeVisibilityToHidden();
                }
            }
        }
    }

    // normalizeAndMergeElements(element: HTMLElement | null): void {
    //     if (!element) return;

    //     let child = element.firstChild;
    //     while (child) {
    //         if (child.nodeType === Node.ELEMENT_NODE) {
    //             this.normalizeAndMergeElements(child as HTMLElement);
    //         }

    //         let nextSibling = child.nextSibling;
    //         while (nextSibling && this.shouldMerge(child, nextSibling)) {
    //             (child as HTMLElement).innerHTML += (nextSibling as HTMLElement).innerHTML;
    //             const next = nextSibling.nextSibling;
    //             nextSibling.parentNode!.removeChild(nextSibling);
    //             nextSibling = next;
    //         }

    //         child = child.nextSibling;
    //     }

    //     element.normalize();
    // }

    // shouldMerge(node1: ChildNode, node2: ChildNode): boolean {
    //     if (node1?.nodeType !== Node.ELEMENT_NODE || node2?.nodeType !== Node.ELEMENT_NODE) return false;
    //     const elem1 = node1 as HTMLElement;
    //     const elem2 = node2 as HTMLElement;
    //     return elem1.tagName === elem2.tagName &&
    //         elem1.style.cssText === elem2.style.cssText &&
    //         window.getComputedStyle(elem1).color === window.getComputedStyle(elem2).color;
    // }


    // async changeCheckIconVisibility(): Promise<void> {
    //     try {
    //         const isActive = await this.textOperationService.queryCommandState(this.command, this.value);
    //         if (isActive) {
    //             this.activeIcon?.changeVisibilityToVisible();
    //         } else {
    //             this.activeIcon?.changeVisibilityToHidden();
    //         }
    //     } catch (error) {
    //         console.error("Failed to query command state:", error);
    //     }
    // }



    attachUIEvent() {
        document.addEventListener(CustomUIEvents.ShowHideActiveButton, this.handleShowHideActiveButtonEvent.bind(this));
        document.addEventListener(CustomUIEvents.ResetActiveButtons, this.handleResetActiveButtonsEvent.bind(this));
    }

    handleShowHideActiveButtonEvent(event: Event) {
        const customEvent = event as CustomEvent<IUIEventDetail>;
        const details = customEvent.detail;

        if (this.classList?.includes(details.targetClass!)) {

            // if(!(details.action instanceof ShowHideActiveButton)){
            //     return;
            // }

            const eventValues = (details.action as ShowHideActiveButton);
            const eventColor = eventValues.value;

            if (this.value?.toLowerCase() == eventColor.toLowerCase()) {
                if (eventValues.intention == "show") {
                    this.activeIcon?.changeVisibilityToVisible();
                }
            }
        }
    }

    handleResetActiveButtonsEvent(event: Event) {
        const customEvent = event as CustomEvent<IUIEventDetail>;
        const details = customEvent.detail;

        if (this.classList?.includes(details.targetClass!)) {

            // if(!(details.action instanceof ResetActiveButtons)){
            //     return;
            // }

            this.activeIcon?.changeVisibilityToHidden();
        }
    }

    // getLeftIconBackgroundColor(): string | null {

    //     if (this.leftIcon) {

    //         const style = window.getComputedStyle(this.leftIcon);
    //         const rgbColor = style.backgroundColor;

    //         const hexColor = Utils.rgbToHex(rgbColor).toLocaleLowerCase();
    //         return hexColor;
    //     }

    //     return null;
    // }

    // getLeftIconColor(): string | null {

    //     if (this.leftIcon) {

    //         const style = window.getComputedStyle(this.leftIcon);
    //         const rgbColor = style.backgroundColor;

    //         const hexColor = Utils.rgbToHex(rgbColor).toLocaleLowerCase();
    //         return hexColor;
    //     }

    //     return null;
    // }


    // changeActiveIconToVisible(): void {
    //     this.activeIcon?.changeVisibilityToVisible();
    // }
}