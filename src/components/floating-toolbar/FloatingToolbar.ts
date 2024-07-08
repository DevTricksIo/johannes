import BaseUIComponent from '../common/BaseUIComponent';
import DropdownMenu from './dropdown-tool/DropdownMenu';
import Separator from './separator/Separator';
import TextFormattingBarToolBar from './group-button/GroupButton';

class FloatingToolbar extends BaseUIComponent {

    display: string;

    constructor() {
        super({});

        this.display = 'flex';

        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('div');

        htmlElement.id = 'textFormattingBar';
        htmlElement.style.display = 'none';
        htmlElement.classList.add('soft-box-shadow');

        const selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select-wrapper');

        htmlElement.appendChild(selectWrapper);

        return htmlElement;
    }

    show(): void {

        setTimeout(() => {

            const selection = window.getSelection();

            let range = selection!.getRangeAt(0);
            let rect = range.getBoundingClientRect();
    
            this.htmlElement.style.display = 'flex';
            this.htmlElement.style.left = `${rect.left + window.scrollX - 50}px`;
            this.htmlElement.style.top = `${rect.top + window.scrollY - this.htmlElement.offsetHeight - 10}px`;

            super.show();            
        }, 10);
    }

    appendDropdown(dropdown: DropdownMenu): void {
        this.htmlElement.appendChild(dropdown.htmlElement);
    }

    appendSeparator(separator: Separator): void {
        this.htmlElement.appendChild(separator.htmlElement);
    }

    appendTextToolbar(toolbar: TextFormattingBarToolBar): void {
        this.htmlElement.appendChild(toolbar.htmlElement);
    }

    attachEvents() {

        document.addEventListener('keydown', (event) => {
            if ((event.key === 'Escape' || event.key === 'Delete') && this.isVisible) {
                this.hide();
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.key === "Shift" || event.key === "Control") {

                setTimeout(() => {
                    if (window.getSelection()!.toString().trim() !== '') {
                        event.preventDefault();
                        event.stopPropagation();

                        this.show();
                    }
                }, 10);
            }
        });

        document.addEventListener('click', (event) => {
            if (this.isVisible && !(event.target! as HTMLElement).closest(`#${this.htmlElement.id}`)) {
                this.hide();
            }
        });

        document.addEventListener('mouseup', (event) => {
            if (!this.isVisible) {

                setTimeout(() => {
                    if (window.getSelection()!.toString().trim() !== '') {
                        event.preventDefault();
                        event.stopPropagation();

                        this.show();
                    }
                }, 10);
            }
        });
    }
}

export default FloatingToolbar;