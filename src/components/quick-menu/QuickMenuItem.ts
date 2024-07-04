import SVGIcon from '../common/SVGIcon';
import JNode from '../../common/JNode';
import QuickMenuSection from './QuickMenuSection';

class QuickMenuItem extends JNode<QuickMenuItem> {

    readonly title: string;
    readonly description: string;
    readonly dataType: string;

    htmlElement: HTMLElement;
    quickMenuSectionInstance: QuickMenuSection;

    constructor(quickMenuSectionInstance: QuickMenuSection, title: string, description: string, SVGHrefUseId: string, dataType: string) {

        super();

        this.title = title;
        this.description = description;
        this.dataType = dataType;

        this.htmlElement = document.createElement('div');
        this.htmlElement.classList.add('option', 'option-hover', 'block-operation');

        this.quickMenuSectionInstance = quickMenuSectionInstance;

        this.htmlElement.setAttribute('data-block-operation', 'apply-selected-block-type');
        this.htmlElement.setAttribute('data-type', dataType);
        this.htmlElement.setAttribute('tabindex', '0');
        this.htmlElement.setAttribute('role', 'option');

        this.dataType = dataType;

        const optionImage = document.createElement('div');
        optionImage.classList.add('option-image');

        const svg = new SVGIcon(SVGHrefUseId, '', '100%', '100%');

        optionImage.appendChild(svg.htmlElement);

        this.htmlElement.appendChild(optionImage);

        const optionText = document.createElement('div');
        optionText.classList.add('option-text');

        const blockTitle = document.createElement('p');
        blockTitle.classList.add('block-title');
        blockTitle.innerText = title;

        optionText.appendChild(blockTitle);

        const blockDescription = document.createElement('p');
        blockDescription.classList.add('block-description');
        blockDescription.innerText = description;

        optionText.appendChild(blockDescription);

        this.htmlElement.appendChild(optionText);

        this.attachEvents();
    }

    focus(): void {
        this.htmlElement.classList.add('block-options-focused');
        this.htmlElement.focus();
    }

    removeFocus(): void {
        this.htmlElement.classList.remove('block-options-focused');
    }

    attachEvents(): void {
        this.htmlElement.addEventListener('mousemove', () => {
            this.quickMenuSectionInstance.quickMenuInstance.changeFocus(this);
        });
    }

    hideItem(): void {
        this.htmlElement.style.display = 'none';
    }

    showItem(): void {
        this.htmlElement.style.display = 'flex';
    }

    isVisible(): boolean {
        return this.htmlElement.style.display != 'none';
    }
}

export default QuickMenuItem;