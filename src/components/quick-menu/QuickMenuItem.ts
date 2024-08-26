import { SVGIcon } from '../common/SVGIcon';
import { BaseUIComponent } from '../common/BaseUIComponent';
import { JNode } from "../../common/JNode";
import { QuickMenuSection } from './QuickMenuSection';
import { ICommandEventDetail } from '@/commands/ICommandEventDetail';
import { CustomEvents } from '@/common/CustomEvents';
import { Commands } from '@/commands/Commands';

export class QuickMenuItem extends BaseUIComponent {

    private _blockType: string;
    private _filterValue: string;
    private _immediateParent: QuickMenuSection;

    constructor(immediateParent: QuickMenuSection, title: string, description: string, iconId: string, blockType: string, filterValue: string) {

        super({
            title: title,
            description: description,
            iconId: iconId
        });

        this._blockType = blockType;
        this._filterValue = filterValue;
        this._immediateParent = immediateParent;

        this.attachEvents();
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('div');
        htmlElement.classList.add('option', 'option-hover', 'block-operation', "pointer", "no-selection");

        htmlElement.setAttribute('data-block-operation', 'apply-selected-block-type');
        htmlElement.setAttribute('tabindex', '0');
        htmlElement.setAttribute('role', 'option');


        const optionImage = document.createElement('div');
        optionImage.classList.add('option-image');

        const svg = new SVGIcon(this.props.iconId, '100%');

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

    get filterValue(): string {
        return this._filterValue;
    }

    get immediateParent (): QuickMenuSection {
        return this._immediateParent;
    }

    get blockType(): string {
        return this._blockType;
    }

    focus(): void {
        this.htmlElement.classList.add('option-focused');
        this.htmlElement.focus();
    }

    removeFocus(): void {
        this.htmlElement.classList.remove('option-focused');
    }


    emitCommandEvent(): void {
        const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
            detail: {
                command: Commands.transformBlock,
                value: this.blockType
            }
        });

        document.dispatchEvent(customEvent);
    }

    attachEvents(): void {

        this.htmlElement.addEventListener('mousemove', () => {

            const node: JNode<QuickMenuItem> = this._immediateParent.menuItems.find(this)!;

            this._immediateParent.immediateParent.switchVisualFocus(node!);
        });

        this.htmlElement.addEventListener('click', (event) => {

            event.preventDefault();
            event.stopPropagation();

            this.emitCommandEvent();
        });
    }
}