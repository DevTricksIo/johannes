import { BaseUIComponent } from '../common/BaseUIComponent';
import { DropdownMenu } from './dropdown-tool/DropdownMenu';
import { FloatingToolbarSeparator } from './separator/FloatingToolbarSeparator';
import { GroupButton } from './group-button/GroupButton';
import { InputLinkBoxWrapper } from './link-box/InputLinkBoxWrapper';
import { Utils } from "../../utilities/Utils";

export class FloatingToolbar extends BaseUIComponent {

    dropdowns: DropdownMenu[];
    currentSelectionRange: Range | null;
    inputLinkBoxWrapper: InputLinkBoxWrapper;

    constructor() {

        const inputLinkBoxWrapper = new InputLinkBoxWrapper();

        super({
            inputLinkBoxWrapper: inputLinkBoxWrapper
        });

        this.inputLinkBoxWrapper = inputLinkBoxWrapper;
        this.attachEvents();
        this.dropdowns = [];
        this.currentSelectionRange = null;
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('div');

        htmlElement.id = 'floatingToolbar';
        htmlElement.style.display = 'none';
        htmlElement.classList.add('soft-box-shadow');

        const selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select-wrapper');

        htmlElement.appendChild(selectWrapper);

        const editor = document.getElementById("johannesEditor");

        editor?.appendChild(this.props.inputLinkBoxWrapper.htmlElement);

        return htmlElement;
    }

    get display(): string {
        return 'flex';
    }

    show(): void {
        requestAnimationFrame(() => {
            const selection = window.getSelection();

            if (!selection || selection.rangeCount === 0) {
                throw new Error('Nenhuma seleção encontrada');
            }

            this.currentSelectionRange = selection.getRangeAt(0);

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            this.htmlElement.style.display = 'flex';

            const elementWidth = this.htmlElement.offsetWidth;
            let leftPosition = rect.left + window.scrollX - 50;

            if (leftPosition + elementWidth > window.innerWidth) {
                leftPosition = window.innerWidth - elementWidth - 20;
            }

            const elementHeight = this.htmlElement.offsetHeight;
            let topPosition = rect.top + window.scrollY - elementHeight - 10;

            if (topPosition < 0) {
                topPosition = rect.bottom + window.scrollY + 10;
            }

            this.htmlElement.style.left = `${leftPosition}px`;
            this.htmlElement.style.top = `${topPosition}px`;

            super.show();
        });
    }

    hide(): void {
        this.currentSelectionRange = null;
        super.hide();
    }

    appendDropdown(dropdown: DropdownMenu): void {
        this.dropdowns.push(dropdown)
        this.htmlElement.appendChild(dropdown.htmlElement);
    }

    appendSeparator(separator: FloatingToolbarSeparator): void {
        this.htmlElement.appendChild(separator.htmlElement);
    }

    appendTextToolbar(button: GroupButton): void {
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


        document.addEventListener("showInputLinkBoxRequested", () => {
            this.canHide = false;
        });

        document.addEventListener("showInputLinkBoxFinished", () => {
            this.canHide = true;
            this.restoreRangeSelection();
        });

        document.addEventListener('keydown', (event) => {
            if (this.canHide && (event.key === 'Escape')) {

                if (this.anyDropdownVisible()) {
                    this.hideAllDropdownVisible();
                } else {
                    this.hide();
                }
            } if (this.canHide && (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
                if (this.isSelectionEmpty()) {
                    this.hide();
                }
            }
        });

        // document.addEventListener('keydown', (event) => {
        //     if ((event.key === 'Escape' || event.key === 'Delete') && this.isVisible) {
        //         if(this.canHide){
        //             this.hideAllDropdownVisible();
        //             this.hide();
        //         }
        //     }
        // });

        document.addEventListener('keyup', (event) => {
            if (event.key === "Shift" || event.key === "Control") {

                if (window.getSelection()!.toString().trim() !== '') {

                    if (Utils.isSelectedTextDescendantOf(".title")) {
                        return;
                    }

                    event.preventDefault();
                    event.stopPropagation();

                    this.show();
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (this.canHide && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`) && !this.anyDropdownVisible()) {
                this.hide();
            } else if (this.isVisible && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`) && !this.inputLinkBoxWrapper.isVisible) {
                this.restoreRangeSelection();
            }
        });

        document.addEventListener('mouseup', (event) => {
            if (!this.isVisible) {

                // wait the selection to be reflected in the DOM
                requestAnimationFrame(() => {

                    if (window.getSelection()!.toString().trim() !== '') {

                        if (Utils.isSelectedTextDescendantOf(".title")) {
                            return;
                        }

                        event.preventDefault();
                        event.stopPropagation();

                        this.show();
                    }
                });
            }
        });

        document.addEventListener('selectedBlockDeleted', (event) => {
            if (this.canHide) {
                this.hide();
            }
        });

        document.addEventListener('requestHideFloatingToolbar', () => {
            if (this.canHide) {

                if (this.anyDropdownVisible()) {
                    this.hideAllDropdownVisible();
                }

                this.hide();
            }
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


