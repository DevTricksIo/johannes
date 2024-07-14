import QuickMenu from './QuickMenu';
import QuickMenuItem from "./QuickMenuItem";
import DoublyLinkedList from '../../common/DoublyLinkedList';
import BaseUIComponent from '../common/BaseUIComponent';

class QuickMenuSection extends BaseUIComponent {

    display: string;

    quickMenuInstance: QuickMenu;

    menuItems = new DoublyLinkedList<QuickMenuItem>();

    constructor(quickMenuInstance: QuickMenu, title: string, classList: string) {

        super({
            title: title,
            classList: classList
        });

        this.quickMenuInstance = quickMenuInstance;

        this.display = 'block';
    }

    init(): HTMLElement {

        const htmlElement = document.createElement('section');
        htmlElement.classList.add(this.props.classList);

        const heading = document.createElement('h2');
        heading.textContent = this.props.title;

        htmlElement.appendChild(heading);

        return htmlElement;
    }

    appendQuickMenuItems(menuItems: QuickMenuItem[]): void {

        menuItems.forEach(item => {

            this.appendQuickMenuItem(item)
        });
    }

    appendQuickMenuItem(menuItem: QuickMenuItem): void {

        this.menuItems.append(menuItem);
        this.htmlElement.appendChild(menuItem.htmlElement);
    }

    filterSection(text: string): void {

        this.restore();

        if (text !== "") {
            this.menuItems.forEach(menuItem => {

                if (!(menuItem.filterValue.toLocaleLowerCase().includes(text))) {
                    menuItem.hide();
                }
            });

            let atLeadOneItem = this.menuItems.any(item => item.filterValue.toLocaleLowerCase().includes(text));

            if (!atLeadOneItem) {
                this.hide();
            }
        }
    }

    restore() {
        this.show();

        this.menuItems.forEach(menuItem => {
            menuItem.show();
        });
    }
}

export default QuickMenuSection;