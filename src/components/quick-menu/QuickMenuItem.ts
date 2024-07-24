import { SVGIcon } from '../common/SVGIcon';
import { BaseUIComponent } from '../common/BaseUIComponent';
import { JNode } from "../../common/JNode";
import { QuickMenuSection } from './QuickMenuSection';

export class QuickMenuItem extends BaseUIComponent {

    readonly blockType: string;

    readonly title: string;
    readonly filterValue: string;
    readonly description: string;

    quickMenuSectionInstance: QuickMenuSection;

    constructor(quickMenuSectionInstance: QuickMenuSection, title: string, description: string, SVGHrefUseId: string, blockType: string, filterValue: string) {

        super({
            title: title,
            description: description,
            SVGHrefUseId: SVGHrefUseId
        });

        this.blockType = blockType;
        this.title = title;
        this.description = description;
        this.filterValue = filterValue;

        this.quickMenuSectionInstance = quickMenuSectionInstance;

        this.blockType = blockType;

        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('div');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');

        htmlElement.setAttribute('data-block-operation', 'apply-selected-block-type');
        htmlElement.setAttribute('tabindex', '0');
        htmlElement.setAttribute('role', 'option');


        const optionImage = document.createElement('div');
        optionImage.classList.add('option-image');

        const svg = new SVGIcon(this.props.SVGHrefUseId, '100%', '100%');

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

    get display(): string {
        return 'flex';
    }

    focus(): void {
        this.htmlElement.classList.add('option-focused');
        this.htmlElement.focus();
    }

    removeFocus(): void {
        this.htmlElement.classList.remove('option-focused');
    }

    attachEvents(): void {

        this.htmlElement.addEventListener('mousemove', () => {

            const node: JNode<QuickMenuItem> = this.quickMenuSectionInstance.menuItems.find(this)!;

            this.quickMenuSectionInstance.quickMenuInstance.switchVisualFocus(node!);
        });

        this.htmlElement.addEventListener('click', () => {

            this.quickMenuSectionInstance.quickMenuInstance.transformHtmlFocusedElementBeforeOpenQuickMenu(this.blockType);

        });
    }
}