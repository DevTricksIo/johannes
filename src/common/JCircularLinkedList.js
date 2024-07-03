import JNode from './JNode';

/**
 * Lista ligada que pode trabalhar com qualquer tipo de dados.
 * @template T - O tipo de elementos que a lista armazenará.
 */
class JCircularLinkedList {

    constructor() {

        /** @type {T|null} */
        this.head = null;

        /** @type {T|null} */
        this.tail = null;

        this.length = 0;
    }

    /**
     * Append a new node with the given value to the end of the list.
     * @param {T} node - The node to append.
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
     * @returns {T|null} The first node.
     */
    getFirst() {
        return this.head;
    }

    /**
     * @returns {T|null} The last node.
     */
    getLast() {
        return this.tail;
    }
}

export default JCircularLinkedList;