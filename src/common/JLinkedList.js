import JNode from './JNode';

class JLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Append a new node with the given value to the end of the list.
     * @param {*} HTMLElement - The value to store in the new node.
     */
    append(node) {

        if (!(node instanceof JNode)) {
            throw new TypeError("Expected an instance of JNode.");
        }

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {

            this.tail.setNext(node);
            node.setPrevious(this.tail);

            this.tail = node;
        }

        this.length++;


        /**
        * Get the node in the head.
        * @returns {JNode} node.
        */
        this.getFirst = () => {
            return this.head;
        }

        /**
        * Get the node in the tail.
        * @returns {JNode} node.
        */
        this.getLast = () => {
            return this.tail;
        }
    }
}

export default JLinkedList;