import { BaseDoublyLinkedList } from './BaseDoublyLinkedList';
import { JNode } from './JNode';

export class DoublyLinkedList<T> extends BaseDoublyLinkedList<T> {

    constructor() {
        super();
    }

    append(element: T): void {

        const node = new JNode(element, this);

        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.setNext(node);
            node.setPrevious(this.tail);

            this.tail = node;
        }

        this.length++;
    }
}