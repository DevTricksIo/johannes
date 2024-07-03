import JNode from './JNode';

class JCircularLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Append a new node with the given value to the end of the list.
     * @param {JNode} node - The node to append.
     */
    append(node) {
        if (!(node instanceof JNode)) {
            throw new TypeError("Expected an instance of JNode.");
        }

        if (this.length === 0) {
            this.head = node;
            this.tail = node;

            this.head.setNext(this.tail);
            this.head.setPrevious(this.tail);
        } else {
            node.setPrevious(this.tail);
            node.setNext(this.head);

            this.tail.setNext(node);
            this.head.setPrevious(node);

            this.tail = node;
        }
        this.length++;
    }

    /**
     * Get the first node (head) of the list.
     * @returns {JNode} The first node.
     */
    getFirst() {
        return this.head;
    }

    /**
     * Get the last node (tail) of the list.
     * @returns {JNode} The last node.
     */
    getLast() {
        return this.tail;
    }
}

export default JCircularLinkedList;