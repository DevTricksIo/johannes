import { BaseUIComponent } from '../common/BaseUIComponent';
import { DropdownMenu } from './dropdown-tool/DropdownMenu';
import { FloatingToolbarSeparator } from './separator/FloatingToolbarSeparator';
import { ButtonGroup } from './button-group/ButtonGroup';
import { InputLinkBoxWrapper } from './link-box/InputLinkBoxWrapper';
import { CustomEvents } from '@/common/CustomEvents';

export abstract class FloatingToolbar extends BaseUIComponent {

    dropdowns: DropdownMenu[];
    separators: FloatingToolbarSeparator[];
    currentSelectionRange: Range | null;
    inputLinkBoxWrapper: InputLinkBoxWrapper;
    htmlFocusedElementBeforeOpenQuickMenu: HTMLElement | null;

    constructor(id: string) {

        const inputLinkBoxWrapper = new InputLinkBoxWrapper();

        super({
            id: id,
            inputLinkBoxWrapper: inputLinkBoxWrapper
        });

        this.inputLinkBoxWrapper = inputLinkBoxWrapper;
        this.dropdowns = [];
        this.separators = [];
        this.currentSelectionRange = null;
        this.htmlFocusedElementBeforeOpenQuickMenu = null;
    }

    init(): HTMLElement {

        const htmlElement = document.createElement("div");

        htmlElement.id = this.props.id;
        htmlElement.style.display = "none";
        htmlElement.classList.add("floating-toolbar", "select-wrapper", "soft-box-shadow");

        const selectWrapper = document.createElement("div");

        htmlElement.appendChild(selectWrapper);

        const editor = document.getElementById("johannesEditor");

        editor?.appendChild(this.props.inputLinkBoxWrapper.htmlElement);

        return htmlElement;
    }

    get display(): string {
        return 'flex';
    }

    // show(): void {
    //     requestAnimationFrame(() => {

    //         this.htmlFocusedElementBeforeOpenQuickMenu = DOMUtils.findClosestAncestorOfActiveElementByClass(".focusable");
    //         const selection = window.getSelection();

    //         if (!selection || selection.rangeCount === 0) {
    //             console.error('No selection found');
    //             return;
    //         }

    //         this.currentSelectionRange = selection.getRangeAt(0);

    //         const range = selection.getRangeAt(0);
    //         const rect = range.getBoundingClientRect();

    //         this.htmlElement.style.display = 'flex';

    //         const elementWidth = this.htmlElement.offsetWidth;
    //         let leftPosition = rect.left + window.scrollX - 50;

    //         if (leftPosition + elementWidth > window.innerWidth) {
    //             leftPosition = window.innerWidth - elementWidth - 20;
    //         }

    //         const elementHeight = this.htmlElement.offsetHeight;
    //         let topPosition = rect.top + window.scrollY - elementHeight - 10;

    //         if (topPosition < 0) {
    //             topPosition = rect.bottom + window.scrollY + 10;
    //         }

    //         this.htmlElement.style.left = `${leftPosition}px`;
    //         this.htmlElement.style.top = `${topPosition}px`;

    //         super.show();

    //         // document.dispatchEvent(new CustomEvent(CustomEvents.floatingToolbarDisplayed, {
    //         //     bubbles: true,
    //         //     cancelable: true
    //         // }));
    //     });
    // }

    hide(): void {
        if (this.canHide) {
            if (this.anyDropdownVisible()) {
                this.hideAllDropdownVisible();
            }

            this.currentSelectionRange = null;
            super.hide();
        }
    }

    appendDropdown(dropdown: DropdownMenu): void {
        this.dropdowns.push(dropdown)
        this.htmlElement.appendChild(dropdown.htmlElement);
    }

    appendButtonGroup(buttonGroup: ButtonGroup): void {
        this.htmlElement.appendChild(buttonGroup.htmlElement);
    }

    appendSeparator(separator: FloatingToolbarSeparator): void {
        this.separators.push(separator);
        this.htmlElement.appendChild(separator.htmlElement);
    }

    appendTextToolbar(button: ButtonGroup): void {
        this.htmlElement.appendChild(button.htmlElement);
    }

    anyDropdownVisible(): boolean {
        for (const dropdown of this.dropdowns) {
            if (dropdown.dropdownList.isVisible) {
                return true;
            }
        }

        return false;
    }

    hideAllDropdownVisible(): boolean {
        for (const dropdown of this.dropdowns) {
            if (dropdown.dropdownList.canHide) {
                dropdown.dropdownList.hide();
            }
        }

        return false;
    }

    attachEvents() {

        // Prevent focus change when clicking on this element
        this.htmlElement.addEventListener("click", (event) => {
            event.preventDefault();
        });

        // Prevent focus change when clicking on this element
        this.htmlElement.addEventListener("mousedown", (event) => {
            event.preventDefault();
        });


        document.addEventListener("showInputLinkBoxRequested", () => {
            this.canHide = false;
        });

        document.addEventListener("showInputLinkBoxFinished", () => {
            this.canHide = true;
            this.restoreRangeSelection();
        });

        // document.addEventListener('keydown', (event) => {
        //     if (this.canHide && (event.key === 'Escape')) {

        //         if (this.anyDropdownVisible()) {
        //             this.hideAllDropdownVisible();
        //         } else {
        //             this.hide();
        //         }
        //     } if (this.canHide && (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        //         if (this.isSelectionEmpty()) {
        //             this.hide();
        //         }
        //     }
        // });

        // document.addEventListener('keydown', (event) => {
        //     if ((event.key === 'Escape' || event.key === 'Delete') && this.isVisible) {
        //         if (this.canHide) {
        //             this.hideAllDropdownVisible();
        //             this.hide();
        //         }
        //     }
        // });


        // document.addEventListener('click', (event) => {
        //     if (this.canHide && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`) && !this.anyDropdownVisible()) {
        //         this.hide();
        //     } 
        //     // else if (this.isVisible && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`) && !this.inputLinkBoxWrapper.isVisible) {
        //     //     this.restoreRangeSelection();
        //     // }
        // });

        document.addEventListener(CustomEvents.blockDeleted, () => {
            this.hide();
        });

        document.addEventListener(CustomEvents.blockTypeChanged, () => {
            this.hide();
        });
    }

    isSelectionEmpty() {
        const selection = document.getSelection();
        return !selection || selection.rangeCount === 0 || selection.toString().trim() === '';
    }

    restoreRangeSelection(): void {
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(this.currentSelectionRange!);
    }
}


