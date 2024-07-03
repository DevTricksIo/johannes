import QuickMenu from './QuickMenu';
import QuickMenuItem from "./QuickMenuItem";
import JLinkedList from '../../common/JLinkedList';
import JNode from "../../common/JNode";

/**
 * Represents a section within a QuickMenu, acting as a node in a doubly-linked list.
 * Each section contains a collection of QuickMenuItem nodes, managed as a linked list with references to both the head and tail of the list.
 * This setup facilitates efficient addition and removal of items at both ends of the list.
 *
 * @class QuickMenuSection
 * @property {HTMLElement} htmlElement - The DOM element representing the section in the UI.
 * @property {QuickMenuItem[]} menuItems - An array of menu items contained within the section.
 * @property {QuickMenuItem} #head - Private field holding a reference to the first QuickMenuItem in the section.
 * @property {QuickMenuItem} #tail - Private field holding a reference to the last QuickMenuItem in the section.
 */
class QuickMenuSection extends JNode {

    constructor(quickMenuInstance, sectionName, classList) {

        super();

        // if (!(QuickMenuInstance instanceof QuickMenu)) {
        //     throw new TypeError("Expected an instance of QuickMenu.");
        // }

        /**
         * The QuickMenuSection element of the component in the DOM.
         * @type {HTMLElement}
         */
        this.htmlElement = document.createElement('section');
        htmlElement.classList.add(classList);

        /**
        * The QuickMenu parent.
        * @type {QuickMenu}
        */
        this.quickMenuInstance = quickMenuInstance;

        let heading = document.createElement('h2');
        heading.textContent = sectionName;

        /**
         * The QuickMenuItem elements in a LinkedList.
         * @type {JLinkedList}
         */
        this.menuItems = new JLinkedList();

        htmlElement.appendChild(heading);

        /**
        * Inserts a QuickMenuItem or an array of QuickMenuItems into the menu.
        * If the input is not a QuickMenuItem or contains an item that is not a QuickMenuItem, an error is thrown.
        *
        * @param {QuickMenuItem|QuickMenuItem[]} menuItems The item(s) to be inserted.
        * @throws {Error} Throws an 'Out Of Range Exception' if any item is not a QuickMenuItem.
        */
        this.appendQuickMenuItem = (menuItems) => {

            if (Array.isArray(menuItems)) {
                menuItems.forEach(item => {

                    if (!(item instanceof QuickMenuItem)) {
                        throw new Error('Out Of Range Exception');
                    }

                    this.menuItems.append(item);
                    this.htmlElement.appendChild(item.htmlElement);
                });
            } else {

                if (!(item instanceof QuickMenuItem)) {
                    throw new Error('Out Of Range Exception');
                }

                this.menuItems.append(menuItems);
                this.htmlElement.appendChild(menuItems.htmlElement);
            }
        }

        /**
        * Gets the first item from the list of menu items.
        * @returns {QuickMenuItem|null} The first menu item if the list is not empty, or null if it is empty.
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

export default QuickMenuSection;