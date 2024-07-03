import JNode from './JNode';

/**
 * Lista ligada que pode trabalhar com qualquer tipo de dados.
 * @template T - O tipo de elementos que a lista armazenará.
 */
class JLinkedList {

    constructor() {
        /** @type {T|null} */
        this.head = null;

        /** @type {T|null} */
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
        * @returns {T} node.
        */
        this.getFirst = () => {
            return this.head;
        }

        /**
        * @returns {T} node.
        */
        this.getLast = () => {
            return this.tail;
        }
    }
}

export default JLinkedList;