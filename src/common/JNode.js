/**
 * JNode is custom generic Johannes node
 */
class JNode {

    constructor(htmlElement) {
        this.previousNode;
        this.nextNode;

        /**
        * The HTML element of the component in the DOM.
        * @type {HTMLElement}
        */
        this.htmlElement = htmlElement;


        /**
        * Sets the next node.
        * If the input is not a JNode, an error is thrown.
        *
        * @param {JNode} node - The node to be set as the next item.
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
        * @param {JNode} node - The node to be set as the previous item.
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