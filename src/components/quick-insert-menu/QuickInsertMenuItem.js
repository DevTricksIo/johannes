import * as helperDOM from './helperDOM';
import JNode from '../../common/JNode';
import QuickInsertMenuSection from './QuickInsertMenuSection';

class QuickInsertMenuItem extends JNode {

    constructor(quickInsertMenuSectionInstance, itemName, itemDescription, SVGHrefUseId, dataType) {

        // if (!(quickInsertMenuSectionInstance instanceof QuickInsertMenuSection)) {
        //     throw new TypeError("Expected an instance of QuickInsertMenuSection.");
        // }

        /**
         * The QuickInsertMenuItem element of the component in the DOM.
         * @type {HTMLElement}
         */
        const htmlElement = document.createElement('div');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');

        super(htmlElement);

        /**
         * The QuickInsertMenuSection parent.
         * @type {QuickInsertMenuSection}
         */
        this.quickInsertMenuSectionInstance = quickInsertMenuSectionInstance;

        htmlElement.setAttribute('data-block-operation', 'apply-selected-block-type');
        htmlElement.setAttribute('data-type', dataType);
        htmlElement.setAttribute('tabindex', '0');
        htmlElement.setAttribute('role', 'option');

        const optionImage = document.createElement('div');
        optionImage.classList.add('option-image');

        const svg = helperDOM.createSVG(SVGHrefUseId, '', '100%', '100%');

        optionImage.appendChild(svg);

        htmlElement.appendChild(optionImage);


        const optionText = document.createElement('div');
        optionText.classList.add('option-text');

        const blockTitle = document.createElement('p');
        blockTitle.classList.add('block-title');
        blockTitle.innerText = itemName;

        optionText.appendChild(blockTitle);

        const blockDescription = document.createElement('p');
        blockDescription.classList.add('block-description');
        blockDescription.innerText = itemDescription;

        optionText.appendChild(blockDescription);

        htmlElement.appendChild(optionText);


        /** Apply a fake focus in the element */
        this.focus = () => {
            this.htmlElement.classList.add('block-options-focused');
            this.htmlElement.focus();
        }

        this.removeFocus = () => {
            this.htmlElement.classList.remove('block-options-focused');
        }

        this.attachEvents = () => {
            this.htmlElement.addEventListener('mousemove', () => {
                this.quickInsertMenuSectionInstance.quickInsertMenuInstance.changeFocus(this);
            });
        }

        this.attachEvents();
    }
}

export default QuickInsertMenuItem;