import SVGIcon from '../common/SVGIcon';
import QuickMenuSection from './QuickMenuSection';
import BaseUIComponent from '../common/BaseUIComponent';
import JNode from 'common/JNode';

class QuickMenuItem extends BaseUIComponent {

    display: string;

    readonly title: string;
    readonly description: string;
    readonly dataType: string;

    quickMenuSectionInstance: QuickMenuSection;

    constructor(quickMenuSectionInstance: QuickMenuSection, title: string, description: string, SVGHrefUseId: string, dataType: string) {

        super({
            title: title,
            description: description,
            dataType: dataType,
            SVGHrefUseId: SVGHrefUseId
        });

        this.display = 'flex';

        this.title = title;
        this.description = description;
        this.dataType = dataType;

        this.quickMenuSectionInstance = quickMenuSectionInstance;

        this.dataType = dataType;

        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('div');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');

        htmlElement.setAttribute('data-block-operation', 'apply-selected-block-type');
        htmlElement.setAttribute('data-type', this.props.dataType);
        htmlElement.setAttribute('tabindex', '0');
        htmlElement.setAttribute('role', 'option');


        const optionImage = document.createElement('div');
        optionImage.classList.add('option-image');

        const svg = new SVGIcon(this.props.SVGHrefUseId, '', '100%', '100%');

        optionImage.appendChild(svg.htmlElement);

        htmlElement.appendChild(optionImage);

        const optionText = document.createElement('div');
        optionText.classList.add('option-text');

        const blockTitle = document.createElement('p');
        blockTitle.classList.add('block-title');
        blockTitle.innerText = this.props.title;

        optionText.appendChild(blockTitle);

        const blockDescription = document.createElement('p');
        blockDescription.classList.add('block-description');
        blockDescription.innerText = this.props.description;


        optionText.appendChild(blockDescription);

        htmlElement.appendChild(optionText);

        return htmlElement;
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

            const node: JNode<QuickMenuItem> = this.quickMenuSectionInstance.menuItems.find(this)!;

            this.quickMenuSectionInstance.quickMenuInstance.switchVisualFocus(node!);
        });

        this.htmlElement.addEventListener('click', (event) => {

            const dataType: string = (event.target as HTMLElement).closest('.option')!.getAttribute('data-type')!;

            if (dataType) {
                this.quickMenuSectionInstance.quickMenuInstance.transformHtmlFocusedElementBeforeOpenQuickMenu(dataType);
            }

        });
    }
}

export default QuickMenuItem;