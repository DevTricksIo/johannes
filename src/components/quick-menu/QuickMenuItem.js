import * as helperDOM from './helperDOM';
import JNode from '../../common/JNode';
import QuickMenuSection from './QuickMenuSection';

class QuickMenuItem extends JNode {

    constructor(quickMenuSectionInstance, itemName, itemDescription, SVGHrefUseId, dataType) {

        super();

        // if (!(QuickMenuSectionInstance instanceof QuickMenuSection)) {
        //     throw new TypeError("Expected an instance of QuickMenuSection.");
        // }

        /**
         * The QuickMenu element of the component in the DOM.
         * @type {HTMLElement}
         */
        this.htmlElement = document.createElement('div');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');

        /**
         * The QuickMenuSection parent.
         * @type {QuickMenuSection}
         */
        this.quickMenuSectionInstance = quickMenuSectionInstance;

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
                this.quickMenuSectionInstance.quickMenuInstance.changeFocus(this);
            });
        }

        this.attachEvents();
    }
}

export default QuickMenuItem;