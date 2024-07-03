/**
 * @class
 * Classe abstrata JNode. Deve ser estendida e o tipo do nó deve ser especificado na extensão.
 * @template T O tipo de nó que estende JNode, usado para indicar os tipos de previousNode e nextNode.
 * @example
 * //Assume we have a class QuickMenuItem that extends JNode.
* class QuickMenuItem extends JNode {
*     constructor() {
*         super();
*     }
* }
* let menuList = new JLinkedList();
* let item = new QuickMenuItem("Item 1");
* menuList.append(item);
 */
class JNode {

    constructor() {

        if (new.target === JNode) {
            throw new Error("JNode is an abstract class and cannot be instantiated directly.");
        }

        /** @type {T|null} */
        this.previousNode;

        /** @type {T|null} */
        this.nextNode;

        // /**
        // * The HTML element of the component in the DOM.
        // * @type {HTMLElement}
        // */
        // this.htmlElement = htmlElement;


        /**
        * Sets the next node.
        * If the input is not a JNode, an error is thrown.
        *
        * @param {T} node - The node to be set as the next item.
        * @throws {TypeError} Throws an error if the provided node is not an instance of JNode.
        */
        this.setNext = (node) => {
            if (!(node instanceof JNode)) {
                throw new TypeError("Expected an instance of JNode.");
            }

            this.nextNode = node;
        }

        /**
        * Sets the previous node.
        * If the input is not a JNode, an error is thrown.
        *
        * @param {T} node - The node to be set as the previous item.
        * @throws {TypeError} Throws an error if the provided node is not an instance of JNode.
        */
        this.setPrevious = (node) => {
            if (!(node instanceof JNode)) {
                throw new TypeError("Expected an instance of JNode.");
            }

            this.previousNode = node;
        }
    }
}

export default JNode;


// Example usage:
// Assume we have a class QuickMenuItem that extends JNode.
// class QuickMenuItem extends JNode {
//     constructor(value) {
//         super(value);
//     }
// }
// let menuList = new JLinkedList();
// let item = new QuickMenuItem("Item 1");
// menuList.append(item);