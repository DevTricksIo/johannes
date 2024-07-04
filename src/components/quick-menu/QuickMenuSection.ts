
import QuickMenu from './QuickMenu';
import QuickMenuItem from "./QuickMenuItem";
import JLinkedList from '../../common/JLinkedList';
import JNode from "../../common/JNode";

class QuickMenuSection extends JNode<QuickMenuSection> {

    htmlElement: HTMLElement;
    quickMenuInstance: QuickMenu;

    menuItems = new JLinkedList<QuickMenuItem>();

    constructor(quickMenuInstance: QuickMenu, sectionName: string, classList: string) {

        super();

        this.htmlElement = document.createElement('section');
        this.htmlElement.classList.add(classList);

        this.quickMenuInstance = quickMenuInstance;

        let heading = document.createElement('h2');
        heading.textContent = sectionName;

        this.htmlElement.appendChild(heading);
    }

    appendQuickMenuItems(menuItems: QuickMenuItem[]) {

        menuItems.forEach(item => {

            this.appendQuickMenuItem(item)
        });
    }

    appendQuickMenuItem(menuItem: QuickMenuItem): void {

        this.menuItems.append(menuItem);
        this.htmlElement.appendChild(menuItem.htmlElement);
    }

    getFirstMenuItem() {
        if (this.menuItems.length) {
            return this.menuItems.getFirst();
        } else {
            return null;
        }
    }

    getLastMenuItem() {
        if (this.menuItems.length) {
            return this.menuItems.getLast();
        } else {
            return null;
        }
    }
}

export default QuickMenuSection;