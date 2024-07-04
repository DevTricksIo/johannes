import QuickMenu from './QuickMenu';
import QuickMenuItem from "./QuickMenuItem";
import DoublyLinkedList from '../../common/DoublyLinkedList';
import JNode from "../../common/JNode";

class QuickMenuSection extends JNode<QuickMenuSection> {

    htmlElement: HTMLElement;
    quickMenuInstance: QuickMenu;

    menuItems = new DoublyLinkedList<QuickMenuItem>();

    constructor(quickMenuInstance: QuickMenu, title: string, classList: string) {

        super();

        this.htmlElement = document.createElement('section');
        this.htmlElement.classList.add(classList);

        this.quickMenuInstance = quickMenuInstance;

        let heading = document.createElement('h2');
        heading.textContent = title;

        this.htmlElement.appendChild(heading);
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

    getFirstMenuItem(): QuickMenuItem | null {
        return this.menuItems.getFirst();
    }

    getLastMenuItem(): QuickMenuItem | null {
        return this.menuItems.getLast();
    }

    filterSection(text: string): void {

        this.restoreSection();

        if (text !== "") {
            this.menuItems.forEach(menuItem => {

                if (!(menuItem.title.toLocaleLowerCase().includes(text) || menuItem.dataType.includes(text))) {
                    menuItem.hideItem();
                }
            });

            let atLeadOneItm = this.menuItems.any(item => item.title.toLocaleLowerCase().includes(text) || item.dataType.includes(text));

            if (!atLeadOneItm) {
                this.hideSection();
            }
        }
    }

    hideSection() {
        this.htmlElement.style.display = 'none';
    }

    showSection() {
        this.htmlElement.style.display = 'block';
    }

    restoreSection() {
        this.showSection();

        this.menuItems.forEach(menuItem => {
            menuItem.showItem();
        });
    }

    isVisible(): boolean {
        return this.htmlElement.style.display != 'none';
    }
}

export default QuickMenuSection;