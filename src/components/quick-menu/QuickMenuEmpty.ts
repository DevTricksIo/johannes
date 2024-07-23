import { BaseUIComponent } from '../common/BaseUIComponent';

export class QuickMenuEmpty extends BaseUIComponent {

    constructor() {

        super({});
    }

    init(): HTMLElement {

        const htmlEmptyIndicator = document.createElement('span');

        htmlEmptyIndicator.innerText = 'No results';
        htmlEmptyIndicator.classList.add('empty-block-options');
        htmlEmptyIndicator.style.padding = '10px';
        htmlEmptyIndicator.style.color = 'rgba(55, 53, 47, 0.65)';
        htmlEmptyIndicator.style.display = 'none';

        return htmlEmptyIndicator;
    }
}