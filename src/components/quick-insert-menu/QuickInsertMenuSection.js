import QuickInsertMenu from './QuickInsertMenu';
import QuickInsertMenuItem from "./QuickInsertMenuItem";
import JLinkedList from '../../common/JLinkedList';
import JNode from "../../common/JNode";

/**
 * Represents a section within a QuickInsertMenu, acting as a node in a doubly-linked list.
 * Each section contains a collection of QuickInsertMenuItem nodes, managed as a linked list with references to both the head and tail of the list.
 * This setup facilitates efficient addition and removal of items at both ends of the list.
 *
 * @class QuickInsertMenuSection
 * @property {HTMLElement} htmlElement - The DOM element representing the section in the UI.
 * @property {QuickInsertMenuItem[]} menuItems - An array of menu items contained within the section.
 * @property {QuickInsertMenuItem} #head - Private field holding a reference to the first QuickInsertMenuItem in the section.
 * @property {QuickInsertMenuItem} #tail - Private field holding a reference to the last QuickInsertMenuItem in the section.
 */
class QuickInsertMenuSection extends JNode {

    constructor(quickInsertMenuInstance, sectionName, classList) {

        // if (!(quickInsertMenuInstance instanceof QuickInsertMenu)) {
        //     throw new TypeError("Expected an instance of QuickInsertMenu.");
        // }

        /**
         * The QuickInsertMenuSection element of the component in the DOM.
         * @type {HTMLElement}
         */
        let htmlElement = document.createElement('section');
        htmlElement.classList.add(classList);

        super(htmlElement);

        /**
        * The QuickInsertMenu parent.
        * @type {QuickInsertMenu}
        */
        this.quickInsertMenuInstance = quickInsertMenuInstance;

        let heading = document.createElement('h2');
        heading.textContent = sectionName;

        /**
         * The QuickInsertMenuItem elements in a LinkedList.
         * @type {JLinkedList}
         */
        this.menuItems = new JLinkedList();

        htmlElement.appendChild(heading);

        /**
        * Inserts a QuickInsertMenuItem or an array of QuickInsertMenuItems into the menu.
        * If the input is not a QuickInsertMenuItem or contains an item that is not a QuickInsertMenuItem, an error is thrown.
        *
        * @param {QuickInsertMenuItem|QuickInsertMenuItem[]} menuItems The item(s) to be inserted.
        * @throws {Error} Throws an 'Out Of Range Exception' if any item is not a QuickInsertMenuItem.
        */
        this.appendQuickInsertMenuItem = (menuItems) => {

            if (Array.isArray(menuItems)) {
                menuItems.forEach(item => {

                    if (!(item instanceof QuickInsertMenuItem)) {
                        throw new Error('Out Of Range Exception');
                    }

                    this.menuItems.append(item);
                    this.htmlElement.appendChild(item.htmlElement);
                });
            } else {

                if (!(item instanceof QuickInsertMenuItem)) {
                    throw new Error('Out Of Range Exception');
                }

                this.menuItems.append(menuItems);
                this.htmlElement.appendChild(menuItems.htmlElement);
            }
        }

        /**
        * Gets the first item from the list of menu items.
        * @returns {QuickInsertMenuItem|null} The first menu item if the list is not empty, or null if it is empty.
        */
        this.getFirstMenuItem = () => {
            if (this.menuItems.length) {
                return this.menuItems.getFirst();
            } else {
                return null;
            }
        }
    }
}

export default QuickInsertMenuSection;