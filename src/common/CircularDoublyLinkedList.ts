import JNode from './JNode';
import BaseDoublyLinkedList from './BaseDoublyLinkedList';

class CircularDoublyLinkedList<T extends JNode<T>> extends BaseDoublyLinkedList<T> {

    constructor() {
        super();
    }

    append(node: T): void {

        if (!this.head || !this.tail) {

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
}

export default CircularDoublyLinkedList;